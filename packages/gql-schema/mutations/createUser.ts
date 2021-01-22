import Conn from '@database';
import { GraphQLObjectTypeConfig } from 'graphql/type';
import { GqlUserModel } from '../models';

export const createUserMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'createUser',
  description: 'New user has arrive, give them an _id',
  fields: {
    createUser: {
      type: GqlUserModel,
      resolve: () => Conn.models.users.create(),
    },
  },
};
