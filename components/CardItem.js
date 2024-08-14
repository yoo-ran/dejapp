import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you are using expo
import { colors } from '../themes/Theme';

import FavoriteBtn from './saveItem/FavoriteBtn';

const CardItem = ({ properties, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Detail', { detailId: properties.id })}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: properties.img }} 
          style={styles.image}
          resizeMode="cover" 
        />
        <TouchableOpacity style={styles.heartIcon}>
          <FavoriteBtn property={properties}/>
        </TouchableOpacity>
        <View style={styles.priceTag}>
          <Text style={styles.priceText}>${properties.price.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{properties.name}</Text>
        <View style={styles.addressContainer}>
          <FontAwesome name="map-marker" size={20} color={colors.primary.normal} />
          <Text style={styles.addressText}>3-seat sofa with chaise longue, Gunnared beige</Text>
        </View>
        <View style={styles.subInfoContainer}>
          <View style={styles.iconText}>
            <FontAwesome name="bath" size={20} color={colors.primary.normal} />
            <Text style={styles.subInfoText}>{properties.amenity.bathroom}</Text>
          </View>
          <View style={styles.iconText}>
            <FontAwesome name="bed" size={20} color={colors.primary.normal} />
            <Text style={styles.subInfoText}>{properties.amenity.bedroom}</Text>
          </View>
          <View style={styles.iconText}>
            <FontAwesome name="square" size={20} color={colors.primary.normal} />
            <Text style={styles.subInfoText}>{properties.amenity.sqft}ft</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    width: 250, // Adjust the width for horizontal scrolling
    padding: 13.57,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 13.57,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10,
    marginBottom: 18,
    marginRight: 10,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  priceTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.primary.normal,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary.normal,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addressText: {
    marginLeft: 5,
    color: 'grey',
  },
  subInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  subInfoText: {
    marginLeft: 5,
    color: colors.primary.normal,
  },
});

export default CardItem;
