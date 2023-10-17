import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import findRoutes from "./routes/findRoutes";
import groupRoutes from "./routes/groupRoutes";
import reserveRoutes from "./routes/reserveRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(authMiddleware);
app.use(dashboardRoutes);
app.use(findRoutes);
app.use(groupRoutes);
app.use(reserveRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
