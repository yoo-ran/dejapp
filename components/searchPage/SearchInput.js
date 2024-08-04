import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchInput = ({ query, onChange }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#00495F" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Search category..."
        value={query}
        onChangeText={onChange}
      />
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00495F',
    borderRadius: 10,
    padding:2,
    backgroundColor:"#F9F9F9"
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color:"#00495F",
    paddingVertical:8
  },
});

export default SearchInput;
