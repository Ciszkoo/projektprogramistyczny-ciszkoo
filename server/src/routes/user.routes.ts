import express from "express";
import passport from "passport";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { loginSchema } from "../schema/auth.schema";
import { createUserSchema } from "../schema/user.schema";
import { isAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/api/users/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  loginHandler
);

router.post(
  "/api/users/create",
  validateResource(createUserSchema),
  createUserHandler
);

router.get("/api/users/me", isAuth, getCurrentUserHandler);

export default router;
