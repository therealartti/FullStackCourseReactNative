import { useMutation, useApolloClient } from "@apollo/client";
import { SIGNUP } from "../graphql/mutations";
import useSignIn from "./useSignIn";
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-dom';


export const useSignUp = () => {
	const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
	const navigate = useNavigate();
    const [mutate, result] = useMutation(SIGNUP);
	const [signIn] = useSignIn();
  
    const signUp = async ({ username, password }) => {
        const { data } = await mutate({
            variables: {
				user: { username, password }
            }
          });
          console.log('data inside useSignUp:', data);
		
		try {
			const data = await signIn({ username, password });
			console.log('data at the other side:', data);
		} catch (e) {
			console.log(e);
		}

        if (data?.authenticate?.accessToken) {
            console.log('data inside SignUp:', data.authenticate.accessToken)
            await authStorage.setAccessToken(data.authenticate.accessToken);
            await apolloClient.resetStore();
            navigate('/');
        }
        console.log('data outside SignUp:', data)
        return data;
    };
  
    return [signUp, result];
};