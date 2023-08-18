import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repo{
    repositories {
      edges {
        node {
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
  query ME{
    me {
      id
      username
    }
  }
`;