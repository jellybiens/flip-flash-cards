import { gql } from '@apollo/client';

export const DeckCardsQuery = gql`
  query DeckCards($deckId: ID) {
    getDeckCards(deckId: $deckId) {
      _id
      front {
        text
        imgLink
        colour
      }
      back {
        text
        imgLink
        colour
      }
    }
  }
`;
