import "express-session";
declare module "express-session" {
  interface SessionData {
    username: string;
		authenticated:  boolean;
  }
}
