import { StyleSheet, Text } from 'react-native';
import theme from '../theme';
import { Link } from "react-router-native";


const styles = StyleSheet.create({
  appBarItem: {
    padding: 10
  },
  text: {
    color: "#ffffff",
    fontWeight: theme.fontWeights.bold,
    fontFamily: theme.fonts,
  },
});

const AppBar = ({ text, to }) => {
  return (
    <Link to={to} style={styles.appBarItem} >
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
};

export default AppBar;
