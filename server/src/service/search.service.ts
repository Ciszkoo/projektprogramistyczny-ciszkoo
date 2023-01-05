import { User } from "../model/user.model";
import driver from "../utils/neoDriver";

export const search = async (query: string) => {
  const session = driver.session();
  const exp = `(?i).*${query}.*`;

  try {
    const result = await session.run(
      "MATCH (u:User) WHERE u.name =~ $exp OR u.surname =~ $exp RETURN u",
      {
        exp,
      }
    );
    const nodes = result.records.map((record) => record.get(0));

    return nodes.map((node) => new User({ ...node.properties }));
  } catch (e) {
    throw new Error("Could not get user");
  } finally {
    await session.close();
  }
};
