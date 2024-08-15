import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage
import { useSavedItems } from '../components/saveItem/SavedItemsContext'; // Import custom hook for managing saved items
import SaleCardItem from '../components/SaleCardItem'; // Import SaleCardItem component for rendering items

const Like = ({ navigation }) => {
  // Access saved items and the function to update them from the context
  const { savedItems, setSavedItems } = useSavedItems();

  // Function to retrieve saved items from AsyncStorage and update the state
  const fetchItems = async () => {
    try {
      // Retrieve saved items from AsyncStorage
      const existingItems = await AsyncStorage.getItem('items');
      if (existingItems) {
        // Parse the JSON string to an array and update state
        setSavedItems(JSON.parse(existingItems));
      }
    } catch (error) {
      // Show an alert if there's an error fetching items
      Alert.alert('Error fetching items');
    }
  };

  // useEffect hook to call fetchItems when the component mounts
  useEffect(() => {
    fetchItems();
  }, []); // Empty dependency array ensures this runs only once

  // Function to delete an item by its ID
  const deleteItem = async (itemId) => {
    try {
      // Retrieve the current list of saved items
      const existingItems = await AsyncStorage.getItem('items');
      if (existingItems) {
        // Parse the string into an array
        const itemsArray = JSON.parse(existingItems);
        // Filter out the item with the specified ID
        const updatedItems = itemsArray.filter(item => item.id !== itemId);
        // Save the updated items array back to AsyncStorage
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        // Update the component's state with the new list of items
        setSavedItems(updatedItems); 
      }
    } catch (error) {
      // Show an alert if there's an error deleting the item
      Alert.alert('Error deleting item');
    }
  };

  // Render function for each item in the list
  const renderItem = ({ item }) => (
    // Render SaleCardItem with item properties, navigation, a flag, and delete function
    <SaleCardItem properties={item} navigation={navigation} isLike={true} onDelete={deleteItem} />
  );

  return (
    <View style={styles.container}>
      {/* Render FlatList if there are saved items, otherwise show a message */}
      {savedItems.length > 0 ? (
        <FlatList
          data={savedItems}
          keyExtractor={(item, index) => index.toString()} // Use index as key
          renderItem={renderItem} // Render each item using renderItem function
        />
      ) : (
        <Text style={styles.noItemsText}>No items found</Text> // Message if no items are available
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal: 16, // Padding around the content
    paddingVertical:40
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16, // Text style for the "No items found" message
  },
});

export default Like; 
