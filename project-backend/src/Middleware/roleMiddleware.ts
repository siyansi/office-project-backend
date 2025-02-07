import { Response, NextFunction } from "express";
import { AuthRequest } from "../Middleware/authMiddleware";

// ✅ Middleware to check if user is Admin
export const checkAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};
