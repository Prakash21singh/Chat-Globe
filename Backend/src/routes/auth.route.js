import * as Auth from "../controllers/auth.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
export const routeConfig = function (app) {
  //LOGIN ROUTE
  app.post("/auth/login", [Auth.Login]);

  //SIGN UP ROUTE
  app.post("/auth/signup", [Auth.SignUp]);

  //LOGOUT
  app.post("/auth/logout", [verifyAuth, Auth.Logout]);

  //GET LOGGED IN USER DATA
  app.get("/auth/data", [verifyAuth, Auth.GetData]);
};
