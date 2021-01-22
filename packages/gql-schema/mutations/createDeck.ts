import Conn from '@database';
import { DeckAttributes, FlipCardAttributes } from '@database/models';
import { DeckOverviewProps, FlipCardProps } from '@types';
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
      resolve: (
        _,
        { userId, deckInput }: { userId: string; deckInput: DeckOverviewProps },
      ) => {
        const cards = [...deckInput.cards];
        delete deckInput.cards;
        return Conn.models.decks
          .create({
            userId,
            ...deckInput,
          })
          .then((deck: DeckAttributes) => {
            cards.map((card) => {
              void Conn.models.flipcards
                .create({
                  deckId: deck._id,
                })
                .then((flip: FlipCardAttributes) => {
                  void Conn.models.frontface.create({
                    frontId: flip._id,
                    ...card.front,
                  });
                  void Conn.models.backface.create({
                    backId: flip._id,
                    ...card.back,
                  });
                });
            });
            return deck;
          });
      },
    },
  },
};
