import express from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post(
  "/api/users/create",
  validateResource(createUserSchema),
  createUserHandler
);

router.get("/api/users/me", getCurrentUserHandler);

export default router;
