import { Router } from "express";
import {
  acceptHandler,
  cancelHandler,
  declineHandler,
  getFriendsHandler,
  getFriendshipStatusHandler,
  getInvitationsHandler,
  getOtherUserFriendsHandler,
  getProposalsHandler,
  inviteHandler,
  removeHandler,
} from "../controller/friends.controller";
import { isAuth } from "../middleware/authMiddleware";
import validateResource from "../middleware/validateResource";
import { blankSchema } from "../schema/blank.schema";

const router = Router();

// Wysyłanie zaproszenia do znajomych
router.post(
  "/invite/:id",
  isAuth,
  validateResource(blankSchema),
  inviteHandler
);

// Akceptowanie zaproszenia do znajomych
router.post(
  "/accept/:id",
  isAuth,
  validateResource(blankSchema),
  acceptHandler
);

// Odrzucenie zaproszenia do znajomych
router.delete(
  "/decline/:id",
  isAuth,
  validateResource(blankSchema),
  declineHandler
);

// Anulowanie zaproszenia do znajomych
router.delete(
  "/cancel/:id",
  isAuth,
  validateResource(blankSchema),
  cancelHandler
);

// Usuwanie znajomego
router.delete(
  "/remove/:id",
  isAuth,
  validateResource(blankSchema),
  removeHandler
);

// Pobieranie zaproszeń
router.get(
  "/invitations",
  isAuth,
  validateResource(blankSchema),
  getInvitationsHandler
);

// Pobieranie znajomych
router.get("", isAuth, validateResource(blankSchema), getFriendsHandler);

// Pobieranie znajomych innego użytkownika
router.get("/:id", isAuth, validateResource(blankSchema), getOtherUserFriendsHandler);


// Pobieranie propozycji znajomych
router.get(
  "/proposals",
  isAuth,
  validateResource(blankSchema),
  getProposalsHandler
);

// Pobieranie statusu znajomości
router.get(
  "/friendship/:id",
  isAuth,
  validateResource(blankSchema),
  getFriendshipStatusHandler
);

export default router;
