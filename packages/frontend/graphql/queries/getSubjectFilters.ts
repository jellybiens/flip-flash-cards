import { gql } from '@apollo/client';

export const SubjectsFiltersQuery = gql`
  query SubjectsFilters($language: String) {
    getSubjects(language: $language)
  }
`;
