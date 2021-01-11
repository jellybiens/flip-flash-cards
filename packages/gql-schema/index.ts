import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { GraphQLSchema } from 'graphql';
import { Query } from './queries';
import { CardFace as _CardFace } from './sequalize/objects/CardFace';
import { FlipCard as _FlipCard } from './sequalize/objects/FlipCard';
import { Deck as _Deck } from './sequalize/objects/Deck';
import { User as _User } from './sequalize/objects/User';

dotenv.config({ path: __dirname + '/.env' });

// TODO: sort out undefined
// tslint:disable-next-line:no-console
console.log('process.env.DB_CON', process.env.DB_CON);

export const Conn = new Sequelize(process.env.DB_CON, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

const CardFace = Conn.define('cardFaces', _CardFace);
const FlipCard = Conn.define('flipCards', _FlipCard);
const Deck = Conn.define('decks', _Deck);
const User = Conn.define('users', _User);

Deck.hasMany(FlipCard, { foreignKey: 'deckId' });
User.hasMany(Deck, { foreignKey: 'userId' });

void Conn.sync({ force: true })
  .then(() => {
    void User.create({
      _id: 'jellybiens',
    });

    void CardFace.create({
      _id: 'card01',
      text: 'card01.txt',
      imgLink: 'card01.img',
    });
    void CardFace.create({
      _id: 'card02',
      text: 'card02.txt',
      imgLink: 'card02.img',
    });

    void FlipCard.create({
      cardId: 'flip01',
      frontId: 'card01',
      backId: 'card02',
      deckId: 'deck01',
    });
    // tslint:disable-next-line:no-console
    console.log('All Database updates Finished');
  })
  .catch(() => {
    // tslint:disable-next-line:no-console
    console.log('Database errored out');
  });

const Schema = new GraphQLSchema({
  query: Query,
});

export const { models } = Conn;

export default Schema;
