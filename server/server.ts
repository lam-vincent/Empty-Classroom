import express, { NextFunction, Response } from "express";
import cors from "cors";
import mysql from "mysql";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import findRoutes from "./routes/findRoutes";
import groupRoutes from "./routes/groupRoutes";
import reserveRoutes from "./routes/reserveRoutes";
import userRoutes from "./routes/userRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/server/auth", authRoutes);

app.use(authMiddleware);
app.use(dashboardRoutes);
app.use(userRoutes);
app.use(findRoutes);
app.use(groupRoutes);
app.use(reserveRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
