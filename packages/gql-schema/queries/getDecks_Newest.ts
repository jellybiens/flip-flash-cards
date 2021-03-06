import Conn from '@database';
import Sequelize from 'sequelize';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

export const getDecksNewestQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getDecksNewestQuery',
  description: 'Fetch list of decks by most recent date created',
  fields: {
    getDecksNewest: {
      args: {
        language: {
          type: GraphQLString,
        },
        tags: {
          type: new GraphQLList(GraphQLString),
        },
      },
      type: new GraphQLList(GqlCardDeckModel),
      resolve: (_, args) => {
        const getDecks = (where = {}) => {
          return Conn.decks.findAll({
            where: {
              ...(where && where),
              ...(args.language && { language: args.language }),
              approved: true,
            },
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Conn.tags,
                as: 'tags',
                attributes: ['_id', 'text'],
              },
            ],
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
