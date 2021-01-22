import Sequelize from 'sequelize';
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksTopRatedQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksTopRatedQuery',
  description: 'Fetch list of decks by highest rating and total votes',
  fields: {
    getDecksTopRated: {
      type: new GraphQLList(GqlCardDeckModel),
      resolve: () => {
        return Conn.models.decks.findAll({
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
