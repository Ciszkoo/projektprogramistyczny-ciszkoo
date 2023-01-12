import log from "../utils/logger";
import driver from "../utils/neoDriver";

interface SearchOutput {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
}

export const search = async (id: string, query: string) => {
  const session = driver.session();
  const exp = `(?i).*${query}.*`;

  const results = await session.run(
    "MATCH (u:User) WHERE (u.firstName =~ $exp OR u.lastName =~ $exp) AND NOT u.id = $id RETURN u.id, u.avatar, u.firstName, u.lastName LIMIT 5",
    { exp, id }
  );

  session.close();

  if (!results || results.records.length === 0) {
    log.error("Could not find users");
    return null;
  }

  const mapped = results.records.map<SearchOutput>((record) => {
    return {
      id: record.get("u.id"),
      avatar: record.get("u.avatar"),
      firstName: record.get("u.firstName"),
      lastName: record.get("u.lastName"),
    };
  });

  return mapped;
};
