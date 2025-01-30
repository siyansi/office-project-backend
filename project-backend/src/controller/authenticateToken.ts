import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust this according to your user type
    }
  }
}

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401);
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not defined in the environment variables");
    res.status(500);
    return;
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
};

export default authenticateToken;