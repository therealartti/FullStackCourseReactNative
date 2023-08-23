import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositories from '../hooks/useRepositories';
import Item from './RepositoryItem';
import React, { useState } from 'react';
import { Picker } from "@react-native-picker/picker";
import { useDebounce } from 'use-debounce';
import TextInput from './TextInput';

const styles = StyleSheet.create({
  separator: {
    paddingBottom: 10,
    backgroundColor: "#e2e3e9"
  },
});

const RepositoryListHeader = ({ setKeyword, keyword, pValue, setPValue, setOrderBy, setOrderDirection }) => {
  return (
    <View>
      <TextInput
        onChangeText={text => setKeyword(text)}
        value={keyword}
        placeholder="Search for repositories..."
      />
      <OrderPicker 
        pValue={pValue}
        setPValue={setPValue}
        setOrderBy={setOrderBy} 
        setOrderDirection={setOrderDirection} 
      />
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;


const OrderPicker = ({ pValue, setPValue, setOrderBy, setOrderDirection }) => (
  <Picker
    selectedValue={pValue}
    onValueChange={(itemValue) => {
      setPValue(itemValue);
      switch(itemValue) {
        case "rating-desc":
          setOrderBy("RATING_AVERAGE");
          setOrderDirection("DESC");
          break;
        case "rating-asc":
          setOrderBy("RATING_AVERAGE");
          setOrderDirection("ASC");
          break;
        default:
          setOrderBy("CREATED_AT");
          setOrderDirection("DESC");
      }
    }}
  >
    <Picker.Item label="Latest repositories" value="latest" />
    <Picker.Item label="Highest rated repositories" value="rating-desc" />
    <Picker.Item label="Lowest rated repositories" value="rating-asc" />
  </Picker>
);

export class RepositoryListContainer extends React.Component {

  renderHeader = () => {
    const { keyword, setKeyword, pValue, setPValue, setOrderBy, setOrderDirection } = this.props;

    return (
      <RepositoryListHeader
        keyword={keyword}
        setKeyword={setKeyword}
        pValue={pValue}
        setPValue={setPValue}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <Item item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [pValue, setPValue] = useState('latest');
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(keyword, 500);
  const { repositories } = useRepositories(orderBy, orderDirection, debouncedKeyword);

  const navigate = useNavigate();

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      pValue={pValue}
      setPValue={setPValue}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      keyword={keyword}
      setKeyword={setKeyword}
      navigate={navigate}
    />
  );
};

export default RepositoryList;