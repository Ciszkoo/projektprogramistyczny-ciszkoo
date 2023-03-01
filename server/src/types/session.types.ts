import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    authenticated: boolean;
    user: {
      username: string;
      password: string;
    };
    passport: {
      user: string;
    };
  }
}
