import Conn from '@database';
import { GraphQLBoolean, GraphQLID, GraphQLObjectTypeConfig } from 'graphql/type';

export const deleteDeckMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'deleteDeck',
  description: 'Delete a deck and its associated cards by _id',
  fields: {
    deleteDeck: {
      type: GraphQLBoolean,
      args: {
        deckId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) => {
        try {
          return Conn.flipcards // get cards associated to deck
            .findAll({
              where: { deckId: args.deckId },
            })
            .then((cards) => {
              cards.map((card) => {
                // destroy each card's faces
                void Conn.frontfaces
                  .destroy({
                    where: { frontId: card._id },
                  })
                  .then(() => {
                    void Conn.backfaces.destroy({
                      where: { backId: card._id },
                    });
                  });
              });
            })
            .then(() => {
              // destroy all of the cards in the deck
              return Conn.flipcards
                .destroy({
                  where: { deckId: args.deckId },
                })
                .then(() => {
                  // destroy the deck
                  return Conn.decks
                    .destroy({
                      where: { _id: args.deckId },
                    })
                    .then(() => true);
                });
            });
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.log(`
                _______________________________
                ///////////////////////////////
                error ${
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  e
                }
                ///////////////////////////////
                ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯`);
        }
      },
    },
  },
};
