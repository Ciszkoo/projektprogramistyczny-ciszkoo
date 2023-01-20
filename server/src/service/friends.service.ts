import log from "../utils/logger";
import driver from "../utils/neoDriver";

// Wysyłanie zaproszenia do znajomych
export const invite = async (id: string, friendId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User), (f:User) WHERE u.id = $id AND f.id = $friendId MERGE (u)-[:FRIEND_REQUEST]->(f)",
      { id, friendId }
    );
    if (!result.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Akceptowanie zaproszenia do znajomych
export const accept = async (id: string, friendId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)<-[r:FRIEND_REQUEST]-(f:User) WHERE u.id = $id AND f.id = $friendId MERGE (u)-[:FRIENDS]->(f) MERGE (u)<-[:FRIENDS]-(f) DELETE r",
      { id, friendId }
    );
    if (!result.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    log.error(error);
    return false;
  } finally {
    await session.close();
  }
};

// Odrzucenie zaproszenia do znajomych
export const decline = async (id: string, friendId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)<-[r:FRIEND_REQUEST]-(f:User) WHERE u.id = $id AND f.id = $friendId DELETE r",
      { id, friendId }
    );
    if (!result.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    log.error(error);
    return false;
  } finally {
    await session.close();
  }
};

// Anulowanie zaproszenia do znajomych
export const cancel = async (id: string, friendId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)-[r:FRIEND_REQUEST]->(f:User) WHERE u.id = $id AND f.id = $friendId DELETE r",
      { id, friendId }
    );
    if (!result.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    log.error(error);
    return false;
  } finally {
    await session.close();
  }
};

// Usuwanie znajomego
export const remove = async (id: string, friendId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)-[r:FRIENDS]-(f:User) WHERE u.id = $id AND f.id = $friendId DELETE r",
      { id, friendId }
    );
    if (!result.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    log.error(error);
    return false;
  } finally {
    await session.close();
  }
};

// Pobieranie wszystkich zaproszeń do znajomych
export const getInvitations = async (id: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)<-[r:FRIEND_REQUEST]-(f:User) WHERE u.id = $id RETURN f",
      { id }
    );
    const friends = result.records.map((record) => {
      const user = record.get("f").properties;
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      };
    });
    return friends;
  } catch (error) {
    log.error(error);
    return [];
  } finally {
    await session.close();
  }
};

// Pobieranie listy znajomych
export const getFriends = async (id: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)-[:FRIENDS]->(f:User) WHERE u.id = $id RETURN f",
      { id }
    );
    const friends = result.records.map((record) => {
      const user = record.get("f").properties;
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      };
    });
    return friends;
  } catch (error) {
    log.error(error);
    return [];
  } finally {
    await session.close();
  }
};

// Pobieranie propozycji znajomych
export const getProposals = async (id: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)-[:FRIENDS]->(f:User)-[:FRIENDS]->(u2:User) WHERE u.id = $id AND NOT u2.id=$id AND NOT (u)-[:FRIENDS]-(u2) AND NOT (u)-[:FRIEND_REQUEST]-(u2) RETURN u2",
      { id }
    );
    const friends = result.records.map((record) => {
      const user = record.get("u2").properties;
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      };
    });
    log.info(friends);
    return friends;
  } catch (error) {
    log.error(error);
    return [];
  } finally {
    await session.close();
  }
};
