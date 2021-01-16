import { Sequelize } from 'sequelize';
import Conn from '@database';
import { GraphQLObjectType, GraphQLID, GraphQLList } from 'graphql';
import { GqlCardDeckModel, GqlFlipCardModel } from '../models';

export const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      getCards: {
        type: new GraphQLList(GqlFlipCardModel),
        args: {
          deckId: {
            type: GraphQLID,
          },
        },
        resolve(_, args) {
          return Conn.models.flipcards.findAll({
            where: { deckId: args.deckId },
            include: [
              { model: Conn.models.frontface, as: 'front' },
              { model: Conn.models.backface, as: 'back' },
            ],

            order: Sequelize.literal('random()'),
          });
        },
      },
      getDecks: {
        type: new GraphQLList(GqlCardDeckModel),
        resolve() {
          return Conn.models.decks.findAll({
            include: {
              model: Conn.models.flipcards,
              as: 'cards',
              include: [
                { model: Conn.models.frontface, as: 'front' },
                { model: Conn.models.backface, as: 'back' },
              ],
            },
          });
        },
      },
      getUserDecks: {
        type: new GraphQLList(GqlCardDeckModel),
        args: {
          userId: {
            type: GraphQLID,
          },
        },
        resolve(_, args) {
          return Conn.models.decks.findAll({
            where: { userId: args.userId },
            include: {
              model: Conn.models.flipcards,
              as: 'cards',
              include: [
                { model: Conn.models.frontface, as: 'front' },
                { model: Conn.models.backface, as: 'back' },
              ],
            },
          });
        },
      },
    };
  },
});
