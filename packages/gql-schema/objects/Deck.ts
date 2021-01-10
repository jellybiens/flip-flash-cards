import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';
import { DeckOverviewProps } from '@types';
import { GqlFlipCardObject } from './FlipCard';

export const GqlCardDeckObject = new GraphQLObjectType({
  name: 'Deck',
  description: 'A deck of cards for a single quiz',
  fields: () => {
    return {
      _id: {
        type: GraphQLID,
        resolve: (deck: DeckOverviewProps) => deck.deckId,
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
        type: new GraphQLList(GqlFlipCardObject),
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
    };
  },
});
