import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLID } from 'graphql/type';
import { GqlUserModel } from '../models';

export const getUserQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getUserQuery',
  description: 'Fetch information of a specific user by _id',
  fields: {
    getUser: {
      type: GqlUserModel,
      args: {
        userId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) =>
        Conn.models.users.findOne({
          where: { _id: args.userId },
          include: [
            {
              model: Conn.models.userscores,
              attributes: ['deckId', 'level', 'score'],
              where: { userId: args.userId },
              as: 'scores',
            },
          ],
        }),
    },
  },
};
