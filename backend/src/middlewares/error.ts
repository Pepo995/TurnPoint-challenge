import { NextFunction, Request, Response } from 'express';

export const errorLogger = (error: any, _req: Request, _res: Response, next: NextFunction) => {
  console.error(error);
  next(error);
};

export const errorResponder = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.statusCode || 500;
  res.status(status).send({ message: error.message || 'Internal Server Error' });
};

export const failSafeHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).send({ message: 'Something went wrong' });
};
