import React from 'react';
import { View, StyleSheet, Button, Linking, FlatList } from 'react-native';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';

import { SINGLE_REPOSITORY } from '../graphql/mutations';
import Item from './RepositoryItem';
import Text from './Text';

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

const SingleRepository = () => {
  const { id } = useParams();
  console.log(id)
  const { data, loading } = useQuery(SINGLE_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <Text>Loading...</Text>;

  const repository = data.repository;
  console.log(repository)
  
  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

    console.log(reviews)

  const handleOpenGitHub = () => {
    Linking.openURL(repository.url);
  };
  console.log(repository)
  return (
    <View style={styles.container}>
    <FlatList
    data={reviews}
    ItemSeparatorComponent={ItemSeparator}
    renderItem={({ item }) => <ReviewItem review={item} />}
    keyExtractor={({ id }) => id}
    ListHeaderComponent={() => (<><Item item={repository} />
    <View style={styles.buttonContainer}>
      <Button title="Open in GitHub" onPress={handleOpenGitHub} color='#0366d6'/>
    </View></>)}
  />
  </View>
  );
};

export default SingleRepository;
