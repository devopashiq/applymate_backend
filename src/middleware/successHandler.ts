import { Request, Response, NextFunction } from "express";


export const successHandler =(req :Request, res:Response, next:NextFunction):void => {
  res.success =<T> (data :T, message='') => {
    res.status(200).json({
      status: "success",
      data: data,
      message: message,
    });
  };

  next();
};
