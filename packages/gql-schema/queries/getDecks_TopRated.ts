import * as Sequelize from 'sequelize';
import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksTopRatedQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksTopRatedQuery',
  description: 'Fetch list of decks by highest rating and total votes',
  fields: {
    getDecksTopRated: {
      type: new GraphQLList(GqlCardDeckModel),
      resolve: () =>
        Conn.models.decks.findAll({
          where: { totalVotes: { $gte: 'avgVotesHalf' } },
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('totalVotes')), 'avgVotes'],
            [Sequelize.literal('avgVotes / 2'), 'avgVotesHalf'],
          ],
          order: '"score" DESC, "totalVotes" DESC',
        }),
    },
  },
};
