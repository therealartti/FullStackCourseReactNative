import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 5,
  },
  userDetails: {
    flex: 1, 
    marginLeft: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  individualStatContainer: {
    alignItems: 'center',
    width: '25%',
  },
  language: {
    backgroundColor: '#0366d6',
    borderRadius: 3,
    color: '#ffffff',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 5,
    marginTop: 5,
  },
});

const Item = ({ item }) => {
  let stars = item.stargazersCount;
  if (stars >= 1000) {
    stars = (stars / 1000).toFixed(1) + 'k';
  } 

  let forks = item.forksCount;
  if (forks >= 1000) {
    forks = (forks / 1000).toFixed(1) + 'k';
  } 

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={{uri: item.ownerAvatarUrl}} />
        <View style={styles.userDetails}>
          <Text fontWeight="bold" fontSize="subheading">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.individualStatContainer}>
          <Text fontWeight="bold">{stars}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.individualStatContainer}>
          <Text fontWeight="bold">{forks}</Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.individualStatContainer}>
          <Text fontWeight="bold">{item.reviewCount}</Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.individualStatContainer}>
          <Text fontWeight="bold">{item.ratingAverage}</Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default Item;
