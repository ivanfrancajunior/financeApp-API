import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "./config/db.config.js";
import userRotes from "./routes/user.routes.js";
import transactionsRoutes from "./routes/transations.routes.js";
import { asyncHandler } from "./middlewares/asyncHandler.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json" assert { type: "json" };
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/users", userRotes);

app.use("/api/transactions", transactionsRoutes);

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(asyncHandler);

app.get("/api/v1", (req, res) => {
  res.json({ message: "api is running correctly" });
});

