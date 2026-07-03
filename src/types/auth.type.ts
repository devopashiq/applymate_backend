import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface AuthUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  refreshToken:string[]
  role:string;
}


export type SafeAuthUser = Omit<AuthUser, "password"|"refreshToken">;


export interface AuthResponse {
  user: SafeAuthUser;
  accessToken: string;
  refreshToken: string;
}

//for creating user (in repo file)
export interface authCreatePlayload {
  name: string;
  email: string;
  password: string;
}


export interface RefreshTokenPayload extends JwtPayload {
  id: string;
  email:string
}

export interface refreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}
