require("dotenv").config();
import express from "express";
import config from "config";

import driver from "./utils/neoDriver";
import logger from "./utils/logger";
import router from "./routes/index";
import deserializeUser from "./middleware/deserializeUser";

const app = express();

app.use(express.json());

app.use(deserializeUser);

app.use(router);

const port = config.get<number>("port");

app.listen(port, () =>
  logger.info(`Server running on http://localhost:${port}`)
);

const closeDriver = async () => {
  await driver.close();
};

process.on("SIGINT", closeDriver);
