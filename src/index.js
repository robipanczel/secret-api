import express from "express";
import configs from "./configs";
import expressLoader from "./loaders/express";
import mongooseLoader from "./loaders/mongoose";

const app = express();

const mongooseConnection = await mongooseLoader();
expressLoader(app);

app
  .listen(configs.port, () => {
    console.log(`Server is running on port 3000`);
  })
  .on("error", (err) => {
    console.err(err);
    process.exit(1);
  });
