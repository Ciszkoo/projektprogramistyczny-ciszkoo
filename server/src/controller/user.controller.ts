import { Request, Response } from "express";
import { User } from "../model/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import { AlreadyExistsError } from "../utils/errors";
import log from "../utils/logger";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const userCandidate = new User(req.body);

  try {
    await createUser(userCandidate);

    return res.send("User created");
  } catch (error) {
    if (error instanceof AlreadyExistsError) {
      log.error(error.message);
      return res.status(409).send(error.message);
    }
    log.error("Could not create user");
    return res.status(500).send("Could not create user");
  }
};

export const getCurrentUserHandler = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
