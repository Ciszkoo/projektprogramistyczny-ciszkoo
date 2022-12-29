import { Neo4jError } from "neo4j-driver";
import { User, UserHashed } from "../model/user.model";
import { AlreadyExistsError } from "../utils/errors";
import log from "../utils/logger";
import driver from "../utils/neoDriver";

export const createUser = async (user: User) => {
  const session = driver.session();
  const userCandidate = await user.hashPassword();

  try {
    const result = await session.run(
      "CREATE (u:User {email: $email, name: $name, surname: $surname, password: $password, dateOfBirth: $dateOfBirth, gender: $gender}) RETURN u",
      { ...userCandidate }
    );
    const node = result.records[0].get(0);
    log.info(`User created, ${node.properties.name}`);
  } catch (e) {
    if (e instanceof Neo4jError) {
      log.error(e.message)
      throw new AlreadyExistsError("User already exists");
    }
    throw new Error("Could not create user");
  } finally {
    await session.close();
  }
};

export const getUserByEmail = async (email: string) => {
  const session = driver.session();
  
  try {
    const result = await session.run(
      "MATCH (u:User {email: $email}) RETURN u",
      {
        email,
      }
    );
    const node = result.records[0].get(0);
    return new User({...node.properties});
  } catch (e) {
    throw new Error("Could not get user1");
  } finally {
    await session.close();
  }
};