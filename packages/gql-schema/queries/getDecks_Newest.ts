import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksNewestQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksNewestQuery',
  description: 'Fetch list of decks by most recent date created',
  fields: {
    getDecksNewest: {
      args: {
        language: {
          type: GraphQLString,
        },
        subject: {
          type: GraphQLString,
        },
      },
      type: new GraphQLList(GqlCardDeckModel),
      resolve: (_, args) => {
        const where = {
          ...(args.language && { language: args.language }),
          ...(args.subject && { subject: args.subject }),
          approved: true,
        };

        return Conn.decks.findAll({
          where,
          order: [['createdAt', 'DESC']],
        });
      },
    },
  },
};
