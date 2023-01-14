import driver from "../utils/neoDriver";

export const invite = async (id: string, friendId: string) => {
  const session = driver.session();

  const result = await session.run(
    "MATCH (u:User), (f:User) WHERE u.id = $id AND f.id = $friendId MERGE (u)-[:FRIEND_REQUEST]->(f)",
    { id, friendId }
  );

  session.close();

  if (!result.summary.counters.containsUpdates()) {
    return false;
  }

  return true;
};
