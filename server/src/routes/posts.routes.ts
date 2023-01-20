import { Router } from "express";
import {
  createPostHandler,
  deletePostHandler,
  editPostHandler,
  getAllPostsHandler,
  getMyPostsHandler,
  getPostsHandler,
  likePostHandler,
  unlikePostHandler,
} from "../controller/posts.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { createPostSchema } from "../schema/post.schema";

const router = Router();

// Tworzenie posta
router.post(
  "/create",
  isAuth,
  validateResource(createPostSchema),
  createPostHandler
);

// Usuwanie posta
router.delete("/delete/:id", isAuth, deletePostHandler);

// Edycja posta
router.put("/edit/:id", isAuth, editPostHandler);

// Polubienie posta
router.put("/like/:id", isAuth, likePostHandler);

// Odlubienie posta
router.put("/unlike/:id", isAuth, unlikePostHandler);

// Pobranie moich postów
router.get("/my/:page", isAuth, getMyPostsHandler);

// Pobieranie wszystkich dostępnych postów
router.get("/all/:page", isAuth, getAllPostsHandler);

// Pobranie postów innego użytkownika
router.get("/:id/:page", isAuth, getPostsHandler);

export default router;
