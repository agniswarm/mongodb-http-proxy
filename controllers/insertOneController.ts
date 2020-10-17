import { Request, Response } from 'express';
import { CollectionInsertOneOptions } from 'mongodb';
import { getMongoClient } from '..';

export const insertOneController = async (req: Request, res: Response) => {
  try {
    const client = getMongoClient();
    const result = await client
      .db(req.body?.database)
      .collection(req.body.collection)
      .insertOne(
        req.body.insert,
        req.body.options as CollectionInsertOneOptions
      );
    res.status(201).send(result.ops[0]);
  } catch (e) {
    console.error(e);
    res.status(400).send({ code: e.code, message: e.message });
  }
};
