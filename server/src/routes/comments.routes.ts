import { Router } from "express";
import {
  createCommentHandler,
  deleteCommentHandler,
  editCommentHandler,
  likeCommentHandler,
  unlikeCommentHandler,
} from "../controller/comments.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { createCommentSchema } from "../schema/comments.schema";

const router = Router();

// Tworzenie komentarza
router.post(
  "/:id", // <--- :id is postId
  isAuth,
  validateResource(createCommentSchema),
  createCommentHandler
);

// Usuwanie komentarza
router.delete("/delete/:id", isAuth, deleteCommentHandler); // <--- :id is commentId

// Edycja komentarza
router.put(
  "/edit/:id",
  isAuth,
  validateResource(createCommentSchema),
  editCommentHandler
); // <--- :id is commentId

// Polubienie komentarza
router.put("/like/:id", isAuth, likeCommentHandler); // <--- :id is commentId

// Odlubienie komentarza
router.put("/unlike/:id", isAuth, unlikeCommentHandler); // <--- :id is commentId

export default router;
