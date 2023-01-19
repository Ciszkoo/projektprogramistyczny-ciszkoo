import { hashPassword } from "../model/user.model";
import { EditProp, UserNode, UserToCreate } from "../types/types";
import log from "../utils/logger";
import driver from "../utils/neoDriver";

// Tworzenie użytkownika
export const createUser = async (user: UserToCreate) => {
  const session = driver.session();
  const userCandidate: UserToCreate = {
    ...user,
    password: await hashPassword(user.password),
  };
  try {
    const result = await session.run(
      "CREATE (u:User {id: apoc.create.uuid(), email: $email, firstName: $firstName, lastName: $lastName, password: $password, dateOfBirth: $dateOfBirth, gender: $gender, avatar: $avatar}) RETURN u.email",
      { ...userCandidate }
    );
    const userEmail = result.records[0].get("u.email");
    log.info(`User created, ${userEmail}`);
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Pobieranie danych o użytkowniku
export const getUserBy = async (cond: "email" | "id", value: string) => {
  const session = driver.session();
  try {
    const querryResult = await session.run(
      `MATCH (u:User {${cond}: $value}) RETURN u`,
      { value }
    );
    const user: UserNode = querryResult.records[0].get("u").properties;
    return user;
  } catch {
    return null;
  }
};

// Edycja danych użytkownika
export const editData = async (prop: EditProp, value: string, id: string) => {
  const session = driver.session();

  try {
    await session.run(
      `MERGE (u:User {id: $id}) SET u.${prop} = $value RETURN u`,
      { value, id }
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Usuwanie użytkownika
export const deleteUser = async (id: string) => {
  const session = driver.session();
  try {
    await session.run(
      "MATCH (c:Comment)<-[:COMMENTED]-(u:User {id: $id})-[:POSTED]->(p:Post) DETACH DELETE u, c, p",
      { id }
    );
    return true;
  } catch (error) {
    log.error("Could not delete user");
    return false;
  } finally {
    await session.close();
  }
};

// Zapytanie do bazy o status relacji między użytkownikami
export const getFriendshipStatus = async (myId: string, id: string) => {
  const session = driver.session();
  try {
    const q1 = await session.run(
      "MATCH (:User {id: $id})<-[relation]-(:User {id: $myId}) RETURN relation",
      { id, myId }
    );
    const q2 = await session.run(
      "MATCH (:User {id: $id})-[relation]->(:User {id: $myId}) RETURN relation",
      { id, myId }
    );
    if (q1.records.length && q2.records.length) {
      return "friends";
    }
    if (q1.records.length) {
      return "invitation";
    }
    if (q2.records.length) {
      return "invited";
    }
    return "none";
  } catch (error) {
    return null;
  } finally {
    await session.close();
  }
};
