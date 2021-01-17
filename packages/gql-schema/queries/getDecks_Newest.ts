import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksNewestQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksNewestQuery',
  description: 'Fetch list of decks by most recent date created',
  fields: {
    getDecksNewest: {
      type: new GraphQLList(GqlCardDeckModel),
      resolve: () =>
        Conn.models.decks.findAll({
          order: '"createdAt" DESC',
        }),
    },
  },
};
