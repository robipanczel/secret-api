import { Router } from "express";
import secretModel from "../models/secret";
import { SecretService } from "../services/secret";

const secretService = new SecretService(secretModel);

const router = Router();

export default (app) => {
  app.use("/secret", router);

  router.get("/:id", async (req, res, next) => {
    try {
      const secretResponseDTO = await secretService.getSecret(req.params.id);

      return res.status(200).json({ ...secretResponseDTO });
    } catch (error) {
      return next(error);
    }
  });

  router.post("", async (req, res, next) => {
    try {
      const secretResponseDTO = await secretService.createSecret(req.body);

      return res.status(201).json({
        ...secretResponseDTO,
      });
    } catch (error) {
      return next(error);
    }
  });
};
