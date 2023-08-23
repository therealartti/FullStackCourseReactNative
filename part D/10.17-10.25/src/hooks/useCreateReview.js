import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (reviewInput) => {
    try {
      const { data } = await mutate({ variables: { review: reviewInput } });
      console.log('data inside createReview:', data);
      await apolloClient.resetStore();
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return [createReview, result];
};

export default useCreateReview;
