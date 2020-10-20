import { json, urlencoded } from 'body-parser';
import express from 'express';
import { aggregateController } from './controllers/aggregateController';
import { deleteManyController } from './controllers/deleteManyController';
import { deleteOneController } from './controllers/deleteOneController';
import { insertManyController } from './controllers/insertManyController';
import { insertOneController } from './controllers/insertOneController';
import { aggregateMiddleware } from './middlewares/aggregateMiddleware';
import { deleteManyMiddleware } from './middlewares/deleteManyMiddleware';
import { deleteOneMiddleware } from './middlewares/deleteOneMiddlware';
import { insertManyMiddleware } from './middlewares/insertManyMiddleware';
import { insertOneMiddleware } from './middlewares/insertOneMiddleware';
import { validateRequest } from './middlewares/validateRequest';

export const app = express();

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));

// parse application/json
app.use(json());
app.use(validateRequest);

app.post('/insertOne', insertOneMiddleware, insertOneController);
app.post('/insertMany', insertManyMiddleware, insertManyController);
app.post('/aggregate', aggregateMiddleware, aggregateController);
app.post('/deleteOne', deleteOneMiddleware, deleteOneController);
app.post('/deleteMany', deleteManyMiddleware, deleteManyController);
