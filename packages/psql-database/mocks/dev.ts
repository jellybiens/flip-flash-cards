import Conn from '..';
import { RandomPicture } from 'random-picture';
import Chance from 'chance';
const chance = Chance(42);

const colours = [
  'white',
  'black',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'cyan',
  'violet',
  'turquoise',
  'purple',
];

export const devMock = () => {
  const userId = '1087b574-6508-4efc-ab52-a0d980d5078c';
  const flipId = '4087b574-6508-4efc-ab52-a0d980d5078c';
  const deckId = '5087b574-6508-4efc-ab52-a0d980d5078c';
  const userProps = {
    _id: userId,
  };
  const userScoresProps = {
    userId,
    deckId,
    level: 'easy',
    score: 87,
  };

  const frontProps = { frontId: flipId, text: 'card01.txt', imgLink: 'card01.img' };
  const backProps = { backId: flipId, text: 'card02.txt', imgLink: 'card02.img' };

  const flipProps = { _id: flipId, deckId };

  const deckProps = {
    _id: deckId,
    userId,
    title: 'Spongebob People',
    imgLink:
      'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2019%2F11%2Fspongebob-squarepants-spinoff-squidward-netflix-series-info-1-1.jpg',
    colour: 'red',
    subject: 'spanish',
    score: 3,
    totalVotes: 0,
    approved: true,
  };

  void Conn.users
    .create({
      ...userProps,
    })
    .then(() => {
      void Conn.decks
        .create({
          ...deckProps,
        })
        .then(() => {
          void Conn.userscores.create({
            ...userScoresProps,
          });

          void Conn.flipcards
            .create({
              ...flipProps,
            })
            .then(() => {
              void Conn.frontfaces.create({
                ...frontProps,
              });
              void Conn.backfaces.create({
                ...backProps,
              });
            });
        });
    });

  for (let i = 0; i < 100; i++) {
    void Conn.users.create().then(async (user) => {
      const randomPictureUrl = await RandomPicture();

      void Conn.decks
        .create({
          userId: user._id,
          title: chance.word(),
          subtitle: chance.sentence(),
          imgLink: randomPictureUrl.url,
          colour: chance.pickset(colours, 1)[0],
          subject: chance.pickset(
            ['Science', 'Trivia', 'Language', 'Sports', 'Moveis'],
            1,
          )[0],
          language: chance.pickset(['en', 'en', 'en', 'fr', 'es'], 1)[0],
          score: chance.floating({ fixed: 4, min: 0, max: 5 }),
          totalVotes: chance.integer({ min: 0, max: 20 }),
          votesToday: chance.integer({ min: 0, max: 6 }),
          approved: true,
        })
        .then((deck) => {
          void Conn.userscores.create({
            userId: user._id,
            deckId: deck._id,
            level: chance.pickset(['easy', 'medium', 'hard'], 1)[0],
            score: chance.integer({ min: 0, max: 100 }),
          });

          for (let j = 0; j < chance.integer({ min: 10, max: 20 }); j++) {
            void Conn.flipcards
              .create({
                deckId: deck._id,
              })
              .then((flip) => {
                void Conn.frontfaces.create({
                  frontId: flip._id,
                  text: chance.word(),
                  imgLink: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                  colour: chance.pickset(colours, 1)[0],
                });
                void Conn.backfaces.create({
                  backId: flip._id,
                  text: chance.word(),
                  imgLink: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
                  colour: chance.pickset(colours, 1)[0],
                });
              });
          }
        });
    });
  }
};
