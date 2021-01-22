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

dotenv.config({ path: path.resolve('.env') });

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

export const FrontFace = Conn.define('frontface', _FrontFace) as CardFaceModel;
export const BackFace = Conn.define('backface', _BackFace) as CardFaceModel;
export const FlipCard = Conn.define('flipcards', _FlipCard) as FlipCardModel;
export const Deck = Conn.define('decks', _Deck) as DeckModel;
export const User = Conn.define('users', _User) as UserModel;
export const UserScores = Conn.define('userscores', _UserScores) as UserScoresModel;

User.hasMany(UserScores, { as: 'scores' });
UserScores.belongsTo(User);
Deck.hasMany(UserScores);
UserScores.belongsTo(Deck);

User.hasMany(Deck);
Deck.belongsTo(User);

Deck.hasMany(FlipCard, { as: 'cards' });
FlipCard.belongsTo(Deck);

FlipCard.hasOne(FrontFace, { as: 'front' });
FlipCard.hasOne(BackFace, { as: 'back' });

FrontFace.belongsTo(FlipCard, { as: 'front' });
BackFace.belongsTo(FlipCard, { as: 'back' });

void Conn.sync({ force: true })
  .then(() => {
    void devMock();

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

export default Conn;
