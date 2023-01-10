import express from "express";
import user from "./user.routes";
import search from "./search.routes";
import { isAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.sendStatus(200);
});

router.get("/sessioncheck", isAuth, (_, res) => {
  res.sendStatus(200);
});

router.use(user);
router.use(search);

export default router;
