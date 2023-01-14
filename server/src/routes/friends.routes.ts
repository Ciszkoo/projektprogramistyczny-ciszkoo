import { Router } from "express";
import { inviteHandler } from "../controller/friends.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { blankSchema } from "../schema/blank.schema";

const router = Router();

router.post("/invite/:id", isAuth, validateResource(blankSchema), inviteHandler);

export default router;
