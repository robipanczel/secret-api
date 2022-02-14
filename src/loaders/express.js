import config from "../configs";
import routes from "../routes";
import cors from "cors";
import express from "express";

export default (app) => {
  app.get("/status", (req, res) => {
    res.status(200).end();
  });
  app.head("/status", (req, res) => {
    res.status(200).end();
  });

  app.use(cors());

  app.use(express.json());

  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: err.message,
    });
  });
};
