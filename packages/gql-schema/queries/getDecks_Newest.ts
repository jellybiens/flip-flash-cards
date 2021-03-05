import Conn from '@database';
import Sequelize from 'sequelize';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';
import { GqlCardDeckModel } from '../models';

const literal = (subQuery: string): string => Sequelize.literal(subQuery).val as string;

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
        const where = {
          ...(args.language && { language: args.language }),
          ...(args.tags && {
            '$tags.text$': {
              [Sequelize.Op.in]: args.tags,
            },
          }),
          approved: true,
        };

        return Conn.decks
          .findAll({
            attributes: [
              'decks.*',
              [Sequelize.literal(`STRING_AGG(tags.text, ',')`), 'tags'],
            ],
            where,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Conn.tags,
                as: 'tags',
                attributes: [],
              },
            ],

            group: ['decks._id'],
            raw: true,
          })
          .then((data) => {
            console.log(data);
            return data;
          });
      },
    },
  },
};

// `SELECT "decks"."_id", "decks"."title", STRING_AGG(tags.text, ',') AS tagtext
// FROM "decks" AS "decks"
//  LEFT OUTER JOIN "tags" AS "tags" ON "decks"."_id" = "tags"."deckId"
//  GROUP BY "decks"._id;`;
