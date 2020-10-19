import { Request, Response } from 'express';
import { UpdateManyOptions, UpdateQuery } from 'mongodb';
import { getMongoClient } from '..';

export const updateManyController = async (req: Request, res: Response) => {
  try {
    const client = getMongoClient();
    const result = await client
      .db(req.body?.database)
      .collection(req.body.collection)
      .updateMany(
        req.body.filter,
        req.body.update as UpdateQuery<any> | Partial<any>,
        req.body.options as UpdateManyOptions
      );
    client.db().collection('');
    res.status(200).send(result);
  } catch (e) {
    console.error(e);
    res.status(400).send({ code: e.code, message: e.message });
  }
};
