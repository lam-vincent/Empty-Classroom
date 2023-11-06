import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";

config();
const secretKey: Secret = process.env.SECRET_KEY || "";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    if (!token) {
      throw new Error("Unauthorized");
    }

    // decoded userId
    const decoded = jwt.verify(token, secretKey) as { userId: number };
    const { userId } = decoded;

    // userId for future use but it's not used yet
    req.userId = userId;

    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
