import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userId?: number;
  role?: string;
}

export const isAdminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRole = req.role;

    if (userRole !== "Admin") {
      throw new Error("Unauthorized");
    }

    next();
  } catch (error) {
    console.error("Error in isAdminMiddleware:", error);
    res.status(403).json({ message: "Forbidden" });
  }
};
