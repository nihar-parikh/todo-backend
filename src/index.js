import express from "express";
import { PORT } from "./config/index.js";
import { databaseConnection } from "./database/connection.js";
import { expressApp } from "./express-app.js";

const startServer = async () => {
  const app = express();

  //----------------connecting database--------------------//
  await databaseConnection();

  //----------------connecting express app--------------------//
  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
