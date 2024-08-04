import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import CardItem from '../CardItem';

const SearchResult = ({ results }) => {
  const renderItem = ({ item }) => (
    <CardItem properties={item} navigatorRef={navigation} />
  );

  return (
    <FlatList
      data={results}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap:20
  }
});

export default SearchResult;
