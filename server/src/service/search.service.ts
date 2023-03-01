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
    `CALL apoc.search.node('{User: ["firstName", "lastName"]}', '=~', $exp) YIELD node AS u WHERE NOT u.id = $id RETURN u LIMIT 5`,
    { exp, id }
  );

  session.close();

  if (!results || results.records.length === 0) {
    log.error("Could not find users");
    return null;
  }

  const mapped = results.records.map<SearchOutput>((record) => {
    return {
      id: record.get("u").properties.id,
      avatar: record.get("u").properties.avatar,
      firstName: record.get("u").properties.firstName,
      lastName: record.get("u").properties.lastName,
    };
  });

  return mapped;
};
