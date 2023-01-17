import express from "express";
import passport from "passport";
import {
  createUserHandler,
  deleteUserHandler,
  editHandler,
  getUserHandler,
  loginHandler,
  logoutHandler,
  getMyselfHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { loginSchema } from "../schema/auth.schema";
import { createUserSchema } from "../schema/user.schema";
import { isAuth } from "../middleware/authMiddleware";
import { createPostSchema } from "../schema/post.schema";

const router = express.Router();

// Tworzenie użytkownika
router.post("/create", validateResource(createUserSchema), createUserHandler);

// Logowanie użytkownika
router.post(
  "/login",
  validateResource(loginSchema),
  passport.authenticate("local"),
  loginHandler
);

// Wylogowanie użytkownika
router.post("/logout", isAuth, logoutHandler);

// Usuwanie użytkownika
router.delete("/me", isAuth, deleteUserHandler);

// Pobieranie danych o aktualnie zalogowanym użytkowniku
router.get("/me", isAuth, getMyselfHandler);

// Pobieranie danych o innym użytkowniku
router.get("/:id", isAuth, getUserHandler);

// Edycja danych o aktualnie zalogowanym użytkowniku
router.put(`/me/edit/:prop`, isAuth, editHandler);

export default router;
