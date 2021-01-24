import { gql } from '@apollo/client';
import { DeckOverviewFields } from '../fragments/deckOverviewField';

export const UserDecksQuery = gql`
  query UserDecks($userId: ID) {
    decks: getUserDecks(userId: $userId) {
      ...DeckOverviewFields
    }
  }
  ${DeckOverviewFields}
`;
