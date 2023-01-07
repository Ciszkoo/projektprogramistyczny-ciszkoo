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
}

// TODO: Add constraints to database
export const createUser = async (user: User) => {
  const session = driver.session();
  const userCandidate = await user.hashPassword();
  log.info(`User candidate, ${JSON.stringify(userCandidate)}`);

  try {
    const result = await session.run(
      "CREATE (u:User {id: $id, email: $email, firstName: $firstName, lastName: $lastName, password: $password, dateOfBirth: $dateOfBirth, gender: $gender}) RETURN u",
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

  try {
    const result = await session.run(
      `MATCH (u:User {${cond}: $value}) RETURN u`,
      {
        value,
      }
    );
    const node: UserNode = result.records[0].get(0).properties;
    return new User(
      node.firstName,
      node.lastName,
      node.email,
      node.password,
      node.dateOfBirth,
      node.gender,
      node.id
    );
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
      throw error;
    }
    log.error("Could not get user");
    throw new Error("Could not get user");
  } finally {
    await session.close();
  }
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
