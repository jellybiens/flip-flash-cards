import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';

export const getTagsQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getTags',
  description: 'Fetch tags to filter by',
  fields: {
    getSubjects: {
      type: new GraphQLList(GraphQLString),
      resolve: () => {
        return Conn.tags.findAll({
          attributes: ['text'],
          group: ['text'],
          order: ['text'],
        });
      },
    },
  },
};
