import { mongoose } from "mongoose";
import { DB_URL } from "../config/index.js";

//any mongodb connection errors are not catched by express globalError handler
//these are mongodb database server errors.
//--------------mongodb connection-----------//
export const databaseConnection = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db Connected");
  } catch (error) {
    console.log("Error ============");
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
