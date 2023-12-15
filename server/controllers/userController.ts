import { Request, Response } from "express";
import userService from "../services/userService";
import { config } from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/types";

config();
const secretKey: Secret = process.env.SECRET_KEY || "";

const getUserInfos = async (req: Request, res: Response) => {
  // console.log(req.body);
  const userId = req.params.userId;

  try {
    const userInfos = await userService.fetchUserById(userId);
    console.log(userInfos);
    res.status(201).json(userInfos);
  } catch (error) {
    console.error("Failed retrieving user data", error);
    res.status(500).json({ message: "Failed retrieving user data." });
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const userData = req.body;
    await userService.updateUserById(id, userData);
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Error updating group" });
  }
};
export default { getUserInfos, updateUserById };
