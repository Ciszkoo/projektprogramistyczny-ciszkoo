import { Request, Response } from "express";
import { get } from "lodash";
import { Session } from "../model/session.model";
import { CreateSessionInput } from "../schema/auth.schema";
import {
  getSessionById,
  signAccessToken,
  signRefreshToken,
} from "../service/auth.service";
import { getUserByEmail } from "../service/user.service";
import { verifyJwt } from "../utils/jwt";
import log from "../utils/logger";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    await user.validatePassword(password);
    const accessToken = signAccessToken(user);
    const refreshToken = await signRefreshToken(user.email);

    return res.send({ accessToken, refreshToken });
  } catch {
    log.error("Could not create session");
    return res.send("Invalid email or password");
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken = get(req, "headers.x-refresh") as string;

  try {
    const decoded: Session | null = verifyJwt<Session>(
      refreshToken,
      "refreshTokenPublicKey"
    );
    if (!decoded) {
      throw new Error();
    }
    const session = await getSessionById(decoded.id);
    const user = await getUserByEmail(session.email);
    const accessToken = signAccessToken(user);

    return res.send({ accessToken });
  } catch {
    return res.status(401).send("Could not refressh access token");
  }
};
