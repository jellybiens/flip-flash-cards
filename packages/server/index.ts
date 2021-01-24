import 'module-alias/register';
import path from 'path';
import * as dotenv from 'dotenv';
import cors from 'cors';
import express, { Application } from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from '@gql-schema';
import '@database';

// config
dotenv.config({ path: path.resolve('.env') });
const APP_PORT = process.env.PORT || 5000;

const app: Application = express();

app.use(cors());

app.use(
  '/graphql',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
  }),
);

app.listen(APP_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`
    _______________________________
    ///////////////////////////////
    App listening on port ${APP_PORT}
    ///////////////////////////////
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
});

// the __dirname is the current directory from where the script is running
app.use(express.static(path.resolve('../client')));

// send the user to index html page inspite of the url
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname + '../client', 'index.html'));

  // tslint:disable-next-line:no-console
  console.log(`
    _______________________________
    ///////////////////////////////
    Client ready
    ///////////////////////////////
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
});
