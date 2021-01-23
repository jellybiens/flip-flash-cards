import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLID } from 'graphql/type';
import { GqlUserModel } from '../models';

export const lockUserMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'lockUser',
  description: 'Lock user by _id, for if they are an ass',
  fields: {
    lockUser: {
      type: GqlUserModel,
      args: {
        userId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) =>
        Conn.users.findOne({ where: { _id: args.userId } }).then((user) => {
          if (user) {
            return user.update({ locked: true });
          }
        }),
    },
  },
};
