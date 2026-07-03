import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authLoginSchema, authRegisterSchema } from "../dtos/auth.dto";
import { validateRequest } from "../middleware/ValidateRquest";
import { isLoggedUser } from "../middleware/authmiddleware";

const AuthRouter = Router();

const controller = new AuthController();




  AuthRouter.post("/sign",validateRequest(authRegisterSchema),controller.register);
  AuthRouter.post("/login",validateRequest(authLoginSchema),controller.login);
  AuthRouter.get("/me",isLoggedUser,controller.me);
  AuthRouter.post("/logout",controller.logout);
  AuthRouter.post("/refresh",controller.refreshToken)
  
export default AuthRouter;
