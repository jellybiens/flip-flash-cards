import Conn from '@database';
import { GraphQLBoolean, GraphQLID, GraphQLObjectTypeConfig } from 'graphql/type';

export const deleteFlipCardMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'deleteFlipCard',
  description: 'Delete a card from a deck and its associated faces by _id',
  fields: {
    deleteFlipCard: {
      type: GraphQLBoolean,
      args: {
        cardId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) => {
        try {
          return Conn.frontfaces
            .destroy({
              where: { frontId: args.cardId },
            })
            .then(() => {
              void Conn.backfaces.destroy({
                where: { backId: args.cardId },
              });
            })
            .then(() => {
              return Conn.flipcards
                .destroy({
                  where: { _id: args.cardId },
                })
                .then(() => true);
            });
        } catch (_) {
          return false;
        }
      },
    },
  },
};
