import { Neo4jError } from "neo4j-driver";
import { User } from "../model/user.model";
import { EditProp } from "../types/types";
import { AlreadyExistsError, CustomError } from "../utils/errors";
import log from "../utils/logger";
import driver from "../utils/neoDriver";

interface UserNode {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
  avatar: string;
}

export const createUser = async (user: User) => {
  const session = driver.session();
  const userCandidate = await user.hashPassword();
  log.info(`User candidate, ${JSON.stringify(userCandidate)}`);

  try {
    const result = await session.run(
      "CREATE (u:User {id: $id, email: $email, firstName: $firstName, lastName: $lastName, password: $password, dateOfBirth: $dateOfBirth, gender: $gender, avatar: $avatar}) RETURN u",
      { ...userCandidate }
    );
    const node = result.records[0].get(0);
    log.info(`User created, ${node.properties.firstName}`);
  } catch (e) {
    if (e instanceof Neo4jError) {
      log.error(e.message);
      throw new AlreadyExistsError("User already exists");
    }
    throw new Error("Could not create user");
  } finally {
    await session.close();
  }
};

export const getUserBy = async (cond: "email" | "id", value: string) => {
  const session = driver.session();
  const querryResult = await session
    .run(`MATCH (u:User {${cond}: $value}) RETURN u`, { value })
    .catch((err) => log.error(err))
    .finally(() => session.close());
  if (!querryResult) {
    throw new Error("Could not get user");
  }
  const node: UserNode = querryResult.records[0].get(0).properties;
  return new User(
    node.firstName,
    node.lastName,
    node.email,
    node.password,
    node.dateOfBirth,
    node.gender,
    node.avatar,
    node.id
  );
};

export const editData = async (prop: EditProp, value: string, id: string) => {
  const session = driver.session();

  try {
    await session.run(
      `MERGE (u:User {id: $id}) SET u.${prop} = $value RETURN u`,
      { value, id }
    );
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
      throw error;
    }
    log.error("Could not edit user");
    throw new Error("Could not edit user");
  } finally {
    await session.close();
  }
};

export const deleteUser = async (id: string) => {
  const session = driver.session();

  try {
    await session.run("MATCH (u:User {id: $id}) DETACH DELETE u", { id });
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
      throw error;
    }
    log.error("Could not delete user");
    throw new Error("Could not delete user");
  } finally {
    await session.close();
  }
};

export const updateAvatar = async (id: string, avatarID: string) => {
  const session = driver.session();
  const url = `https://ucarecdn.com/${avatarID}/`;
  const querryResult = await session
    .run("MERGE (u:User {id: $id}) SET u.avatar = $url RETURN u", {
      id,
      url,
    })
    .catch((err) => log.error(err))
    .finally(() => session.close());
  if (!querryResult) {
    throw new CustomError("Could not update avatar");
  }
  return true;
};

export const createPost = async (id: string, content: string) => {
  const session = driver.session();
  const timestamp = Date.now();
  const querryResult = await session
    .run(
      "MATCH (u:User {id: $id}) CREATE (u)-[:POSTED]->(p:Post {id: apoc.create.uuid(), content: $content, at: $timestamp}) RETURN p",
      { id, timestamp, content }
    )
    .catch((err) => log.error(err))
    .finally(() => session.close());
  if (!querryResult) {
    return false;
  }
  return true;
};

export const getUsersPosts = async (id: string, limit: number) => {
  const session = driver.session();
  const skip = (limit * 10).toFixed(0);
  const computedLimit = (limit * 10 + 10).toFixed(0);
  const querryResult = await session.run(
    "MATCH (u:User {id: $id})-[:POSTED]->(p:Post) RETURN u, p ORDER BY p.at DESC SKIP toInteger($skip) LIMIT toInteger($computedLimit)",
    { id, skip, computedLimit }
  );
  if (!querryResult) {
    return;
  }
  const posts = querryResult.records.map((record) => {
    const user = record.get(0).properties;
    const post = record.get(1).properties;
    return { userId: user.id, firstName: user.firstName, lastName: user.lastName, ...post };
  });
  return posts;
};
