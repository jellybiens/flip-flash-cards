import { gql } from '@apollo/client';
import { DeckOverviewFields } from '../fragments/deckOverviewField';

export const NewestDecksQuery = gql`
  query NewestDecks($language: String, $subject: String) {
    decks: getDecksNewest(language: $language, subject: $subject) {
      ...DeckOverviewFields
    }
  }
  ${DeckOverviewFields}
`;
