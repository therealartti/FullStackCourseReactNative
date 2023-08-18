import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const navigate = useNavigate();
    const [mutate, result] = useMutation(AUTHENTICATE);
    
    const signIn = async ({ username, password }) => {
        const { data } = await mutate({
            variables: {
              credentials: { username, password }
            }
          });
          console.log('data inside useSignIn:', data);

        if (data?.authenticate?.accessToken) {
            console.log('data inside SignIn:', data.authenticate.accessToken)
            await authStorage.setAccessToken(data.authenticate.accessToken);
            await apolloClient.resetStore();
            navigate('/');
        }
        console.log('data outside SignIn:', data)
        return data;
    };

    return [signIn, result];
};

export default useSignIn;