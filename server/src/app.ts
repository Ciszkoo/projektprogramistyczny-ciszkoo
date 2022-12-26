require("dotenv").config();
import express from "express";
import config from "config";

import driver from "./utils/connectToDb";
import logger from "./utils/logger";

const app = express();
const port = config.get<number>("port");

app.listen(port, () => logger.info(`Server running on port ${port}`));

const closeDriver = async () => {
  await driver.close();
};

process.on("SIGINT", closeDriver);
