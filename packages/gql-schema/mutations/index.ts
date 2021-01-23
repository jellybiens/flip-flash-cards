import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql/type';
import { createUserMutation } from './createUser';
import { createDeckMutation } from './createDeck';
import { approveDeckMutation } from './approveDeck';
import { lockUserMutation } from './lockUser';
import { deleteDeckMutation } from './deleteDeck';
import { deleteFlipCardMutation } from './deleteFlipCard';

const MutationDef: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'RootMutation',
  description: 'Root for all mutations',
  fields: () => ({
    ...createUserMutation.fields,
    ...createDeckMutation.fields,
    ...approveDeckMutation.fields,
    ...lockUserMutation.fields,
    ...deleteDeckMutation.fields,
    ...deleteFlipCardMutation.fields,
  }),
};

export const Mutation = new GraphQLObjectType(MutationDef);
