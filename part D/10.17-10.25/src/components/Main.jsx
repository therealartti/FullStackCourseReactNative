import { StyleSheet, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';
import theme from '../theme';
import MyReviews from './Reviews';
import SingleRepository from './SingleRepository'
import { ME_QUERY } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import AddReview from './AddReview';


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
        {signedIn && <AppBar text="Create a review" to="/create-review" />}
        {signedIn && <AppBar text="My reviews" to="/reviews" />}
        <AppBar text={signedIn ? "Sign Out" : "Sign In"} to={signedIn ? "/signout" : "/signin"} />
        {!signedIn && <AppBar text="Sign Up" to="/signup" />}
      </ScrollView>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signout" element={<SignOut />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/reviews" element={<MyReviews />} exact />
        <Route path="/repository/:id" element={<SingleRepository />} exact/>
        <Route path="/create-review" element={<AddReview />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;