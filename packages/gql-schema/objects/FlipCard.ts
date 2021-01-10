import { GraphQLObjectType, GraphQLID } from 'graphql';
import { FlipCardProps } from '@types';
import { GqlCardFaceObject } from './CardFace';

export const GqlFlipCardObject = new GraphQLObjectType({
  name: 'FlipCard',
  description: 'A 2 sided card with information on the back and front',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (flipCard: FlipCardProps) => flipCard.cardId,
      },
      front: {
        type: GqlCardFaceObject,
        resolve: (flipCard: FlipCardProps) => flipCard.front,
      },
      back: {
        type: GqlCardFaceObject,
        resolve: (flipCard: FlipCardProps) => flipCard.back,
      },
    };
  },
});
