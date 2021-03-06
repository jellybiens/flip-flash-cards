import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import { Tag } from '@types';

export const GqlTagModel = new GraphQLObjectType({
  name: 'Tag',
  description: 'Tags related to a deck for searching',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (deck: Tag) => deck._id,
      },
      text: {
        type: GraphQLString,
        resolve: (deck: Tag) => deck.text,
      },
    };
  },
});

export const GqlTagInputModal = new GraphQLInputObjectType({
  name: 'TagInput',
  description: 'Tags related to a deck',
  fields: () => {
    return {
      text: {
        type: new GraphQLNonNull(GraphQLString),
      },
      deckId: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});
