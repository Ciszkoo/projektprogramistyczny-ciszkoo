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
  "/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  loginHandler
);

router.post("/logout", isAuth, logoutHandler);

router.post(
  "/create",
  validateResource(createUserSchema),
  createUserHandler
);

router.post("/:id", isAuth, getUserHandler);

router.get("/me", isAuth, getCurrentUserHandler);

router.delete("/me", isAuth, deleteUserHandler);

router.put(`/me/edit/:prop`, isAuth, editHandler);

router.put("/me/avatar", isAuth, avatarUpdateHandler);

router.post(
  "/me/status",
  isAuth,
  validateResource(createPostSchema),
  createPostHandler
);

router.get("/me/status/:page", isAuth, getCurrUsersPostsHandler);

router.get("/:id/status/:page", isAuth, getUsersPostsHandler);

export default router;
