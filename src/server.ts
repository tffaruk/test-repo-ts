import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/variables";
import logger from "./lib/logger";

let server: Server;

if (config.env !== "development") {
  // detect unhandled exceptions
  process.on("uncaughtException", (err) => {
    logger.errorlog.error(err);
  });

  // create signal when server is clolse
  process.on("SIGTERM", () => {
    logger.errorlog.info("SIGTERM is received");
    if (server) {
      server.close();
    }
  });
}
const dbConnect = async () => {
  try {
    await mongoose.connect(config.database_uri as string);
    server = app.listen(config.port, () => {
      config.env !== "production"
        ? console.log(`Server running on port ${config.port}`)
        : logger.successlog.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.errorlog.error("error occured in db connection");
    config.env !== "production"
      ? console.log("error occured in db connection", error)
      : logger.errorlog.error("error occured in db connection", error);
  }
  if (config.env !== "development") {
    // stop server when unhandled promise rejections occur
    process.on("unhandledRejection", (err) => {
      console.log("unhandled rejection occur closeing the srver...");
      if (server) {
        server.close(() => {
          logger.errorlog.error(err);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  }
};

dbConnect();
