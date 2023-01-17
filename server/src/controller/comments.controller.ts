import { Request, Response } from "express";
import {
  CreateCommentInput,
  EditCommentInput,
} from "../schema/comments.schema";
import {
  createComment,
  deleteComment,
  editComment,
  likeComment,
  unlikeComment,
} from "../service/comments.service";
import { RequestParams } from "../types/types";

// Tworzenie komentarza
export const createCommentHandler = async (
  req: Request<RequestParams, {}, CreateCommentInput>,
  res: Response
) => {
  const { content } = req.body;
  const postId = req.params.id;
  const userId = req.session.passport?.user as string;
  const querry = await createComment(userId, postId, content);
  if (!querry) {
    return res.status(500).send({ message: "Could not create comment" });
  }
  return res.status(200).send({ message: "Comment created" });
};

// Usuwanie komentarza
export const deleteCommentHandler = async (req: Request, res: Response) => {
  const id = req.params.id;
  const querry = await deleteComment(id);
  if (!querry) {
    return res.status(500).send({ message: "Could not delete comment" });
  }
  return res.status(200).send({ message: "Comment deleted" });
};

// Edycja komentarza
export const editCommentHandler = async (
  req: Request<RequestParams, {}, EditCommentInput>,
  res: Response
) => {
  const { content } = req.body;
  const commentId = req.params.id;
  const querry = await editComment(commentId, content);
  if (!querry) {
    return res.status(500).send({ message: "Could not edit comment" });
  }
  return res.status(200).send({ message: "Comment edited" });
};

// Polubienie komentarza
export const likeCommentHandler = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const userId = req.session.passport?.user as string;
  const querry = await likeComment(userId, commentId);
  if (!querry) {
    return res.status(500).send({ message: "Could not like comment" });
  }
  return res.status(200).send({ message: "Comment liked" });
};

// Odlubienie komentarza
export const unlikeCommentHandler = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const userId = req.session.passport?.user as string;
  const querry = await unlikeComment(userId, commentId);
  if (!querry) {
    return res.status(500).send({ message: "Could not unlike comment" });
  }
  return res.status(200).send({ message: "Comment unliked" });
};
