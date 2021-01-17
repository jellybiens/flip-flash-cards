import Sequelize from 'sequelize';
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList } from 'graphql/type';
import { GqlFlipCardModel } from '../models';

export const getAllCardsQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getAllCardsQuery',
  description: 'Fetch all cards in database',
  fields: {
    getAllCards: {
      type: new GraphQLList(GqlFlipCardModel),
      resolve: () =>
        Conn.models.flipcards.findAll({
          include: [
            { model: Conn.models.frontface, as: 'front' },
            { model: Conn.models.backface, as: 'back' },
          ],
          order: Sequelize.literal('random()'),
        }),
    },
  },
};
