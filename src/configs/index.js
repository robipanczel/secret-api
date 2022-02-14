import dotenv from "dotenv";

const env = dotenv.config();
if (env.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  env: process.env.NODE_ENV || "development",

  port: parseInt(process.env.PORT),

  dbURI: process.env.DB_URI,

  api: {
    prefix: "/api",
  },

  timeFormat: "dddd, MMMM Do YYYY, h:mm:ss a",
};
