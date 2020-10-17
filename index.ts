import { app } from './express';
import { connect, MongoClient } from 'mongodb';

const port = process.env.PORT || 3330;

let mongoClient: MongoClient;

connect(process.env.MONGO_URL!, {
  poolSize: 50,
  maxPoolSize: 100,
  minSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client: MongoClient) => {
    mongoClient = client;
    app.listen(port, () =>
      console.log(`listening on http://localhost:${port}`)
    );
  })
  .catch((e) => {
    console.error(e);
    console.log('Could not connect to Database');
  });

export function getMongoClient() {
  return mongoClient;
}
