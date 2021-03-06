/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Conn from '@database';
import { UserScore } from '@types';
import { GraphQLObjectTypeConfig, GraphQLID, GraphQLFloat } from 'graphql/type';
import { GqlUserModel } from '../models';

export const setUserScoreMutation: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'setUserScore',
  description: `A user's score when they have finished a deck`,
  fields: {
    setUserScore: {
      type: GqlUserModel,
      args: {
        userId: {
          type: GraphQLID,
        },
        deckId: {
          type: GraphQLID,
        },
        score: {
          type: GraphQLFloat,
        },
      },
      resolve: (
        _,
        args: {
          userId: string;
        } & UserScore,
      ) => {
        const { userId, deckId, score, level } = args;
        return Conn.userscores
          .create({
            userId,
            deckId,
            score,
            level,
          })
          .then(() =>
            Conn.users.findOne({
              where: { _id: args.userId },
              include: [
                {
                  model: Conn.userscores,
                  attributes: ['deckId', 'level', 'score'],
                  where: { userId: args.userId },
                  as: 'scores',
                },
                {
                  model: Conn.userratings,
                  attributes: ['deckId', 'rating'],
                  where: { userId: args.userId },
                  as: 'ratings',
                },
              ],
            }),
          );
      },
    },
  },
};
