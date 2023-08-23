import { useQuery } from '@apollo/client';
import { FlatList, View, StyleSheet } from 'react-native';
import Text from './Text';
import { ME_QUERY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flexShrink: 1
  },
  buttonContainer: {
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  },
  separator: {
    paddingBottom: 10,
    backgroundColor: "#e2e3e9"
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#0366d6',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 2,
    width: 50,
    height: 50,
  },
  scoreText: {
    color: '#0366d6',
  },
  reviewDetails: {
    marginLeft: 10,
    flex: 1
  }
});

const ReviewItem = ({ review }) => {
  const isoDate = review.createdAt
  const date = new Date(isoDate);
  const formattedDate = [
      date.getDate().toString().padStart(2, '0'),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getFullYear(),
    ].join('.');

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewDetails}>
        <Text fontWeight="bold" fontSize="subheading">{review.user.username}</Text>
        <Text color="textSecondary">{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, loading } = useQuery(ME_QUERY, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text>Loading...</Text>;

  const reviews = data?.me?.reviews?.edges || [];

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={item => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;
