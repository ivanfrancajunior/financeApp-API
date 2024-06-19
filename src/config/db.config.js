import mongoose from "mongoose";
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;

export const conn = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${db_user}:${db_password}@cluster0.jvsjlwc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );

    console.log("db is connected!");

    return db_conn;
  } catch (error) {
    console.log(error.message);
  }
};

conn();
