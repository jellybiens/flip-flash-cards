import { BackFace, Deck, FlipCard, FrontFace, User } from '..';
import Chance from 'chance';
const chance = Chance(42);

export const devMock = () => {
  const userId = '1087b574-6508-4efc-ab52-a0d980d5078c';
  const flipId = '4087b574-6508-4efc-ab52-a0d980d5078c';
  const deckId = '5087b574-6508-4efc-ab52-a0d980d5078c';
  const userProps = { _id: userId, played: 0 };

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

  for (let i = 0; i < 10; i++) {
    void User.create({
      played: chance.integer({ min: 0, max: 20 }),
    }).then((user) => {
      void Deck.create({
        userId: user._id,
        title: chance.word(),
        imgLink: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
        colour: chance.pickset(['red', 'orange', 'green', 'blue', 'purple'], 1)[0],
        subject: chance.pickset(
          ['Science', 'Trivia', 'Language', 'Sports', 'Moveis'],
          1,
        )[0],
        language: chance.pickset(['en', 'fr', 'es'], 1)[0],
        score: chance.floating({ fixed: 4, min: 0, max: 20 }),
        totalVotes: chance.integer({ min: 0, max: 20 }),
        votesToday: chance.integer({ min: 0, max: 6 }),
      }).then((deck) => {
        for (let j = 0; j < chance.integer({ min: 10, max: 20 }); j++) {
          void FlipCard.create({
            deckId: deck._id,
          }).then((flip) => {
            void FrontFace.create({
              frontId: flip._id,
              text: chance.word(),
              imgLink: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
              colour: chance.pickset(
                ['white', 'orange', 'green', 'blue', 'purple'],
                1,
              )[0],
            });
            void BackFace.create({
              backId: flip._id,
              text: chance.word(),
              imgLink: chance.avatar({ protocol: 'https', fileExtension: 'jpg' }),
              colour: chance.pickset(
                ['black', 'orange', 'green', 'blue', 'purple'],
                1,
              )[0],
            });
          });
        }
      });
    });
  }
};
