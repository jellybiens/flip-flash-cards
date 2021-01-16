/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DatabaseError, Sequelize } from 'sequelize';
import path from 'path';
import * as dotenv from 'dotenv';
import { FrontFace as _FrontFace, BackFace as _BackFace } from './models/CardFace';
import { FlipCard as _FlipCard } from './models/FlipCard';
import { Deck as _Deck } from './models/Deck';
import { User as _User } from './models/User';
import { devMock } from './mocks/dev';

dotenv.config({ path: path.resolve('.env') });
// tslint:disable-next-line:no-console

// TODO: dev, test, prod
const Conn = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

export const FrontFace = Conn.define('frontface', _FrontFace);
export const BackFace = Conn.define('backface', _BackFace);
export const FlipCard = Conn.define('flipcards', _FlipCard);
export const Deck = Conn.define('decks', _Deck);
export const User = Conn.define('users', _User);

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
