import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query Repo ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          description
          fullName
          language
          name
          ownerAvatarUrl
          ratingAverage
          reviewCount
          reviews {
            totalCount
          }
          stargazersCount
          forksCount
        }
      }
    }
  }
`;

export const ME_QUERY = gql`
  query ME($includeReviews: Boolean = false){
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            text
            repositoryId
            rating
            id
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
