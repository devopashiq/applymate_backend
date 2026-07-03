import { AuthCreateRequest, AuthLoginREquest } from "../dtos/auth.dto";
import { ExpressError } from "../middleware/errorHandler";
import { AuthRepository } from "../repositories/auth.repository";
import {
  AuthResponse,
  AuthUser,
  RefreshTokenPayload,
  SafeAuthUser,
} from "../types/auth.type";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import bcrypt from "bcrypt";
import type { StringValue } from "ms";

export class AuthService {
  private repo = new AuthRepository();



  private accessSecret = process.env.JWT_SECRET_ACCESS!;
  
  private accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN as StringValue;
  private refreshSecret = process.env.JWT_SECRET_REFRESH!;
  private refreshTokenExpiresIn = process.env
    .JWT_REFRESH_EXPIRES_IN as StringValue;

  async register(data: AuthCreateRequest): Promise<AuthResponse> {
    const { email, password } = data;

    const userExists = await this.repo.findByEmail(email);

    if (userExists) {
      throw new ExpressError("User Already Exist", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedData = { ...data, password: hashedPassword };

    const user = await this.repo.create(hashedData);

    const accessToken = this.generateAccessToken(
      user._id.toString(),
      user.email,
    );

    const refreshToken = this.generaterefreshToken(
      user._id.toString(),
      user.email,
    );
    await this.repo.addRefreshToken(user._id.toString(), refreshToken);

    return {
      user: this.preventSensitiveInformation(user),
      accessToken,
      refreshToken,
    }; 
  }

  async login(data: AuthLoginREquest): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await this.repo.findByEmail(email);

    if (!user) {
      throw new ExpressError("Invalid Credentails", 401);
    }

    const hash = user.password;
    const isPasswordValid = await bcrypt.compare(password, hash);

    if (isPasswordValid) {
      const accessToken = this.generateAccessToken(
        user._id.toString(),
        user.email,
      );

      const refreshToken = this.generaterefreshToken(
        user._id.toString(),
        user.email,
      );

      await this.repo.addRefreshToken(user._id.toString(), refreshToken);

      return {
        user: this.preventSensitiveInformation(user),
        accessToken,
        refreshToken,
      };
    } else {
      throw new ExpressError("Invalid Credentails", 401);
    }
  }

  async logout(userId: string) {
    if (!userId) {
      throw new ExpressError("Unauthorized", 401);
    }

    const user = await this.repo.update(userId, {
      refreshToken: [],
    });
    if(!user){
      throw new ExpressError("User not found", 404);
    }

    return;
  }

  async getLoggedInUser(userId?: string): Promise<SafeAuthUser | null> {
    if (!userId) {
      throw new ExpressError("Unauthorized", 401);
    }

    const user = await this.repo.findById(userId);

    if (!user) {
      throw new ExpressError("User not found", 404);
    }

    return this.preventSensitiveInformation(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    if (!refreshToken) {
      throw new ExpressError("Unauthorized", 401);
    }

    try {
      const payload = jwt.verify(
        refreshToken,
        this.refreshSecret,
      ) as RefreshTokenPayload;

      const userFound = await this.repo.findByRefreshToken(refreshToken);
      if (!userFound) {
        await this.repo.update(payload.id, {
          refreshToken: [],
        });

        throw new ExpressError("Unauthorized", 403);
      }

      const newrefreshTokenArray = userFound.refreshToken.filter(
        (rt) => rt !== refreshToken,
      );

      
      const newAccessToken = this.generateAccessToken(
        userFound._id.toString(),
        userFound.email,
      );
      const newrefreshToken = this.generaterefreshToken(
        userFound._id.toString(),
        userFound.email,
      );
  
      const user = await this.repo.update(payload.id, {
        refreshToken: [...newrefreshTokenArray, newrefreshToken],
      });

     
      if (!user) {
        throw new ExpressError("User not found", 404);
      }

      return {
        user: this.preventSensitiveInformation(user),
        accessToken: newAccessToken,
        refreshToken: newrefreshToken,
      };
    } catch (err) {


         if (err instanceof TokenExpiredError) {
            throw new ExpressError("Access token expired", 401);
          }
      
          if (err instanceof JsonWebTokenError) {
             throw  new ExpressError("Invalid access token", 401);
          }
      
       throw err;
    }
  }

  private preventSensitiveInformation(data: AuthUser): SafeAuthUser {
    if (!data) {
      throw new Error("No Data is provided for this methond");
    }

   
    const { password, refreshToken, ...safeData } = data;

    return safeData;
  }

  private generaterefreshToken(userId: string, email: string): string {
    if (!this.refreshSecret) {
      throw new Error("No Secret Provied for Refresh Token");
    }

    return jwt.sign(
      {
        id: userId,
        email,
      },
      this.refreshSecret,
      {
        expiresIn: this.refreshTokenExpiresIn,
      },
    );
  }
  private generateAccessToken(userId: string, email: string): string {
   
    if (!this.accessSecret) {
      throw new Error("No secret provied for access token");
    }

 
   
    return jwt.sign(
      {
        id: userId,
        email,
      },
      this.accessSecret,
      {
        expiresIn: this.accessExpiresIn,
      },
    );
  }
}
