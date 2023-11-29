import { Request, Response } from "express";
import authService from "../services/authService";
import { config } from "dotenv";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../types/types";

config();
const secretKey: Secret = process.env.SECRET_KEY || "";

const register = async (req: Request, res: Response) => {
  const { username, password } = req.body.params;

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
  const { username, password } = req.body.params;
  try {
    const checkUserLogin: User = await authService.loginUser(
      username,
      password
    );

    console.info("Login success: ");
    console.info(checkUserLogin);

    // We generate a token for the logged in user
    const token = jwt.sign({ userId: checkUserLogin.id_user }, secretKey, {
      expiresIn: "24h",
    });

    console.info("Token : " + token);

    res.json({ message: "Login sucessful", authorization: token });
    res.status(201);
  } catch (error) {
    console.error("Login failed: ", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export default { register, login };
