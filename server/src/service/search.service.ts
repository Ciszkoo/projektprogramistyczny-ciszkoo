import { User } from "../model/user.model";
import log from "../utils/logger";
import driver from "../utils/neoDriver";

export const search = async (query: string) => {
  const session = driver.session();
  const exp = `(?i).*${query}.*`;

  try {
    const result = await session.run(
      "MATCH (u:User) WHERE u.firstName =~ $exp OR u.lastName =~ $exp RETURN u LIMIT 2",
      {
        exp,
      }
    );
    const nodes = result.records.map((record) => record.get(0));

    return nodes.map(
      (node) =>
        new User(
          node.properties.firstName,
          node.properties.lastName,
          node.properties.email,
          node.properties.password,
          node.properties.dateOfBirth,
          node.properties.gender,
          node.properties.id
        )
    );
  } catch (e) {
    throw new Error("Could not get user");
  } finally {
    await session.close();
  }
};
