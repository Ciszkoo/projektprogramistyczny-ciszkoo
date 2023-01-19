import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import {
  createUser,
  deleteUser,
  editData,
  getFriendshipStatus,
  getUserBy,
} from "../service/user.service";
import { omit } from "lodash";
import { EditProp, UserToCreate } from "../types/types";
import { EditBody, EditQuery } from "../schema/edit.schema";

// Tworzenie użytkownika
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const userCandidate: UserToCreate = {
    ...req.body,
    avatar: "https://ucarecdn.com/254642d1-e4a5-41f3-a1cc-586077d6a1d3/",
  };
  const result = await createUser(userCandidate);
  if (!result) {
    return res.status(409).send({ message: "User already exists" });
  }
  return res.status(201).send({ message: "User created" });
};

// Pobieranie danych o aktualnie zalogowanym użytkowniku
export const getMyselfHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const user = await getUserBy("id", id);
  if (!user) {
    return res.status(401).send({ message: "Couldn't find user" });
  }
  return res.status(200).send(omit(user, ["password"]));
};

// Logowanie użytkownika
export const loginHandler = (_: Request, res: Response) => {
  return res.status(200).send({ message: "Logged in" });
};

// Wylogowanie użytkownika
export const logoutHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout((err) => next(err));
  return res.status(200).send({ message: "Logged out" });
};

// Edycja danych użytkownika
export const editHandler = async (
  req: Request<{}, {}, EditBody, EditQuery>,
  res: Response
) => {
  const { value } = req.body;
  const prop = req.query.prop;
  const user = await getUserBy("id", req.session.passport?.user as string);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  if (
    user[prop] === value
  ) {
    return res.status(400).send({ message: "Same value" });
  }
  const result = await editData(
    prop,
    value,
    req.session.passport?.user as string
  );
  if (!result) {
    return res.status(500).send({ message: "Could not update data" });
  }
  return res.status(200).send({ message: "Name updated" });
};

// Usuwanie użytkownika
export const deleteUserHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const result = await deleteUser(id);
  if (!result) {
    return res.status(500).send({ message: "Could not delete user" });
  }
  return res.status(200).send({ message: "User deleted" });
};

// Pobieranie danych o innym użytkowniku
export const getUserHandler = async (req: Request, res: Response) => {
  const myId = req.session.passport?.user as string;
  const id = req.params.id;
  const user = await getUserBy("id", id);
  if (!user) {
    return res.status(401).send({ message: "Couldn't find user" });
  }
  const relation = await getFriendshipStatus(id, myId);
  if (!relation) {
    return res.status(500).send({ message: "Couldn't get user info" });
  }
  return res
    .status(200)
    .send({ ...omit(user, ["password"]), friendship: relation });
};
