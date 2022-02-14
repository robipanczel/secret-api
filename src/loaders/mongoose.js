import mongoose from "mongoose";
import config from "../configs";

export default async () => {
  const connection = await mongoose.connect(config.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection.connection.db;
};
