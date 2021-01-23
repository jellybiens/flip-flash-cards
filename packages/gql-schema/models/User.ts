import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import { User, UserScore } from '@types';

export const GqlUserModel = new GraphQLObjectType({
  name: 'User',
  description: 'This is a user that has visited the site',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (user: User) => user._id,
      },
      scores: {
        type: new GraphQLList(GqlPlayedDecksObject),
        resolve: (user: User) => user.scores,
      },
    };
  },
});

const GqlPlayedDecksObject = new GraphQLObjectType({
  name: 'UserScores',
  description: 'Scores for decks that the user has played',
  fields: () => {
    return {
      deckId: {
        type: GraphQLString,
        resolve: (played: UserScore) => played.deckId,
      },
      level: {
        type: GraphQLString,
        resolve: (played: UserScore) => played.level,
      },
      score: {
        type: GraphQLString,
        resolve: (played: UserScore) => played.score,
      },
    };
  },
});

// TODO: on frontend
// const scoreDictionary: {
//   easy: { [key: string]: number };
//   medium: { [key: string]: number };
//   hard: { [key: string]: number };
// } = {
//   easy: {},
//   medium: {},
//   hard: {},
// };
// user.scores.map((score) => {
//   scoreDictionary[score.level][score.deckId] = score.score;
// });
