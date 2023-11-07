import express, { NextFunction, Response } from "express";
import cors from "cors";
import mysql from "mysql";
import { pool } from "./config/database";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import findRoutes from "./routes/findRoutes";
import groupRoutes from "./routes/groupRoutes";
import reserveRoutes from "./routes/reserveRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

interface CustomRequest extends express.Request {
  pool: mysql.Pool;
}

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// app.use((req: CustomRequest, res: Response, next: NextFunction) => {
//   req.pool = pool;
//   next();
// });

app.use("/server/auth", authRoutes);

app.use(authMiddleware);
app.use(dashboardRoutes);
app.use(findRoutes);
app.use(groupRoutes);
app.use(reserveRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
