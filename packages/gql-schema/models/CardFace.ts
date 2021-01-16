import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { CardFaceProps } from '@types';

export const GqlCardFaceModel = new GraphQLObjectType({
  name: 'CardFace',
  description: 'A single side face for a flip card',
  fields: () => {
    return {
      text: {
        type: GraphQLString,
        resolve: (cardFace: CardFaceProps) => cardFace.text,
      },
      imgLink: {
        type: GraphQLString,
        resolve: (cardFace: CardFaceProps) => cardFace.imgLink,
      },
      colour: {
        type: GraphQLString,
        resolve: (cardFace: CardFaceProps) => cardFace.colour,
      },
    };
  },
});
