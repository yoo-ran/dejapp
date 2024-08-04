import React from 'react';
import { View, TouchableOpacity, FlatList, StyleSheet, ImageBackground} from 'react-native';
import { Text } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons';

import cities from "./cities.json"

const SearchCity = ({ onCityPress }) => {

    const cityItem = ({item}) => {
        return(
            <ImageBackground 
            source={{ uri: item.img }} 
            style={styles.cityButtonBackground}
            imageStyle={styles.cityButtonImage} // Apply borderRadius to the image
            
            >
            <TouchableOpacity 
              style={styles.cityButton} 
              onPress={() => onCityPress(item)}
            >
              <Text style={styles.cityButtonText}>{item.name}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )
    }

  return (
    <View style={styles.container}>
        <View  style={styles.cityContainer}>
            <Ionicons name="search" size={20} color="#00495F" />
            <Text h3>Popular Cities</Text>
        </View>

      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={cityItem}
        numColumns={2}
        columnWrapperStyle={styles.cityColumn}
        style={styles.cityFlatlist}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    rowGap:20
  },
  cityContainer: {
    flex:1,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    columnGap:8,
    width:"100%",
  },
  cityButton: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cityButtonText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color:"#F9F9F9",
    textAlign:"center"
  },
  cityColumn: {
    justifyContent: 'space-between',
    width:"48%",
    columnGap:10
  },
  cityFlatlist:{
    width:"100%"
  },
  cityButtonBackground:{
    width:"100%",
    height: 100,
    marginBottom:10
  },
  cityButtonImage:{
    borderRadius: 10,
    opacity:0.9,
  }
});

export default SearchCity;
