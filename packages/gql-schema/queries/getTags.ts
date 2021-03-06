import Conn from '@database';
import { GraphQLObjectTypeConfig, GraphQLList, GraphQLString } from 'graphql/type';

export const getTagsQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getTags',
  description: 'Fetch tags to filter by',
  fields: {
    getTags: {
      type: new GraphQLList(GraphQLString),
      resolve: () => {
        return Conn.tags
          .findAll({
            attributes: ['text'],
            group: ['text'],
            order: ['text'],
            raw: true,
          })
          .then((res) => {
            console.log(res);
            return res.map(({ text }) => text);
          });
      },
    },
  },
};
