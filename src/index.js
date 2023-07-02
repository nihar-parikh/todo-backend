//uncaughtException must be at the first
//it is for synchronous process
process.on("uncaughtException", (error) => {
  console.log(error.name, error.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

import express from "express";
import { PORT } from "./config/index.js";
import { databaseConnection } from "./database/connection.js";
import { expressApp } from "./express-app.js";

const startServer = async () => {
  try {
    const app = express();

    //----------------connecting database--------------------//
    await databaseConnection();

    //----------------connecting express app--------------------//
    await expressApp(app);

    const server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });

    // process.on("unhandledRejection", (error) => {
    //   console.log(error.name, error.message);
    //   console.log("Unhandled rejection occurred! Shutting down...");

    //server should be closed
    //   server.close(() => {
    //exit code = 1 means termination
    //     process.exit(1);
    //   });
    // });

    // process.on("SIGINT", () => {
    //   console.log("SIGINT signal received. Shutting down...");

    //   server.close(() => {
    //     process.exit(0);
    //   });
    // });
  } catch (error) {
    if (error.name === "MongoServerError" && error.code === 8000) {
      console.log(
        "Authentication failed. Please check your database credentials."
      );
    } else {
      console.log("An error occurred during server startup:");
      console.error(error);
    }
    process.exit(1);
  }
};

startServer();

//for any async rejection error caused outside express server
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  console.log("Unhandled rejection occurred! Shutting down...");

  //server should be closed
  // server.close(() => {
  //exit code = 1 means termination
  process.exit(1);
  // });
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received. Shutting down...");

  // server.close(() => {
  process.exit(0);
  // });
});

// "dev": "NODE_ENV=dev nodemon src/index.js",
// "start": "nodemon src/index.js",
