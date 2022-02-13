import { Router } from "express";

const router = Router();

export default (app) => {
  app.use("/secret", router);

  router.get("", async (req, res, next) => {
    try {
      console.log(req);
      return res.status(200).json({ message: "hello I am a secret route" });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });

  router.post("", async (req, res, next) => {
    try {
      console.log(req);
      return res.status(200).json({ message: "hello I am a secret route" });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  });
};
