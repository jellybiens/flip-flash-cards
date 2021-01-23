import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql/type';
import { createUserMutation } from './createUser';
import { createDeckMutation } from './createDeck';
import { approveDeckMutation } from './approveDeck';
import { lockUserMutation } from './lockUser';
import { deleteDeckMutation } from './deleteDeck';

const MutationDef: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'RootMutation',
  description: 'Root for all mutations',
  fields: () => ({
    ...createUserMutation.fields,
    ...createDeckMutation.fields,
    ...approveDeckMutation.fields,
    ...lockUserMutation.fields,
    ...deleteDeckMutation.fields,
  }),
};

export const Mutation = new GraphQLObjectType(MutationDef);
