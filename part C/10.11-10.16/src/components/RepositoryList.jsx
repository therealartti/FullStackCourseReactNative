import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import Item from './RepositoryItem'

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#e2e3e9"
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <Item item={item} />}
      keyExtractor={item => item.id}
    />
  );
};

export default RepositoryList;