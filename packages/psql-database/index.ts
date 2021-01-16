/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DatabaseError, Sequelize } from 'sequelize';
import path from 'path';
import * as dotenv from 'dotenv';
import { FrontFace as _FrontFace, BackFace as _BackFace } from './models/CardFace';
import { FlipCard as _FlipCard } from './models/FlipCard';
import { Deck as _Deck } from './models/Deck';
import { User as _User } from './models/User';

dotenv.config({ path: path.resolve('.env') });
// tslint:disable-next-line:no-console

const Conn = new Sequelize(process.env.DEV_DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: false,
  },
});

const userId = '1087b574-6508-4efc-ab52-a0d980d5078c';
const flipId = '4087b574-6508-4efc-ab52-a0d980d5078c';
const deckId = '5087b574-6508-4efc-ab52-a0d980d5078c';

const FrontFace = Conn.define('frontface', _FrontFace);
const BackFace = Conn.define('backface', _BackFace);
const FlipCard = Conn.define('flipcards', _FlipCard);
const Deck = Conn.define('decks', _Deck);
const User = Conn.define('users', _User);

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
    const userProps = { _id: userId, played: 0 };

    const frontProps = { frontId: flipId, text: 'card01.txt', imgLink: 'card01.img' };
    const backProps = { backId: flipId, text: 'card02.txt', imgLink: 'card02.img' };

    const flipProps = { _id: flipId, deckId };

    const deckProps = {
      _id: deckId,
      userId,
      title: 'Spongebob People',
      imgLink: 'https://image-cdn.hypb.st/', // https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2019%2F11%2Fspongebob-squarepants-spinoff-squidward-netflix-series-info-1-1.jpg
      colour: 'red',
      subject: 'spanish',
      score: 3,
      totalVotes: 0,
    };

    void User.create({
      ...userProps,
    }).then(() => {
      void Deck.create({
        ...deckProps,
      }).then(() => {
        void FlipCard.create({
          ...flipProps,
        }).then(() => {
          void FrontFace.create({
            ...frontProps,
          });
          void BackFace.create({
            ...backProps,
          });
        });
      });
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
    ${e.message}
    ///////////////////////////////
    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
  });

export default Conn;
