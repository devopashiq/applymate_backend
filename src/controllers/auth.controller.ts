import { NextFunction, Response, Request } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private service = new AuthService();

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.service.register(req.body);
      const { user, accessToken, refreshToken } = result;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.success({ user, accessToken }, "User Created Successfully");
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = req.body;

      const result = await this.service.login(data);
      const { user, accessToken, refreshToken } = result;
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.success(user, "User Logged In Successfully");
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const result = await this.service.logout(userId!);

      res.clearCookie("refreshToken");
      res.success("", "User Logout In Successfully");
    } catch (error) {
      next(error);
    }
  };

  me = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const response = await this.service.getLoggedInUser(userId);

      res.success(response, "Logged In User Fetched Successfully");
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const refreshTokenFromCookie = req.cookies?.refreshToken;
      console.log("refreshtoken",refreshTokenFromCookie)

      const result = await this.service.refreshToken(refreshTokenFromCookie);
       const {user,accessToken,refreshToken}= result
      res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.success({user,accessToken}, "User Logged In Successfully");
    } catch (error) {
      next(error);
    }
  };
}
