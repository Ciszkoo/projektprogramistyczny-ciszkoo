import { Request, Response, NextFunction } from "express";
import log from "../utils/logger";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    log.info(req.isAuthenticated())
    res.status(401).json({ message: "Not authorized" }).send();
  }
};
