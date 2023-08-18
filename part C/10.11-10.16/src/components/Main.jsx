import { StyleSheet, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import theme from '../theme';
import { ME_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  appBarContainer: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',
  },
});

const Main = () => {
  const { data } = useQuery(ME_QUERY);
  const signedIn = !!data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.appBarContainer}>
        <AppBar text={"Repositories"} to="/" />
        <AppBar text={signedIn ? "Sign Out" : "Sign In"} to={signedIn ? "/signout" : "/signin"} />
      </ScrollView>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signout" element={<SignOut />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;