import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLID, GraphQLList } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getUserDecksQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getUserDecksQuery',
  description: 'Fetch the decks of a specific user by _id',
  fields: {
    getUserDecks: {
      type: new GraphQLList(GqlCardDeckModel),
      args: {
        userId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) =>
        Conn.decks.findAll({
          where: { userId: args.userId },
        }),
    },
  },
};
