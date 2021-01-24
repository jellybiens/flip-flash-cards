import { gql } from '@apollo/client';

export const DeckOverviewFields = gql`
  fragment DeckOverviewFields on Deck {
    _id
    title
    subtitle
    imgLink
    colour
    totalVotes
    score
  }
`;
