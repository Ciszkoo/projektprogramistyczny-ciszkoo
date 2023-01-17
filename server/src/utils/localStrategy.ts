import passport from "passport";
import { Strategy } from "passport-local";
import { validatePassword } from "../model/user.model";
import { getUserBy } from "../service/user.service";
import { UserNode } from "../types/types";
import log from "./logger";

passport.serializeUser((user: Partial<UserNode>, done) => {
  log.info("Serializing user...");
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  log.info("Deserializing user...");
  try {
    const user = await getUserBy("id", id);
    log.info(`User deserialized`);
    done(null, user);
  } catch (error) {
    log.error("Deserializing user failed");
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      log.info("Authenticating user...");
      try {
        if (!email || !password) {
          return done(null, false);
        }
        const user = await getUserBy("email", email);
        if (!user) {
          log.info("User not found");
          return done(null, false);
        }
        const isValid = await validatePassword(password, user.password);
        if (!isValid) {
          log.info("Invalid password");
          done(null, false);
        } else {
          log.info("User authenticated");
          done(null, user);
        }
      } catch (error) {
        log.error(JSON.stringify(error));
        done(error, false);
      }
    }
  )
);
