import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const CONNECTION_STRING = process.env.CONNECTION_STRING;

export const conn = async () => {
  try {
    await mongoose.connect(CONNECTION_STRING);

    console.log("db is connected!");

    return conn;
  } catch (error) {
    console.log(error.message);
  }
};

conn();
