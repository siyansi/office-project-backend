import { Request, Response, NextFunction } from "express";

const roleMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied: Insufficient Permissions" });
    }
    next();
  };
};

export default roleMiddleware;
