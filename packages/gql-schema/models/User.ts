import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from 'graphql';
import { User, UserRatings, UserScore } from '@types';

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
      ratings: {
        type: new GraphQLList(GqlUserRatingsObject),
        resolve: (user: User) => user.ratings,
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
        type: GraphQLFloat,
        resolve: (played: UserScore) => played.score,
      },
    };
  },
});

const GqlUserRatingsObject = new GraphQLObjectType({
  name: 'UserRatings',
  description: 'Ratigns that the user has given decks they have played',
  fields: () => {
    return {
      deckId: {
        type: GraphQLString,
        resolve: (rating: UserRatings) => rating.deckId,
      },
      rating: {
        type: GraphQLFloat,
        resolve: (rating: UserRatings) => rating.rating,
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
