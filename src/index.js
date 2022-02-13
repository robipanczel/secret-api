import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.get("/status", (req, res) => {
  res.status(200).end();
});
app.head("/status", (req, res) => {
  res.status(200).end();
});

app.use(cors());

app.use(express.json);

app.use("/api", routes());

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
    },
  });
});

app
  .listen(3000, () => {
    console.log(`Server is running on port 3000`);
  })
  .on("error", (err) => {
    console.err(err);
    process.exit(1);
  });
