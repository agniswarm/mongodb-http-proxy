import { Request, Response } from 'express';
import { UpdateOneOptions, UpdateQuery } from 'mongodb';
import { getMongoClient } from '..';

export const updateOneController = async (req: Request, res: Response) => {
  try {
    const client = getMongoClient();
    const result = await client
      .db(req.body?.database)
      .collection(req.body.collection)
      .updateOne(
        req.body.filter,
        req.body.update as UpdateQuery<any> | Partial<any>,
        req.body.options as UpdateOneOptions
      );
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send({ code: e.code, message: e.message });
  }
};
