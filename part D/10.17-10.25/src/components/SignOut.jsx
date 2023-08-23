import { useEffect } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const signOut = async () => {
      await authStorage.removeAccessToken();
      await client.resetStore();
      navigate('/'); 
    };
    signOut();
  }, [authStorage, client, navigate]);

  return null;
};

export default SignOut;
