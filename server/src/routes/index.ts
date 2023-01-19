import express from "express";
import user from "./user.routes";
import search from "./search.routes";
import friends from "./friends.routes";
import posts from "./posts.routes";
import comments from "./comments.routes";
import { isAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.head("/sessioncheck", isAuth, (_, res) => {
  res.sendStatus(200);
});

router.use("/user", user);
router.use(search);
router.use("/friends", friends);
router.use("/posts", posts);
router.use("/comments", comments);

export default router;
