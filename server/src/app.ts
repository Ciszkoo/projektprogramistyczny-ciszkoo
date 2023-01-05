require("dotenv").config();
import express from "express";
import config from "config";
import session from "express-session";

import driver from "./utils/neoDriver";
import log from "./utils/logger";
import router from "./routes/index";
import cors from "./utils/cors";
import passport from "passport";

let Neo4jStore = require("connect-neo4j")(session);
const port = config.get<number>("port");
const app = express();

app.use(cors);
app.use(express.json());

app.use(
  session({
    store: new Neo4jStore({ client: driver }),
    saveUninitialized: false,
    secret: config.get<string>("sessionSecret"),
    resave: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, sameSite: false },
  })
);

require("./utils/localStrategy");

app.use((req, _, next) => {
  log.info(`${req.method}: ${req.path}`);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(port, () => log.info(`Server running on http://localhost:${port}`));

const closeDriver = async () => {
  await driver.close();
};

process.on("SIGINT", closeDriver);
