import objectHash from "object-hash";
import moment from "moment";
import configs from "../configs";

export class SecretService {
  constructor(secretModel) {
    this.secretModel = secretModel;
  }

  async createSecret({ secret, expireAfterViews, expireAfter }) {
    try {
      const hashedSecret = objectHash(secret);

      const isSecretAlreadySaved = await this.secretModel.findOne({
        hash: hashedSecret,
      });

      if (isSecretAlreadySaved) {
        throw new Error("This secret is already present in the database");
      }

      const createdAtMoment = moment();

      const secretData = new this.secretModel({
        hash: hashedSecret,
        secret,
        expireAfterViews,
        expireAfter,
        remainingViews: expireAfterViews,
        createdAt: createdAtMoment,
      });

      const expiresAt = moment(createdAtMoment)
        .add(parseInt(expireAfter), "hours")
        .format(configs.timeFormat);

      await secretData.save();

      return {
        hash: hashedSecret,
        secret,
        createdAt: moment(createdAtMoment).format(configs.timeFormat),
        expiresAt,
        remainingViews: expireAfterViews,
      };
    } catch (error) {
      throw error;
    }
  }

  async getSecret(hash) {
    try {
      const secretData = await this.secretModel.findOne({ hash });

      if (!secretData) {
        throw new Error("This secret is not present in the database");
      }

      if (
        secretData.expireAfter !== 0 &&
        moment(secretData.createdAt).add(secretData.expireAfter, "hours") <
          moment()
      ) {
        await this.secretModel.findOneAndDelete({ hash });
        throw new Error("This secret is not present in the database");
      }

      secretData.remainingViews -= 1;
      await secretData.save();

      if (secretData.remainingViews === 0) {
        await this.secretModel.findOneAndDelete({ hash });
      }

      return {
        hash: secretData.hash,
        secret: secretData.secret,
        createdAt: moment(secretData.createdAt).format(configs.timeFormat),
        expiresAt: moment(secretData.createdAt)
          .add(secretData.expireAfter, "hours")
          .format(configs.timeFormat),
        remainingViews: secretData.remainingViews,
      };
    } catch (error) {
      throw error;
    }
  }
}
