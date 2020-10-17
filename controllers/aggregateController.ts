import { Request, Response } from 'express';
import {
  CollectionAggregationOptions,
  CollectionInsertManyOptions,
  Db,
} from 'mongodb';
import { getMongoClient } from '..';

export const aggregateController = async (req: Request, res: Response) => {
  try {
    const client = getMongoClient();
    const result = await client
      .db(req.body?.database)
      .collection(req.body.collection)
      .aggregate(
        req.body.pipeline,
        req.body.options as CollectionAggregationOptions
      )
      .toArray();

    res.status(201).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send({ code: e.code, message: e.message });
  }
};
