import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const CONNECTION_SRING = process.env.CONNECTION_SRING;

export const conn = async () => {
  try {
    await mongoose.connect(CONNECTION_SRING);

    console.log("db is connected!");

    return conn;
  } catch (error) {
    console.log(error.message);
  }
};

conn();
