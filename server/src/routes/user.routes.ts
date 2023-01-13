import express from "express";
import passport from "passport";
import {
  avatarUpdateHandler,
  createPostHandler,
  createUserHandler,
  deleteUserHandler,
  editHandler,
  getCurrentUserHandler,
  getUserHandler,
  getCurrUsersPostsHandler,
  loginHandler,
  logoutHandler,
  getUsersPostsHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { loginSchema } from "../schema/auth.schema";
import { createUserSchema } from "../schema/user.schema";
import { isAuth } from "../middleware/authMiddleware";
import { createPostSchema } from "../schema/post.schema";

const router = express.Router();

router.post(
  "/api/user/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  loginHandler
);

router.post("/api/user/logout", isAuth, logoutHandler);

router.post(
  "/api/user/create",
  validateResource(createUserSchema),
  createUserHandler
);

router.post("/api/user/:id", isAuth, getUserHandler);

router.get("/api/user/me", isAuth, getCurrentUserHandler);

router.delete("/api/user/me", isAuth, deleteUserHandler);

router.put(`/api/user/me/edit/:prop`, isAuth, editHandler);

router.put("/api/user/me/avatar", isAuth, avatarUpdateHandler);

router.post(
  "/api/user/me/status",
  isAuth,
  validateResource(createPostSchema),
  createPostHandler
);

router.get("/api/user/me/status/:page", isAuth, getCurrUsersPostsHandler);

router.get("/api/user/:id/status/:page", isAuth, getUsersPostsHandler);

export default router;
