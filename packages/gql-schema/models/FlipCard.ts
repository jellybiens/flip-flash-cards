import { GraphQLObjectType, GraphQLID } from 'graphql';
import { FlipCardProps } from '@types';
import { GqlCardFaceModel } from './CardFace';

export const GqlFlipCardModel = new GraphQLObjectType({
  name: 'FlipCard',
  description: 'A 2 sided card with information on the back and front',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (flipCard: FlipCardProps) => flipCard._id,
      },
      front: {
        type: GqlCardFaceModel,
        resolve: (flipCard: FlipCardProps) => flipCard.front,
      },
      back: {
        type: GqlCardFaceModel,
        resolve: (flipCard: FlipCardProps) => flipCard.back,
      },
    };
  },
});
