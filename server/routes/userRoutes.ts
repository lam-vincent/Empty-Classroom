import express from "express";
import userController from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
router.get("/user/:userId", authMiddleware, userController.getUserInfos);
router.put("/user/:userId", authMiddleware, userController.updateUserById);

export default router;
