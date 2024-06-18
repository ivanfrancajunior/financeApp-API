import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userRotes from "./routes/user.routes.js";
import { asyncHandler } from "./middlewares/asyncHandler.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/users", userRotes);

app.get("/api/v1", (req, res) => {
  res.json({ message: "api is runnind correctly" });
});

app.use(asyncHandler);
