import { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import {
  createPost,
  createUser,
  deleteUser,
  editData,
  getUserBy,
  getUsersPosts,
  updateAvatar,
} from "../service/user.service";
import { AlreadyExistsError } from "../utils/errors";
import log from "../utils/logger";
import { omit } from "lodash";
import { EditProp } from "../types/types";
import { CreatePostInput } from "../schema/post.schema";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const userCandidate = new User(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    req.body.dateOfBirth,
    req.body.gender,
    "https://ucarecdn.com/254642d1-e4a5-41f3-a1cc-586077d6a1d3/"
  );

  try {
    await createUser(userCandidate);

    return res.status(201).send({ message: "User created" });
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      log.error(error.message);
      return res.status(409).send({ err: error.message });
    }
    log.error("Could not create user");
    return res.status(500).send({ err: "Could not create user" });
  }
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  const user = await getUserBy("id", req.session.passport?.user as string);

  if (!user) {
    return res.status(401).send({ err: "Not logged in" });
  }

  return res.status(200).send(omit(user, ["password"]));
};

export const loginHandler = (_: Request, res: Response) => {
  return res.status(200).send({ message: "Logged in" });
};

export const logoutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => next(err));
  return res.status(200).send({ message: "Logged out" });
};

export const editHandler = async (req: Request, res: Response) => {
  const { value } = req.body;
  const prop = req.params.prop as EditProp;
  try {
    const user = await getUserBy("id", req.session.passport?.user as string);
    if (user[prop] === value) {
      return res.status(400).send({ message: "Same value" });
    }
    await editData(prop, value, req.session.passport?.user as string);
    return res.status(200).send({ message: "Name updated" });
  } catch (error) {
    return res.status(500).send({ message: "Could not update name" });
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    await deleteUser(req.session.passport?.user as string);
    return res.status(200).send({ message: "User deleted" });
  } catch (error) {
    return res.status(500).send({ message: "Could not delete user" });
  }
};

export const avatarUpdateHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const { avatarID } = req.body;
  const querry = await updateAvatar(id, avatarID).catch((err) => {
    log.error(err);
  });

  if (!querry) {
    return res.status(500).send({ message: "Could not update avatar" });
  }

  return res.status(200).send({ message: "Avatar updated" });
};

export const createPostHandler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { content } = req.body;
  const id = req.session.passport?.user as string;

  const querry = await createPost(id, content).catch((err) => {
    log.error(err);
  });

  if (!querry) {
    return res.status(500).send({ message: "Could not create post" });
  }

  return res.status(200).send({ message: "Post created" });
};

export const getUsersPostsHandler = async (req: Request, res: Response) => {
  const page = parseInt(req.params.page, 10);
  const id = req.session.passport?.user as string;

  const querry = await getUsersPosts(id, page).catch((err) => {
    log.error(err);
  });

  if (!querry) {
    return res.status(500).send({ message: "Could not get posts" });
  }

  return res.status(200).send({ posts: querry });
};
