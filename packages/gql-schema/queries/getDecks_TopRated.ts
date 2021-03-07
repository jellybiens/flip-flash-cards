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
        tags: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: (_, args) => {
        const getDecks = (where = {}) => {
          return Conn.decks.findAll({
            where: {
              ...(where && where),
              ...(args.language && { language: args.language }),
              approved: true,
            },
            include: [
              {
                model: Conn.tags,
                as: 'tags',
                attributes: ['_id', 'text'],
              },
            ],
            order: [
              ['score', 'DESC'],
              ['totalVotes', 'DESC'],
            ],
            group: ['_id'],
            having: {
              // TODO:  change these to only get the most votes of each rating group?
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
        };

        if ((args.tags as string[]).length) {
          return Conn.tags
            .findAll({
              attributes: ['deckId'],
              where: {
                text: {
                  [Sequelize.Op.in]: args.tags,
                },
              },
              group: ['deckId'],
            })
            .then((decks) => {
              return getDecks({
                _id: {
                  [Sequelize.Op.in]: decks.map((d) => d.deckId),
                },
              });
            });
        } else {
          return getDecks();
        }
      },
    },
  },
};
