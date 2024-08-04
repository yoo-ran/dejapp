// Like.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Like = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const existingItems = await AsyncStorage.getItem('items');
        if (existingItems) {
          setItems(JSON.parse(existingItems));
        }
      } catch (error) {
        Alert.alert('Error fetching items');
      }
    };

    fetchItems();
  }, []);

  return (
    <View>
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      ) : (
        <Text>No items found</Text>
      )}
    </View>
  );
};

export default Like;
