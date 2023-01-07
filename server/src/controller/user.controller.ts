import { NextFunction, Request, Response } from "express";
import { User } from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { createUser, getUserBy} from "../service/user.service";
import { AlreadyExistsError } from "../utils/errors";
import log from "../utils/logger";
import { omit } from "lodash";

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
    req.body.gender
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
  log.info("Current user", req.session);
  try {
    const user = await getUserBy("id", req.session.passport?.user as string);
    return res.status(200).send(omit(user, ["password"]));
  } catch (error) {
    return res.status(500).send({ err: "Could not get user" });
  }
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
