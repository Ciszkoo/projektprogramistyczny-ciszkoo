import { Request, Response } from "express";
import { invite } from "../service/friends.service";

export const inviteHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const friendId = req.params.id;

  const result = await invite(id, friendId);
  if (!result) {
    return res.status(404).send({ message: "Could not send invitation" });
  }
  return res.status(200).send({ message: "Invitation sent" });
};
