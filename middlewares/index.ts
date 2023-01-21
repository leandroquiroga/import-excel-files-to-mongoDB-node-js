import { NextFunction, Request, Response } from "express";
import { HandleError } from "../interfaces";


export const handleNotFound = (_req: Request, _res: Response, next: NextFunction): void => {
  const errorHandleNotFound: HandleError = {
    code: 400,
    message: 'Recurso no encontrado',
  };
  
  next(errorHandleNotFound);
};


export const errorServer = (error: HandleError, req: Request, res: Response, next: NextFunction) => {
  if (!error.code) {
    error.code = 500;
    error.message = 'Internal Server Error'
  };

  console.log(error);
  
  res.status(error.code).json({
    code: error.code,
    message: error.message
  });
};

