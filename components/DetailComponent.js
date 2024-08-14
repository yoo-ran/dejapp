import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Button, Text } from "@rneui/themed";
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from '../themes/Theme';
import { basicTheme } from '../themes/basicThemes';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const DetailComponent = ({ currProperty }) => {
 // Check if `currProperty` is null or an empty object.
// If `currProperty` does not exist or is empty, render a Text component with the message "No property data available."
if (!currProperty || Object.keys(currProperty).length === 0) {
    return <Text>No property data available.</Text>;
}

// Convert the `amenity` property of `currProperty` into an array of key-value pairs.
// If `currProperty.amenity` is present, `Object.entries(currProperty.amenity)` converts it into an array of entries.
// If `currProperty.amenity` is not present, use an empty array.
const amenitiesArray = currProperty.amenity ? Object.entries(currProperty.amenity) : [];

// Define an array of icons to represent different amenities.
// Each icon is a FontAwesome or FontAwesome5 component with specified size and color.
// The array includes icons for bed, bath, square footage, and parking.
const amenitiesICon = [
    <FontAwesome name="bed" size={24} color={colors.primary.normal} />,
    <FontAwesome name="bath" size={24} color={colors.primary.normal} />,
    <FontAwesome name="square" size={24} color={colors.primary.normal} />,
    <FontAwesome5 name="parking" size={24} color={colors.primary.normal} />,
];

// Create a state variable to keep track of the currently active index in a carousel.
// `activeIndex` holds the index of the currently active item, initially set to 0.
// `setActiveIndex` is a function to update `activeIndex`.
const [activeIndex, setActiveIndex] = useState(0);

// Create a reference to the carousel component using `useRef`.
// `carouselRef` will be used to programmatically control the carousel (e.g., scroll to a specific index).
const carouselRef = useRef(null);

// Define a function to handle the end of a scroll action in the carousel.
// It updates the `activeIndex` state to the index of the currently visible item.
const handleScrollEnd = (item, index) => {
    setActiveIndex(index);
};

// Define a function to programmatically scroll to a specific index in the carousel.
// It uses the `carouselRef` to call `scrollToIndex` and updates the `activeIndex` state.
const scrollToIndex = (index) => {
    carouselRef.current.scrollToIndex(index);
    setActiveIndex(index);
};


    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Image
                    source={{ uri: item }}
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                />
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {/* Carousel */}
                {currProperty.carousel && currProperty.carousel.length > 0 && (
                    <View style={{maxHeight:200}}>
                        <Carousel
                            ref={carouselRef}                            
                            data={currProperty.carousel}
                            renderItem={renderItem}
                            itemWidth={width * 1}
                            containerWidth={width * 1}
                            separatorWidth={5}
                            pagingEnabled={true}
                            onScrollEnd={handleScrollEnd}
                        />
                        <View style={styles.paginationContainer}>
                            {currProperty.carousel.map((_, index) => (
                                <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
                                    <View
                                        style={[
                                            styles.paginationDot,
                                            { width: activeIndex === index ? 20 : 8 }
                                        ]}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
                
                {/* Property Details */}
                {currProperty.name && (
                    <View style={styles.box}>
                        <Text h2 style={styles.title}>{currProperty.name}</Text>
                        <View style={styles.flexRow}>
                            <FontAwesome name="map-marker" size={20} color={colors.primary.normal} />
                            <Text style={{ color: colors.base.dark, width: "90%" }}>{currProperty.address}</Text>
                        </View>
                    </View>
                )}

                {/* Amenities */}
                {amenitiesArray.length > 0 && (
                    <View style={styles.box}>
                        <Text h2 style={styles.title}>Features:</Text>
                        <View style={styles.flexRow}>
                            {amenitiesArray.map(([key, value], index) => (
                                <View key={key} style={styles.flexCol}>
                                    <View style={styles.iconContainer}>
                                        {amenitiesICon[index]}
                                        <Text style={styles.amenityText}>{value} {key}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Property Description */}
                {currProperty.description && (
                    <View style={styles.box}>
                        <Text h2 style={styles.title}>Details:</Text>
                        <Text style={{ color: colors.primary.normal }}>{currProperty.description}</Text>
                    </View>
                )}

                {/* Property Price */}
                {currProperty.price && (
                    <View style={styles.priceBox}>
                        <Text style={styles.priceText}>${currProperty.price.toLocaleString()}</Text>
                        <Button
                            title="Message"
                            buttonStyle={basicTheme.components.GreenBtn.buttonStyle}
                            titleStyle={basicTheme.components.GreenBtn.titleStyle}
                            disabledStyle={basicTheme.components.GreenBtn.disabledStyle}
                            icon={basicTheme.components.GreenBtn.icon}
                            type={basicTheme.components.GreenBtn.type}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingVertical: 10,
        gap: 15,
        width: '100%',
    },
    flexCol: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    amenityText: {
        fontFamily: "Quicksand_700Bold",
        color: colors.primary.normal,
        textTransform: "capitalize",
    },
    title: {
        width: "100%",
        textAlign: "left",
    },
    box: {
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        width: "95%",
        gap: 10,
        alignItems: "flex-start",
        padding: 10,
    },
    priceBox: {
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        width: "95%",
        elevation: 5,
        gap: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
    priceText: {
        fontWeight: "bold",
        fontFamily: "Poppins_700Bold",
        color: colors.primary.normal,
        fontSize: 24,
    },
    itemContainer: {
        width: width,
        height: 200,
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'gray',
        margin: 2,
    },
    iconContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
    }
});

// Shared box style for box-like components
const sharedBoxStyle = {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "90%",
    gap: 10,
};


export default DetailComponent;
