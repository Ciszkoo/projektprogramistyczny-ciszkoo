import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../model/user.model";
import { getUserBy } from "../service/user.service";
import log from "./logger";

passport.serializeUser((user: Partial<User>, done) => {
  log.info("Serializing user...");
  log.info(`Serializing: ${JSON.stringify(user)}`);
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
        const isValid = await user.validatePassword(password);
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
