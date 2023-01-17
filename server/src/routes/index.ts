import express from "express";
import user from "./user.routes";
import search from "./search.routes";
import friends from "./friends.routes";
import posts from "./posts.routes";
import comments from "./comments.routes";
import { isAuth } from "../middleware/authMiddleware";
import { getUserHandler } from "../controller/user.controller";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.sendStatus(200);
});

router.get("/sessioncheck", isAuth, (_, res) => {
  res.sendStatus(200);
});

router.get("/test/:id", isAuth, getUserHandler);

router.use("/user", user);
router.use(search);
router.use("/friends", friends);
router.use("/posts", posts);
router.use("/comments", comments);

export default router;
