import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// Middleware to verify JWT token and check user role
const authenticateToken = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "simonpeter@246") as { id: string; role: string };
      req.user = decoded;

      // Check if user role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: "Access denied. Unauthorized role." });
      }

      next();
    } catch (error) {
      res.status(400).json({ error: "Invalid or expired token" });
    }
  };
};

export default authenticateToken;
