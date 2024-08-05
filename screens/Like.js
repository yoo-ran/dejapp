import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSavedItems } from '../components/saveItem/SavedItemsContext';
import SaleCardItem from '../components/SaleCardItem';

const Like = ({ navigation }) => {
  const { savedItems, setSavedItems } = useSavedItems();

  const fetchItems = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('items');
      if (existingItems) {
        setSavedItems(JSON.parse(existingItems));
      }
    } catch (error) {
      Alert.alert('Error fetching items');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (itemId) => {
    try {
      const existingItems = await AsyncStorage.getItem('items');
      if (existingItems) {
        const itemsArray = JSON.parse(existingItems);
        const updatedItems = itemsArray.filter(item => item.id !== itemId);
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setSavedItems(updatedItems); // Update context state
      }
    } catch (error) {
      Alert.alert('Error deleting item');
    }
  };

  const renderItem = ({ item }) => (
    <SaleCardItem properties={item} navigatorRef={navigation} isLike={true} onDelete={deleteItem} />
  );

  return (
    <View style={styles.container}>
      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noItemsText}>No items found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default Like;
