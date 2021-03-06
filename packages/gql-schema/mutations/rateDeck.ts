/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLID, GraphQLFloat } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const rateDeckMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'rateDeck',
  description: 'A rating from a user when they finish a deck',
  fields: {
    rateDeck: {
      type: GqlCardDeckModel,
      args: {
        userId: {
          type: GraphQLID,
        },
        deckId: {
          type: GraphQLID,
        },
        rating: {
          type: GraphQLFloat,
        },
      },
      resolve: (
        _,
        args: {
          userId: string;
          deckId: string;
          rating: number;
        },
      ) => {
        const { userId, deckId, rating } = args;
        void Conn.userratings.create({
          userId,
          deckId,
          rating,
        });
        return Conn.decks.findOne({ where: { _id: deckId } }).then((deck) => {
          if (deck) {
            const MIDNIGHT = new Date();
            MIDNIGHT.setHours(0, 0, 0, 0);
            const LAST_UPDATED = new Date(deck.updatedAt);

            const totalVotes = deck.totalVotes + 1;
            const currentScoreRating = deck.score * deck.totalVotes;
            const score = (currentScoreRating + rating) / totalVotes;
            const votesToday = LAST_UPDATED > MIDNIGHT ? deck.votesToday + 1 : 1;
            return deck.update({ score, totalVotes, votesToday }).then((deck) => deck);
          }
        });
      },
    },
  },
};
