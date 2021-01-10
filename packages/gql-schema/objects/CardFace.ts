import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { CardFaceProps } from '@types';

export const GqlCardFaceObject = new GraphQLObjectType({
  name: 'CardFace',
  description: 'A single side face for a flip card',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (cardFace: CardFaceProps) => cardFace._id,
      },
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
