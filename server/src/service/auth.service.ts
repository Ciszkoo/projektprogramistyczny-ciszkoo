import { omit } from "lodash";
import { Node } from "neo4j-driver";
import { Session } from "../model/session.model";
import { privateFields, User } from "../model/user.model";
import { SessionAlreadyExistsError } from "../utils/errors";
import { signJwt } from "../utils/jwt";
import log from "../utils/logger";
import driver from "../utils/neoDriver";

export const signAccessToken = (user: User) => {
  const payload = omit({ ...user }, privateFields);

  const accessToken = signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "15m",
  });
  return accessToken;
};

export const createSession = async (email: string): Promise<Session> => {
  const session = driver.session();

  try {
    const sessionCandidate = new Session(email);
    await session.run(
      "MATCH (u: User {email: $email}) CREATE (s:Session {id: $id, valid: $valid})<-[:Logged]-(u) RETURN s",
      { ...sessionCandidate }
    );
    log.info(`Session created for user: ${sessionCandidate.email}`);
    return sessionCandidate;
  } catch (e) {
    throw new Error("Could not create session");
  } finally {
    await session.close();
  }
};

export const signRefreshToken = async (email: string) => {
  const session = await createSession(email);

  const refreshToken = signJwt({ ...session }, "refreshTokenPrivateKey", {
    expiresIn: "7d",
  });

  return refreshToken;
};

export const getSessionById = async (id: string) => {
  const session = driver.session();
  try {
    const result = await session.run(
      "MATCH (s:Session {id: $id})<-[:Logged]-(u:User) RETURN s.id as id, s.valid as valid, u.email as email",
      {
        id,
      }
    );
    const userSession = result.records[0].toObject() as Session;
    return userSession;
  } catch (e) {
    throw new Error("Could not get session");
  } finally {
    await session.close();
  }
};
