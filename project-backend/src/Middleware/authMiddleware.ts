import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload | string;
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided, authorization denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export default authMiddleware;