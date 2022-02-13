import { Router } from "express";
import secret from "./secret";

export default () => {
  const app = Router();
  secret(app);
  return app;
};
