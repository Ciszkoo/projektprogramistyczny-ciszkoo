import { Router } from "express";
import { searchController } from "../controller/search.controller";
import validateResource from "../middleware/validateResource";
import { searchSchema } from "../schema/search.schema";


const router = Router();

router.get("/api/search", validateResource(searchSchema), searchController)

export default router;