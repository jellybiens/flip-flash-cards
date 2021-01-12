import express from 'express';
// import path from 'path';
import 'module-alias/register';

import cors from 'cors';

import { graphqlHTTP } from 'express-graphql';
import schema from '@gql-schema';

// config
const APP_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(
  '/graphql',
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  graphqlHTTP({
    schema,
    pretty: true,
    graphiql: true,
    // context: isAuth
  }),
);

// // the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname + '/client/public/'));

// // send the user to index html page inspite of the url
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname + '/client/public/', 'index.html'));
// });

app.listen(APP_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${APP_PORT}`);
});
