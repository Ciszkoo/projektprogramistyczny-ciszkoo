import log from "../utils/logger";
import driver from "../utils/neoDriver";

// Tworzenie komentarza
export const createComment = async (
  userId: string,
  postId: string,
  content: string
) => {
  const session = driver.session();

  try {
    await session.run(
      "MATCH (u:User {id: $userId}), (p:Post {id: $postId}) CREATE (u)-[:COMMENTED]->(c:Comment {id: apoc.create.uuid(), content: $content, at: apoc.date.currentTimestamp()})-[:ON]->(p) RETURN c",
      { userId, postId, content }
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Usuwanie komentarza
export const deleteComment = async (commentId: string) => {
  const session = driver.session();

  try {
    await session.run("MATCH (c:Comment {id: $commentId}) DETACH DELETE c", {
      commentId,
    });
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Edycja komentarza
export const editComment = async (commentId: string, content: string) => {
  const session = driver.session();

  try {
    await session.run(
      "MERGE (c:Comment {id: $commentId}) SET c.content = $content RETURN c",
      { commentId, content }
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Polubienie komentarza
export const likeComment = async (id: string, commentId: string) => {
  const session = driver.session();

  try {
    await session.run(
      "MATCH (u:User {id: $id}) MATCH (c:Comment {id: $commentId}) MERGE (u)-[r:LIKED]->(c) RETURN r",
      { id, commentId }
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Odlubienie komentarza
export const unlikeComment = async (id: string, commentId: string) => {
  const session = driver.session();

  try {
    await session.run(
      "MATCH (u:User {id: $id})-[r:LIKED]->(c:Comment {id: $commentId}) DELETE r",
      { id, commentId }
    );
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Pobieranie komentarzy
export const getComments = async (postId: string, id: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)-[:COMMENTED]->(c:Comment)-[:ON]->(p:Post {id: $postId}) RETURN c, u.id, u.avatar, u.firstName, u.lastName ORDER BY c.at DESC",
      { postId }
    );
    const mapped = await Promise.all(
      result.records.map(async (record) => {
        return {
          ...record.get("c").properties,
          userId: record.get("u.id"),
          avatar: record.get("u.avatar"),
          firstName: record.get("u.firstName"),
          lastName: record.get("u.lastName"),
          likes: await getCommentLikes(record.get("c").properties.id),
          liked: await checkCommentLike(id, record.get("c").properties.id),
        };
      })
    );
    return mapped;
  } catch (error) {
    return [];
  } finally {
    await session.close();
  }
};

// Ilość polubień komentarza
export const getCommentLikes = async (commentId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User)-[r:LIKED]->(c:Comment {id: $commentId}) RETURN count(r)",
      { commentId }
    );
    return result.records[0].get("count(r)");
  } catch (error) {
    return 0;
  } finally {
    await session.close();
  }
};

// Sprawdzanie czy użytkownik polubił komentarz
export const checkCommentLike = async (id: string, commentId: string) => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (u:User {id: $id})-[r:LIKED]->(c:Comment {id: $commentId}) RETURN count(r)",
      { id, commentId }
    );
    return result.records[0].get("count(r)") > 0;
  } catch (error) {
    log.error(error);
    return false;
  } finally {
    await session.close();
  }
};
