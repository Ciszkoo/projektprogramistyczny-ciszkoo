import express from "express";
import user from "./user.routes";
import search from "./search.routes";
import log from "../utils/logger";
import passport from "passport";

const router = express.Router();

router.get("/healthcheck", (_, res) => {
  res.sendStatus(200);
});

router.post("/sessioncheck", passport.authenticate("local"), (req, res) => {
  log.info("Logged in");
  res.status(200).send(req.session);
});

router.use(user);
router.use(search);

export default router;
