import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

// this is not finished yet since we just use username and password
router.post("/register", authController.register);

router.post("/login", authController.login);

export default router;
