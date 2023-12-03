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
    console.log("isAdminMiddleware.ts: userRole", userRole);

    if (userRole !== "Admin") {
      console.log("isAdminMiddleware.ts: userRole", userRole);
      throw new Error("Unauthorized");
    }

    next();
  } catch (error) {
    console.error("Error in isAdminMiddleware:", error);
    res.status(403).json({ message: "Forbidden" });
  }
};
