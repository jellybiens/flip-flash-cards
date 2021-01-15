import { GraphQLSchema } from 'graphql';
import { Query } from './queries';

const Schema = new GraphQLSchema({
  query: Query,
});

export default Schema;
