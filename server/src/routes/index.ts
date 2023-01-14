import express from "express";
import user from "./user.routes";
import search from "./search.routes";
import friends from "./friends.routes";
import { isAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.sendStatus(200);
});

router.get("/sessioncheck", isAuth, (_, res) => {
  res.sendStatus(200);
});

router.use('/user', user);
router.use(search);
router.use('/friends', friends)

export default router;
