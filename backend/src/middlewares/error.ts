import { NextFunction, Request, Response } from 'express';

export const errorLogger = (error: any, _req: Request, _res: Response, next: NextFunction) => {
    console.error(error);
    next(error);
  };
  
  export const errorResponder = (error: any, _req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({ message: error.message });
  };