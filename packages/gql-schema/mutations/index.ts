import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql/type';
import { createUserMutation } from './createUser';
import { createDeckMutation } from './createDeck';

const MutationDef: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'RootMutation',
  description: 'Root for all mutations',
  fields: () => ({
    ...createUserMutation.fields,
    ...createDeckMutation.fields,
  }),
};

export const Mutation = new GraphQLObjectType(MutationDef);
