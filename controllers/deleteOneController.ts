import { Request, Response } from 'express';
import { CommonOptions } from 'mongodb';
import { getMongoClient } from '..';

export const deleteOneController = async (req: Request, res: Response) => {
  try {
    const client = getMongoClient();
    const result = await client
      .db(req.body?.database)
      .collection(req.body.collection)
      .deleteOne(
        req.body.filter,
        req.body.options as CommonOptions & {
          bypassDocumentValidation?: boolean;
        }
      );
    res
      .status(200)
      .send({ deleteCount: result.deletedCount, result: result.result });
  } catch (e) {
    console.error(e);
    res.status(400).send({ code: e.code, message: e.message });
  }
};
