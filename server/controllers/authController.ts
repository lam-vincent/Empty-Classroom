import { Request, Response } from "express";
import authService from "../services/authService";

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const registerResult = await authService.registerUser(username, password);
    res
      .status(201)
      .json({ message: "User registered successfully", registerResult });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const loginResult = await authService.loginUser(username, password);
    res.status(200).json({ message: "Login successful", token: loginResult });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export default { register, login };
