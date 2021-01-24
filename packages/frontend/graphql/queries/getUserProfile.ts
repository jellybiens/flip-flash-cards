import { gql } from '@apollo/client';

export const UserProfileQuery = gql`
query GetUserPrfile($userId: ID) {
  getUser(userId: $userId) {
    _id
    scores {
      deckId
      level
      score
    }
  }
`;
