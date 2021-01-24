import { gql } from '@apollo/client';
import { DeckOverviewFields } from '../fragments/deckOverviewField';

export const TopRatedDecksQuery = gql`
  query TopRatedDecks($language: String, $subject: String) {
    decks: getDecksTopRated(language: $language, subject: $subject) {
      ...DeckOverviewFields
    }
  }
  ${DeckOverviewFields}
`;
