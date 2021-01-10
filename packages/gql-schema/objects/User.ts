import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { User } from '@types';

export const GqlUserObject = new GraphQLObjectType({
  name: 'User',
  description: 'This is a user that has visited the site',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (user: User) => user._id,
      },
      decks: {
        type: new GraphQLList(GraphQLString),
        resolve: (user: User) => user.decks,
      },
      played: {
        type: GqlPlayedDecksObject,
        resolve: (user: User) => user.played,
      },
    };
  },
});

const GqlPlayedDecksObject = new GraphQLObjectType({
  name: 'UserScores',
  description: 'Scores for decks that the user has played',
  fields: () => {
    return {
      easy: {
        type: GraphQLString,
        resolve: (played: User['played']) => played.easy,
      },
      medium: {
        type: GraphQLString,
        resolve: (played: User['played']) => played.medium,
      },
      hard: {
        type: GraphQLString,
        resolve: (played: User['played']) => played.hard,
      },
    };
  },
});
