import { StyleSheet, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.appBarContainer}>
        <AppBar text={"Repositories"} to="/" />
        <AppBar text={"Sign in"} to="/signin" />
      </ScrollView>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;