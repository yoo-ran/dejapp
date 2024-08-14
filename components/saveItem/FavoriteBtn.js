import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSavedItems } from './SavedItemsContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../../themes/Theme';

const FavoriteBtn = ({ property }) => {
  const { savedItems, setSavedItems } = useSavedItems();
  const [isLiked, setIsLiked] = useState(false);

  // Asynchronously checks if the current item (specified by property.id) exists in AsyncStorage.
  const checkIfItemExists = useCallback(async () => {
    try {
      const existingItems = await AsyncStorage.getItem('items');
      const itemsArray = existingItems ? JSON.parse(existingItems) : [];
      // Checks if the current item is in the array using some().
      const itemExists = itemsArray.some(item => item.id === property.id);
      // Updates the isLiked state based on whether the item exists.
      setIsLiked(itemExists);
    } catch (error) {
      Alert.alert('Error fetching items');
    }
  }, [property.id]);

  //  Executes the checkIfItemExists function when the component mounts or when checkIfItemExists changes. 
  useEffect(() => {
    checkIfItemExists();
  }, [checkIfItemExists]);

  // Asynchronously saves or removes the current item from AsyncStorage based on the isLiked state.
  const saveItem = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('items');
      const itemsArray = existingItems ? JSON.parse(existingItems) : [];

      if (isLiked) {
        
        const updatedItems = itemsArray.filter(item => item.id !== property.id);
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setSavedItems(updatedItems);
        setIsLiked(false);
        Alert.alert('Item removed!');
      } else {
       
        itemsArray.push(property);
        await AsyncStorage.setItem('items', JSON.stringify(itemsArray));
        setSavedItems(itemsArray);
        setIsLiked(true);
        Alert.alert('Item saved!');
      }
    } catch (error) {
      Alert.alert('Error updating item');
    }
  };

  return (
    <TouchableOpacity onPress={saveItem}>
      <FontAwesome 
        name={isLiked ? "heart" : "heart-o"} 
        size={20} 
        color={colors.primary.normal} 
      />
    </TouchableOpacity>
  );
};

export default FavoriteBtn;
