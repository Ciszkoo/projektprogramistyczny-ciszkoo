import { PostNode } from "../types/types";
import driver from "../utils/neoDriver";
import { getComments } from "./comments.service";
import { getFriendshipStatus } from "./user.service";

// Tworzenie posta
export const createPost = async (
  userId: string,
  content: string,
  privacy: string,
  image?: string
) => {
  const session = driver.session();

  try {
    const res = await session.run(
      "MATCH (u:User {id: $userId}) CREATE (u)-[:POSTED]->(p:Post {id: apoc.create.uuid(), content: $content, at: apoc.date.currentTimestamp(), privacy: $privacy, image: $image}) RETURN p",
      { userId, content, privacy, image }
    );
    if (!res.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Usuwanie posta
export const deletePost = async (postId: string) => {
  const session = driver.session();

  try {
    const res = await session.run("MATCH (p:Post {id: $postId}) DETACH DELETE p", {
      postId,
    });
    if (!res.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Edycja posta
export const editPost = async (
  id: string,
  postId: string,
  content: string | null,
  privacy: string | null,
  image: string | null
) => {
  const session = driver.session();

  try {
    const res = await session.run(
      `MERGE (p:Post {id: $postId})${
        content !== null ? ` SET p.content = "${content}"` : ""
      }${privacy !== null ? ` SET p.privacy = "${privacy}"` : ""}${
        image !== null ? ` SET p.image = "${image}"` : ""
      } RETURN p`,
      { id, postId }
    );
    if (!res.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Polubienie posta
export const likePost = async (id: string, postId: string) => {
  const session = driver.session();

  try {
    const res = await session.run(
      "MATCH (u:User {id: $id}) MATCH (p:Post {id: $postId}) MERGE (u)-[:LIKED]->(p) RETURN p",
      { id, postId }
    );
    if (!res.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Odlubienie posta
export const unlikePost = async (id: string, postId: string) => {
  const session = driver.session();

  try {
    const res = await session.run(
      "MATCH (u:User {id: $id})-[r:LIKED]->(p:Post {id: $postId}) DELETE r",
      { id, postId }
    );
    if (!res.summary.counters.containsUpdates()) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    session.close();
  }
};

// Ilość polubień posta
export const getPostLikes = async (postId: string) => {
  const session = driver.session();

  try {
    const querryResult = await session.run(
      "MATCH (p:Post {id: $postId})<-[r:LIKED]-(u:User) RETURN count(r)",
      { postId }
    );
    const likes = querryResult.records[0].get("count(r)");
    return likes;
  } catch (error) {
    return 0;
  } finally {
    await session.close();
  }
};

// Sprawdzanie czy użytkownik polubił post
export const checkIfLiked = async (id: string, postId: string) => {
  const session = driver.session();

  try {
    const querryResult = await session.run(
      "MATCH (u:User {id: $id})-[r:LIKED]->(p:Post {id: $postId}) RETURN count(r)",
      { id, postId }
    );
    return querryResult.records[0].get("count(r)") > 0;
  } catch (error) {
    return false;
  } finally {
    await session.close();
  }
};

// Pobieranie moich postów z komentarzami
export const getMyPosts = async (id: string, limit: number) => {
  const session = driver.session();
  const skip = (limit * 10).toFixed(0);
  const computedLimit = (limit * 10 + 10).toFixed(0);
  try {
    const querryResult = await session.run(
      "MATCH (u:User {id: $id})-[:POSTED]->(p:Post) RETURN u, p ORDER BY p.at DESC SKIP toInteger($skip) LIMIT toInteger($computedLimit)",
      { id, skip, computedLimit }
    );
    if (!querryResult) {
      return null;
    }
    const posts = await Promise.all(
      querryResult.records.map<Promise<PostNode>>(async (record) => {
        const user = record.get("u").properties;
        const post = record.get("p").properties;
        const likes = await getPostLikes(post.id);
        const comments = await getComments(post.id, id);
        return {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          postId: post.id,
          content: post.content,
          at: post.at,
          privacy: post.privacy,
          image: post.image,
          likes: likes,
          liked: await checkIfLiked(id, post.id),
          comments: comments,
        };
      })
    );
    return posts;
  } catch (error) {
    return null;
  } finally {
    await session.close();
  }
};

// Pobieranie wszystkich dostepnych postów z komentarzami
export const getAllPosts = async (id: string, limit: number) => {
  const session = driver.session();
  const skip = (limit * 10).toFixed(0);
  const computedLimit = (limit * 10 + 10).toFixed(0);
  const publicPriv = "public";
  const friendsPriv = "friends";
  try {
    const querryResult = await session.run(
      "MATCH (u:User {id: $id})-[:FRIENDS]->(f:User)-[:POSTED]->(p:Post) WHERE p.privacy=$publicPriv OR p.privacy=$friendsPriv RETURN f, p ORDER BY p.at DESC SKIP toInteger($skip) LIMIT toInteger($computedLimit)",
      { id, skip, computedLimit, publicPriv, friendsPriv }
    );
    if (!querryResult) {
      return null;
    }
    const posts = await Promise.all(
      querryResult.records.map<Promise<PostNode>>(async (record) => {
        const user = record.get("f").properties;
        const post = record.get("p").properties;
        const likes = await getPostLikes(post.id);
        const comments = await getComments(post.id, id);
        return {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          postId: post.id,
          content: post.content,
          at: post.at,
          privacy: post.privacy,
          image: post.image,
          likes: likes,
          liked: await checkIfLiked(id, post.id),
          comments: comments,
        };
      })
    );
    return posts;
  } catch (error) {
    return null;
  } finally {
    await session.close();
  }
};

// Pobieranie postów innego użytkownika z komentarzami
export const getOtherPosts = async (
  id: string,
  otherId: string,
  limit: number
) => {
  const privacy =
    (await getFriendshipStatus(id, otherId)) === "friends"
      ? "friends"
      : "public";
  const publicPriv = "public";
  const skip = (limit * 10).toFixed(0);
  const computedLimit = (limit * 10 + 10).toFixed(0);
  const session = driver.session();
  try {
    const querryResult = await session.run(
      "MATCH (u:User {id: $otherId})-[:POSTED]->(p:Post) WHERE p.privacy=$privacy OR p.privacy=$publicPriv RETURN u, p ORDER BY p.at DESC SKIP toInteger($skip) LIMIT toInteger($computedLimit)",
      { otherId, skip, computedLimit, privacy, publicPriv }
    );
    if (!querryResult) {
      return null;
    }
    const posts = await Promise.all(
      querryResult.records.map<Promise<PostNode>>(async (record) => {
        const user = record.get("u").properties;
        const post = record.get("p").properties;
        const likes = await getPostLikes(post.id);
        const comments = await getComments(post.id, id);
        return {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          postId: post.id,
          content: post.content,
          at: post.at,
          privacy: post.privacy,
          image: post.image,
          likes: likes,
          liked: await checkIfLiked(id, post.id),
          comments: comments,
        };
      })
    );
    return posts;
  } catch (error) {
    return null;
  } finally {
    await session.close();
  }
};

// Pobieranie ilości postów
export const getFriendsPostsCount = async (id: string) => {
  const session = driver.session();
  try {
    const querryResult = await session.run(
      "MATCH (u:User {id: $id})-[:FRIENDS]->(f:User)-[:POSTED]->(p:Post) RETURN count(p)",
      { id }
    );
    return querryResult.records[0].get("count(p)");
  } catch (error) {
    return 0;
  } finally {
    await session.close();
  }
};

// Pobieranie ilości postów użytkownika
export const getUserPostsCount = async (id: string) => {
  const session = driver.session();
  try {
    const querryResult = await session.run(
      "MATCH (u:User {id: $id})-[:POSTED]->(p:Post) RETURN count(p)",
      { id }
    );
    return querryResult.records[0].get("count(p)");
  } catch (error) {
    return 0;
  } finally {
    await session.close();
  }
}

// Pobieranie ilości postów innego użytkownika
export const getOtherPostsCount = async (id: string, otherId: string) => {
  const privacy =
    (await getFriendshipStatus(id, otherId)) === "friends"
      ? "friends"
      : "public";
  const publicPriv = "public";
  const session = driver.session();
  try {
    const querryResult = await session.run("MATCH (u:User {id: $otherId})-[:POSTED]->(p:Post) WHERE p.privacy=$privacy OR p.privacy=$publicPriv RETURN count(p)", { otherId, privacy, publicPriv });
    return querryResult.records[0].get("count(p)");
  } catch (error) {
    return 0;
  }
}

// Pobieranie posta
export const getPost = async (postId: string, myId: string) => {
  const session = driver.session();
  try {
    const querryResult = await session.run(
      "MATCH (f:User)-[:POSTED]->(p:Post {id: $postId}) RETURN f, p",
      { postId }
    );
    if (!querryResult.records[0]) {
      return null;
    }
    const user = querryResult.records[0].get("f").properties;
    const post = querryResult.records[0].get("p").properties;
    const likes = await getPostLikes(post.id);
    const comments = await getComments(postId, myId);
    const liked = await checkIfLiked(myId, postId);
    const response = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      postId: post.id,
      content: post.content,
      at: post.at,
      privacy: post.privacy,
      image: post.image,
      likes: likes,
      liked: liked,
      comments: comments,
    };
    return response;
  } catch (error) {
    return null;
  } finally {
    await session.close();
  }
};
