import neo4j from "neo4j-driver";
import config from "config";
import * as dotenv from "dotenv";

dotenv.config();

const uri = config.get<string>("dbUri");
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password), {
  disableLosslessIntegers: true,
});

export default driver;
