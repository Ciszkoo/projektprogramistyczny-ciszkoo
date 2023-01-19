import { Request, Response } from "express";
import {
  accept,
  cancel,
  decline,
  getFriends,
  getInvitations,
  getProposals,
  invite,
  remove,
} from "../service/friends.service";
import { getFriendshipStatus } from "../service/user.service";

// Wysyłanie zaproszenia do znajomych
export const inviteHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const friendId = req.params.id;

  const result = await invite(id, friendId);
  if (!result) {
    return res.status(404).send({ message: "Could not send invitation" });
  }
  return res.status(200).send({ message: "Invitation sent" });
};

// Akceptowanie zaproszenia do znajomych
export const acceptHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const friendId = req.params.id;

  const result = await accept(id, friendId);
  if (!result) {
    return res.status(404).send({ message: "Could not accept invitation" });
  }
  return res.status(200).send({ message: "Invitation accepted" });
};

// Odrzucenie zaproszenia do znajomych
export const declineHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const friendId = req.params.id;

  const result = await decline(id, friendId);
  if (!result) {
    return res.status(404).send({ message: "Could not decline invitation" });
  }
  return res.status(200).send({ message: "Invitation declined" });
};

// Anulowanie zaproszenia do znajomych
export const cancelHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const friendId = req.params.id;

  const result = await cancel(id, friendId);
  if (!result) {
    return res.status(404).send({ message: "Could not cancel invitation" });
  }
  return res.status(200).send({ message: "Invitation canceled" });
};

// Usuwanie znajomego
export const removeHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;
  const friendId = req.params.id;

  const result = await remove(id, friendId);
  if (!result) {
    return res.status(404).send({ message: "Could not remove friend" });
  }
  return res.status(200).send({ message: "Friend removed" });
};

// Pobieranie wszystich zaproszeń do znajomych
export const getInvitationsHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;

  const result = await getInvitations(id);
  if (!result) {
    return res.status(404).send({ message: "Could not get invitations" });
  }
  return res.status(200).send({ invitations: result });
};

// Pobieranie listy znajomych
export const getFriendsHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;

  const result = await getFriends(id);
  if (!result) {
    return res.status(404).send({ message: "Could not get friends" });
  }
  return res.status(200).send({ friends: result });
};

// Pobieranie propozycji znajomych
export const getProposalsHandler = async (req: Request, res: Response) => {
  const id = req.session.passport?.user as string;

  const result = await getProposals(id);
  if (!result) {
    return res.status(404).send({ message: "Could not get proposals" });
  }
  return res.status(200).send({ proposals: result });
};

// Pobieranie statusu znajomości
export const getFriendshipStatusHandler = async (req: Request, res: Response) => {
  const myId = req.session.passport?.user as string;
  const id = req.params.id;
  const relation = await getFriendshipStatus(id, myId);
  if (!relation) {
    return res.status(500).send({ message: "Couldn't get user info" });
  }
  return res.status(200).send({ friendship: relation });
}
