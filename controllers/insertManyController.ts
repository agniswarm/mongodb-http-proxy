import { Request, Response } from 'express';
import { CollectionInsertManyOptions } from 'mongodb';
import { getMongoClient } from '..';

export const insertManyController = async (req: Request, res: Response) => {
  try {
    const client = getMongoClient();
    const result = await client
      .db(req.body?.database)
      .collection(req.body.collection)
      .insertMany(
        req.body.insert,
        req.body.options as CollectionInsertManyOptions
      );
    res.status(201).send(result.ops);
  } catch (e) {
    console.error(e);
    res.status(400).send({ code: e.code, message: e.message });
  }
};
