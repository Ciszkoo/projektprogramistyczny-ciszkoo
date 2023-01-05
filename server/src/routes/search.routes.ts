import { Router } from "express";
import { searchController } from "../controller/search.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { searchSchema } from "../schema/search.schema";

const router = Router();

router.post(
  "/api/search",
  isAuth,
  validateResource(searchSchema),
  searchController
);

export default router;
