import { NextFunction, Request, Response } from 'express';

export const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-proxy-server-key'];
  if (token === process.env.TOKEN!) {
    return next();
  }
  return res.status(401).send();
};
