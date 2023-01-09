import express from "express";
import passport from "passport";
import {
  createUserHandler,
  deleteUserHandler,
  editHandler,
  getCurrentUserHandler,
  loginHandler,
  logoutHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { loginSchema } from "../schema/auth.schema";
import { createUserSchema } from "../schema/user.schema";
import { isAuth } from "../middleware/authMiddleware";

import multer from "multer";
const storage = multer({ dest: "uploads/" });

const router = express.Router();

router.post(
  "/api/users/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  loginHandler
);

router.post("/api/users/logout", isAuth, logoutHandler);

router.post(
  "/api/users/create",
  validateResource(createUserSchema),
  createUserHandler
);

router.get("/api/users/me", isAuth, getCurrentUserHandler);

router.delete("/api/users/me", isAuth, deleteUserHandler);

router.put(`/api/users/me/edit/:prop`, isAuth, editHandler);

router.post("/api/users/me/image", isAuth, storage.single("image"));

export default router;
