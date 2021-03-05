import Sequelize from 'sequelize';
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksTopRatedQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksTopRatedQuery',
  description: 'Fetch list of decks by highest rating and total votes',
  fields: {
    getDecksTopRated: {
      type: new GraphQLList(GqlCardDeckModel),
      args: {
        language: {
          type: GraphQLString,
        },
        subject: {
          type: GraphQLString,
        },
      },
      resolve: (_, args) => {
        const where = {
          ...(args.language && { language: args.language }),
          // ...(args.subject && { subject: args.subject }),
          approved: true,
        };

        return Conn.decks.findAll({
          where,
          order: [
            ['score', 'DESC'],
            ['totalVotes', 'DESC'],
          ],
          group: ['_id'],
          having: {
            totalVotes: {
              [Sequelize.Op.gt]: Sequelize.literal(`(
                    SELECT AVG("totalVotes")
                    FROM decks
                )`),
            },
            score: {
              [Sequelize.Op.gt]: Sequelize.literal(`(
                    SELECT AVG("score")
                    FROM decks
                )`),
            },
          },
        });
      },
    },
  },
};
