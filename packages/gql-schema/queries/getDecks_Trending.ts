import Sequelize from 'sequelize';
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
        const YESTERDAY = new Date(new Date().getTime() - 60 * 60 * 24 * 1000);

        return Conn.models.decks.findAll({
          where: {
            updatedAt: {
              [Sequelize.Op.gt]: new Date(YESTERDAY),
            },
          },
          order: [
            ['votesToday', 'DESC'],
            ['score', 'DESC'],
            ['totalVotes', 'DESC'],
          ],
          group: ['_id'],
          having: {
            votesToday: {
              [Sequelize.Op.gt]: Sequelize.literal(`(
                    SELECT AVG("votesToday")
                    FROM decks
                )`),
            },
          },
        });
      },
    },
  },
};
