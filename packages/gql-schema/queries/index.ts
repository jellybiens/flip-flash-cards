import { Sequelize } from 'sequelize';
import { models } from '..';
import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { GqlCardDeckObject, GqlFlipCardObject } from '../objects';

// const { models } = Conn;

export const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      getCards: {
        type: new GraphQLList(GqlFlipCardObject),
        args: {
          deckId: {
            type: GraphQLID,
          },
        },
        resolve(_, args) {
          return models.flipCards.findAll({
            where: { deckId: args.deckId },
            order: Sequelize.literal('random()'),
          });
        },
      },
      getDecks: {
        type: new GraphQLList(GqlCardDeckObject),
        resolve() {
          return models.decks.findAll();
        },
      },
      getUserDecks: {
        type: new GraphQLList(GqlCardDeckObject),
        args: {
          userId: {
            type: GraphQLID,
          },
        },
        resolve(_, args) {
          return models.decks.findAll({
            where: { userId: args.userId },
          });
        },
      },
    };
  },
});
