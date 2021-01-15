/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DatabaseError, Sequelize } from 'sequelize';
import path from 'path';
import * as dotenv from 'dotenv';
import { CardFace as _CardFace } from './models/CardFace';
import { FlipCard as _FlipCard } from './models/FlipCard';
import { Deck as _Deck } from './models/Deck';
import { User as _User } from './models/User';
import { uuidv4 } from './helpers';

dotenv.config({ path: path.resolve('.env') });
// tslint:disable-next-line:no-console

const Conn = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

const CardFace = Conn.define('cardfaces', _CardFace);
const FlipCard = Conn.define('flipcards', _FlipCard);
const Deck = Conn.define('decks', _Deck);
const User = Conn.define('users', _User);

Deck.hasMany(FlipCard);
User.hasMany(Deck);

const user01Id = '1087b574-6508-4efc-ab52-a0d980d5078c';
const face01id = '2087b574-6508-4efc-ab52-a0d980d5078c';
const face02id = '3087b574-6508-4efc-ab52-a0d980d5078c';
const card01id = '4087b574-6508-4efc-ab52-a0d980d5078c';
const deck01id = '5087b574-6508-4efc-ab52-a0d980d5078c';

void Conn.sync({ force: true })
  .then(() => {
    void CardFace.create({
      _id: face01id,
      text: 'card01.txt',
      imgLink: 'card01.img',
    });
    void CardFace.create({
      _id: face02id,
      text: 'card02.txt',
      imgLink: 'card02.img',
    });

    void FlipCard.create({
      cardId: face02id,
      frontId: face01id,
      backId: card01id,
    });

    void Deck.create({
      _id: deck01id,
      title: 'Spongebob People',
      imgLink:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2019%2F11%2Fspongebob-squarepants-spinoff-squidward-netflix-series-info-1-1.jpg',
      colour: 'red',
      subject: 'spanish',
      score: 3,
      totalVotes: 0,
    });

    void User.create({
      _id: user01Id,
      played: 0,
    });

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

    ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      e.stack
    }

    ${
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      e.sql
    }
    ///////////////////////////////
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
  });

export default Conn;
