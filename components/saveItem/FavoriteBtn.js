import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSavedItems } from './SavedItemsContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { colors } from '../../themes/Theme';

const FavoriteBtn = ({ property }) => {
  const { savedItems, setSavedItems } = useSavedItems();
  const [isLiked, setIsLiked] = useState(false);

  const checkIfItemExists = useCallback(async () => {
    try {
      const existingItems = await AsyncStorage.getItem('items');
      const itemsArray = existingItems ? JSON.parse(existingItems) : [];
      const itemExists = itemsArray.some(item => item.id === property.id);
      setIsLiked(itemExists);
    } catch (error) {
      Alert.alert('Error fetching items');
    }
  }, [property.id]);

  useEffect(() => {
    checkIfItemExists();
  }, [checkIfItemExists]);

  const saveItem = async () => {
    try {
      const existingItems = await AsyncStorage.getItem('items');
      const itemsArray = existingItems ? JSON.parse(existingItems) : [];

      if (isLiked) {
        // Remove item if it already exists
        const updatedItems = itemsArray.filter(item => item.id !== property.id);
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
        setSavedItems(updatedItems);
        setIsLiked(false);
        Alert.alert('Item removed!');
      } else {
        // Add item if it does not exist
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
