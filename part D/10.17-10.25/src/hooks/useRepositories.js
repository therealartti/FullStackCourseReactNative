import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {
    const { data, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: { orderBy, orderDirection, searchKeyword },
      });
    
    const repositories = data?.repositories;

    return { repositories, loading };
};

export default useRepositories;