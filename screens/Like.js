import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSavedItems } from '../components/saveItem/SavedItemsContext';
import SaleCardItem from '../components/SaleCardItem';

const Like = ({ navigation }) => {
  const { savedItems, setSavedItems } = useSavedItems();

  // Retrieves the saved items from AsyncStorage when the component mounts.
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

  // Calls fetchItems when the component mounts (empty dependency array [] ensures it runs once).
  useEffect(() => {
    fetchItems();
  }, []);

  // Removes an item with a specific itemId from AsyncStorage and updates the state.
  const deleteItem = async (itemId) => {
    try {
      // Retrieves the saved items from AsyncStorage. AsyncStorage.getItem
      const existingItems = await AsyncStorage.getItem('items');
      if (existingItems) {
        // Converts the stringified JSON data into a JavaScript array using JSON.parse.
        const itemsArray = JSON.parse(existingItems);
        // Creates a new array updatedItems that excludes the item with the specified itemId.
        const updatedItems = itemsArray.filter(item => item.id !== itemId);
        // Stores the updated array of items back into AsyncStorage. 
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        // Updates the component’s state with the new array of items.
        setSavedItems(updatedItems); 
      }
    } catch (error) {
      Alert.alert('Error deleting item');
    }
  };

  // Renders each item using SaleCardItem, passing the item data, navigation, a flag (isLike), and the deleteItem function.
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
