import Conn from '@database';
import { DeckOverviewProps } from '@types';
import { GraphQLID, GraphQLObjectTypeConfig } from 'graphql/type';
import { GqlCardDeckModel, GqlDeckInputModal } from '../models';

export const createDeckMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'createDeck',
  description: 'Create a new deck with its associated cards',
  fields: {
    createDeck: {
      type: GqlCardDeckModel,
      args: {
        userId: {
          type: GraphQLID,
        },
        deckInput: {
          type: GqlDeckInputModal,
        },
      },
      resolve: async (
        _,
        { userId, deckInput }: { userId: string; deckInput: DeckOverviewProps },
      ) => {
        const user = await Conn.users.findOne({
          where: { _id: userId },
        });
        const cards = [...deckInput.cards];
        delete deckInput.cards;

        const deck = await Conn.decks.create({
          userId,
          ...deckInput,
          ...(user.locked && { reviewed: true }),
        });
        cards.map((card) => {
          void Conn.flipcards
            .create({
              deckId: deck._id,
            })
            .then((flip) => {
              void Conn.frontfaces.create({
                frontId: flip._id,
                ...card.front,
              });
              void Conn.backfaces.create({
                backId: flip._id,
                ...card.back,
              });
            });
        });
        return deck;
      },
    },
  },
};
