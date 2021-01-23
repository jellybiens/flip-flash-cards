/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DatabaseError, Sequelize } from 'sequelize';
import path from 'path';
import * as dotenv from 'dotenv';
import {
  FrontFace as _FrontFace,
  BackFace as _BackFace,
  CardFaceModel,
} from './models/CardFace';
import { FlipCard as _FlipCard, FlipCardModel } from './models/FlipCard';
import { Deck as _Deck, DeckModel } from './models/Deck';
import { User as _User, UserModel } from './models/User';
import { UserScores as _UserScores, UserScoresModel } from './models/UserScores';
import { devMock } from './mocks/dev';

dotenv.config({ path: path.resolve('../../.env') });

const connection = (() => {
  switch (process.env.NODE_ENV) {
    case 'prod': {
      return process.env.PROD_DB_URL;
    }
    case 'dev':
    default: {
      return process.env.DEV_DB_URL;
    }
  }
})();

const Conn = new Sequelize(connection, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

const FrontFaces = Conn.define('frontface', _FrontFace) as CardFaceModel;
const BackFaces = Conn.define('backface', _BackFace) as CardFaceModel;
const FlipCards = Conn.define('flipcards', _FlipCard) as FlipCardModel;
const Decks = Conn.define('decks', _Deck) as DeckModel;
const Users = Conn.define('users', _User) as UserModel;
const UserScores = Conn.define('userscores', _UserScores) as UserScoresModel;

Users.hasMany(UserScores, { as: 'scores' });
UserScores.belongsTo(Users);
Decks.hasMany(UserScores);
UserScores.belongsTo(Decks);

Users.hasMany(Decks);
Decks.belongsTo(Users);

Decks.hasMany(FlipCards, { as: 'cards' });
FlipCards.belongsTo(Decks);

FlipCards.hasOne(FrontFaces, { as: 'front' });
FlipCards.hasOne(BackFaces, { as: 'back' });

FrontFaces.belongsTo(FlipCards, { as: 'front' });
BackFaces.belongsTo(FlipCards, { as: 'back' });

const flushDB: boolean = (() => {
  if (connection === 'prod') return false;
  if (process.env.FLUSH) return true;
  else return false;
})();

void Conn.sync({ force: flushDB })
  .then(() => {
    if (flushDB) void devMock();

    // tslint:disable-next-line:no-console
    console.log(`
    _______________________________
    ///////////////////////////////
    All Database updates finished
    ///////////////////////////////
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
  })
  .catch((e: DatabaseError) => {
    // tslint:disable-next-line:no-console
    console.log(`
    _______________________________
    ///////////////////////////////
    Database errored out
    ${e.message}
    ///////////////////////////////
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
  });

export default {
  frontfaces: FrontFaces,
  backfaces: BackFaces,
  flipcards: FlipCards,
  decks: Decks,
  users: Users,
  userscores: UserScores,
};
