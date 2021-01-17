import * as Sequelize from 'sequelize';
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksTrendingQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksTrendingQuery',
  description: 'Fetch list of decks by trending status, most votes in last 24 hours',
  fields: {
    getDecksTrending: {
      type: new GraphQLList(GqlCardDeckModel),
      resolve: () => {
        const DATE_START = new Date(new Date().getTime() - 60 * 60 * 24 * 1000);
        const NOW = new Date();

        return Conn.models.decks.findAll({
          where: {
            votesToday: { $gte: 'avgVotes' },
            updatedAt: {
              $gte: DATE_START,
              $lte: NOW,
            },
          },
          attributes: [[Sequelize.fn('AVG', Sequelize.col('votesToday')), 'avgVotes']],
          order: '"votesToday" DESC, "score" DESC, "totalVotes" DESC',
        });
      },
    },
  },
};
