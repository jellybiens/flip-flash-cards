import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLID, GraphQLBoolean } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const approveDeckMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'approveDeck',
  description: 'Approve a newly created deck by _id',
  fields: {
    approveDeck: {
      type: GqlCardDeckModel,
      args: {
        deckId: {
          type: GraphQLID,
        },
        approved: {
          type: GraphQLBoolean,
        },
      },
      resolve: (_, args) =>
        Conn.decks.findOne({ where: { _id: args.deckId } }).then((deck) => {
          if (deck) {
            return deck.update({ approved: args.approved, reviewed: true });
          }
        }),
    },
  },
};
