import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";

config();
const secretKey: Secret = process.env.SECRET_KEY || "";

interface AuthenticatedRequest extends Request {
  userId?: number;
  role?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.cookie?.split("=")[1];
    // console.log(req.headers.cookie?.split("=")[1]);
    if (!token) {
      throw new Error("Unauthorized");
    }

    // decoded userId
    const decoded = jwt.verify(token, secretKey) as {
      role: string;
      userId: number;
    };

    console.log("authMiddleware.ts: decoded", decoded);

    // user informations for future use
    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    res.status(401).json({ message: "Unauthorized" });
    res.redirect("/login");
  }
};
