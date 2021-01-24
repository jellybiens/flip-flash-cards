import { gql } from '@apollo/client';
import { DeckOverviewFields } from '../fragments/deckOverviewField';

export const TrendingDecksQuery = gql`
  query TrendingDecks($language: String, $subject: String) {
    decks: getDecksTrending(language: $language, subject: $subject) {
      ...DeckOverviewFields
    }
  }
  ${DeckOverviewFields}
`;
