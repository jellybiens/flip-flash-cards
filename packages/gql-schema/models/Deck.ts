import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { DeckOverviewProps } from '@types';
import { GqlFlipCardModel } from './FlipCard';

export const GqlCardDeckModel = new GraphQLObjectType({
  name: 'Deck',
  description: 'A deck of cards for a single quiz',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (deck: DeckOverviewProps) => deck._id,
      },
      title: {
        type: GraphQLString,
        resolve: (deck: DeckOverviewProps) => deck.title,
      },
      imgLink: {
        type: GraphQLString,
        resolve: (deck: DeckOverviewProps) => deck.imgLink,
      },
      colour: {
        type: GraphQLString,
        resolve: (deck: DeckOverviewProps) => deck.colour,
      },
      cards: {
        type: new GraphQLList(GqlFlipCardModel),
        resolve: (deck: DeckOverviewProps) => deck.cards,
      },
      subject: {
        type: GraphQLString,
        resolve: (deck: DeckOverviewProps) => deck.subject,
      },
      score: {
        type: GraphQLInt,
        resolve: (deck: DeckOverviewProps) => deck.score,
      },
      totalVotes: {
        type: GraphQLInt,
        resolve: (deck: DeckOverviewProps) => deck.totalVotes,
      },
      createdAt: {
        type: GraphQLDateTime,
        resolve: (deck: DeckOverviewProps) => deck.createdAt,
      },
      updatedAt: {
        type: GraphQLDateTime,
        resolve: (deck: DeckOverviewProps) => deck.updatedAt,
      },
    };
  },
});
