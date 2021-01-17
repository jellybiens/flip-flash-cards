import * as Sequelize from 'sequelize';
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLID, GraphQLList } from 'graphql/type';
import { GqlFlipCardModel } from '../models';

export const getDeckCardsQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDeckCardsQuery',
  description: 'Fetch the cards of a specific deck by _id',
  fields: {
    getDeckCards: {
      type: new GraphQLList(GqlFlipCardModel),
      args: {
        deckId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) =>
        Conn.models.flipcards.findAll({
          where: { deckId: args.deckId },
          include: [
            { model: Conn.models.frontface, as: 'front' },
            { model: Conn.models.backface, as: 'back' },
          ],
          order: Sequelize.literal('random()'),
        }),
    },
  },
};
