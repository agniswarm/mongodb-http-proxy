import { NextFunction, Request, Response } from 'express';
import { array, object, string } from 'joi';

export const aggregateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const insertOneSchema = object({
      collection: string().required(),
      pipeline: array().required(),
      database: string().optional(),
      options: object().optional(),
    }).required();

    req.body = await insertOneSchema.validateAsync(req.body);
    next();
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
