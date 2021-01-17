import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { DeckOverviewProps } from '@types';

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
      votesToday: {
        type: GraphQLInt,
        resolve: (deck: DeckOverviewProps) => deck.votesToday,
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
