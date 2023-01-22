import { Request, Response } from "express";
import { CreatePostInput, EditPostInput } from "../schema/post.schema";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getMyPosts,
  getOtherPosts,
  likePost,
  unlikePost,
} from "../service/posts.service";
import { RequestParams } from "../types/types";

// Tworzenie posta
export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { content, privacy, image } = req.body;
  const id = req.session.passport?.user as string;
  const url = typeof image === "string" ? `${image}` : "";
  const querry = await createPost(id, content, privacy, url);
  if (!querry) {
    return res.status(500).send({ message: "Could not create post" });
  }
  return res.status(200).send({ message: "Post created" });
};

// Usuwanie posta
export const deletePostHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const querry = await deletePost(id);
  if (!querry) {
    return res.status(500).send({ message: "Could not delete post" });
  }
  return res.status(200).send({ message: "Post deleted" });
};

// Edycja posta
export const editPostHandler = async (
  req: Request<RequestParams, {}, EditPostInput>,
  res: Response
) => {
  const body = req.body;
  const content = typeof body.content !== "undefined" ? body.content : null;
  const privacy = typeof body.privacy !== "undefined" ? body.privacy : null;
  const image =
    typeof body.image !== "undefined"
      ? `${body.image}`
      : null;
  const postId = req.params.id;
  const id = req.session.passport?.user as string;
  const querry = await editPost(id, postId, content, privacy, image);
  if (!querry) {
    return res.status(500).send({ message: "Could not edit post" });
  }
  return res.status(200).send({ message: "Post edited" });
};

// Polubienie posta
export const likePostHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const postId = req.params.id;
  const querry = await likePost(id, postId);
  if (!querry) {
    return res.status(500).send({ message: "Could not like post" });
  }
  return res.status(200).send({ message: "Post liked" });
};

// Odlubienie posta
export const unlikePostHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const postId = req.params.id;
  const querry = await unlikePost(id, postId);
  if (!querry) {
    return res.status(500).send({ message: "Could not unlike post" });
  }
  return res.status(200).send({ message: "Post unliked" });
};

// Pobranie moich postów
export const getMyPostsHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const page = parseInt(req.params.page, 10);
  const query = await getMyPosts(id, page);
  if (!query) {
    return res.status(500).send({ message: "Could not get posts" });
  }
  return res.status(200).send(query);
};

// Pobieranie wszystkich dostępnych postów
export const getAllPostsHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const page = parseInt(req.params.page, 10);
  const query = await getAllPosts(id, page);
  if (!query) {
    return res.status(500).send({ message: "Could not get posts" });
  }
  return res.status(200).send(query);
};

// Pobieranie postów innego użytkownika
export const getPostsHandler = async (req: Request, res: Response) => {
  const myId = req.session.passport?.user as string;
  const id = req.params.id;
  const page = parseInt(req.params.page, 10);
  const query = id === myId ? await getMyPosts(id, page) :await getOtherPosts(myId, id, page);
  if (!query) {
    return res.status(500).send({ message: "Could not get posts" });
  }
  return res.status(200).send(query);
};
