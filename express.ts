import { json, urlencoded } from 'body-parser';
import express from 'express';
import { insertManyController } from './controllers/insertManyController';
import { insertOneController } from './controllers/insertOneController';
import { insertManyMiddleware } from './middlewares/insertManyMiddleware';
import { insertOneMiddleware } from './middlewares/insertOneMiddleware';

export const app = express();

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));

// parse application/json
app.use(json());

app.post('/insertOne', insertOneMiddleware, insertOneController);
app.post('/insertMany', insertManyMiddleware, insertManyController);
