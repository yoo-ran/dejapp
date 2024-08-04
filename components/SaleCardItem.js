import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you are using expo
import { colors } from '../themes/Theme';

const SaleCardItem = ({ properties, navigatorRef }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigatorRef.navigate('Detail', { detailId: properties.id })}
    >
        <Image 
          source={{ uri: properties.img }} // Placeholder image
          style={styles.image}
          resizeMode="cover" 
        />

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
    flex:1,
    flexDirection:"row",
    width: "90%",
    padding: 13.57,
    justifyContent:"space-between",
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 10,
  },
  image: {
    width: '36%',
    height:"100%",
    borderRadius: 10,
    backgroundColor:"gray"
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
  },
  infoContainer: {
    width: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.primary.normal
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
    color:colors.primary.normal
  },
});

export default SaleCardItem;
