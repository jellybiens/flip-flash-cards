import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import { DeckOverviewProps } from '@types';
import { GqlFlipCardInputModel } from '.';

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
      language: {
        type: GraphQLString,
        resolve: (deck: DeckOverviewProps) => deck.language,
      },
      score: {
        type: GraphQLFloat,
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

export const GqlDeckInputModal = new GraphQLInputObjectType({
  name: 'DeckInput',
  description: 'A deck of cards for a single quiz',
  fields: () => {
    return {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      imgLink: {
        type: new GraphQLNonNull(GraphQLString),
      },
      cards: {
        type: new GraphQLNonNull(new GraphQLList(GqlFlipCardInputModel)),
      },
      colour: {
        type: new GraphQLNonNull(GraphQLString),
      },
      subject: {
        type: new GraphQLNonNull(GraphQLString),
      },
      language: {
        type: new GraphQLNonNull(GraphQLString),
      },
    };
  },
});
