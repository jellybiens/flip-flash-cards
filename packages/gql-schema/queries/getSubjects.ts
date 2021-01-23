import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';

export const getSubjectsQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getSubjects',
  description: 'Fetch subjects to filter by',
  fields: {
    getSubjects: {
      args: {
        language: {
          type: GraphQLString,
        },
      },
      type: new GraphQLList(GraphQLString),
      resolve: (_, args) => {
        const where = {
          ...(args.language && { language: args.language }),
          approved: true,
        };
        return Conn.decks
          .findAll({
            where,
            attributes: ['subject'],
            group: ['subject'],
            order: ['subject'],
          })
          .then((decks) => {
            return decks.map(({ subject }) => {
              return subject
                .split(' ')
                .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                .join(' ');
            });
          });
      },
    },
  },
};
