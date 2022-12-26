import neo4j from "neo4j-driver";
import config from "config";

const uri = config.get<string>("dbUri");

const driver = neo4j.driver(uri, neo4j.auth.basic("neo4j", "test1234"));

export default driver;
