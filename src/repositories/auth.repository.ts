import UserModel, { UserDocument } from "../models/users.model";
import { authCreatePlayload, AuthUser } from "../types/auth.type";
import {  QueryFilter } from "mongoose";
export class AuthRepository {
  async create(data: authCreatePlayload): Promise<AuthUser> {
     const user = await UserModel.create(data);
     return user.toObject();
  }

  async update(
    id: string,
    updatedData: Partial<AuthUser>,
  ): Promise<AuthUser | null> {
    return UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      updatedData,
      {
        new:true
      }
    ).lean().exec();
  }

  async delete(id: string): Promise<AuthUser | null> {
    return UserModel.findOneAndDelete({
      _id: id,
    }).exec();
  }

  async findById(id: string): Promise<AuthUser | null> {
    return UserModel.findOne({ _id: id }).lean().exec();
  }

  async find(options: QueryFilter<AuthUser>): Promise<AuthUser[] | null> {
    return UserModel.find(options).exec();
  }


  async findByEmail(email:string):Promise<AuthUser |null>{
    return  UserModel.findOne({email}).lean().exec()
  }


  async addRefreshToken(userId:string,token:string):Promise<AuthUser |null>{
    return UserModel.findByIdAndUpdate({
      _id:userId
    },{$push:{refreshToken:token}}).exec()
  }
  
  async findByRefreshToken(token:string):Promise<AuthUser |null>{

   return UserModel.findOne({
    refreshToken:token
   }).exec()
  }
}
