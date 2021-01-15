import { Sequelize } from 'sequelize';
import Conn from '@database';
import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { GqlCardDeckObject, GqlFlipCardObject } from '../objects';

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
          return Conn.models.flipcards.findAll({
            where: { deckId: args.deckId },
            order: Sequelize.literal('random()'),
          });
        },
      },
      getDecks: {
        type: new GraphQLList(GqlCardDeckObject),
        resolve() {
          return Conn.models.decks.findAll();
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
          return Conn.models.decks.findAll({
            where: { userId: args.userId },
          });
        },
      },
    };
  },
});
