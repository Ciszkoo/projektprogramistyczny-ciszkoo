import argo2 from "argon2";
import log from "../utils/logger";
import { CreateUserInput } from "../schema/user.schema";
import { v4 as uuid } from "uuid";

export const hashPassword = async (password: string): Promise<string> => {
  return await argo2.hash(password);
};

export const validatePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  try {
    return await argo2.verify(hash, password);
  } catch (error) {
    log.error(error, "Could not validate password");
    return false;
  }
};
