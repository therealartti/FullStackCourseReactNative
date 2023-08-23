import { gql } from '@apollo/client';

export const AUTHENTICATE = gql`
  mutation Authenticate($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      }
    }
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($review: CreateReviewInput) {
  createReview(review: $review) {
    repositoryId
  }
}
`

export const SINGLE_REPOSITORY = gql`
  query singleRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      url
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      reviews {
        edges {
          node {
            id
            text
            rating
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

export const SIGNUP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      reviewCount
      username
    }
  }
`;
