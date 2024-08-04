import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Text } from "@rneui/themed";
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { colors } from '../themes/Theme';
import { basicTheme } from '../themes/basicThemes';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const DetailComponent = ({ currProperty }) => {
    const amenitiesArray = Object.entries(currProperty.amenity);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const handleScrollEnd = (item, index) => {
        setActiveIndex(index);
    };

    const scrollToIndex = (index) => {
        carouselRef.current.scrollToIndex(index);
        setActiveIndex(index);
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <ImageBackground
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
                <View style={styles.flexCol}>
                    <Carousel
                        ref={carouselRef}
                        data={currProperty.carousel}
                        renderItem={renderItem}
                        itemWidth={width * 0.9}
                        containerWidth={width * 0.9}
                        separatorWidth={10}
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
                <View style={styles.box}>
                    <View>
                        <Text h2 style={styles.title}>{currProperty.name}</Text>
                        <View style={styles.flexRow}>
                            <FontAwesome name="map-marker" size={20} color={colors.primary.normal} />
                            <Text style={{ color: colors.base.dark, width: "90%" }}>{currProperty.address}</Text>
                        </View>
                    </View>
                    <View>
                        <Text h2 style={styles.title}>Features:</Text>
                        <View style={styles.flexRow}>
                            {amenitiesArray.map(([key, value]) => (
                                <View key={key} style={styles.flexCol}>
                                    <Avatar
                                        size="medium"
                                        rounded
                                        source={{ uri: "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-house-icon-png-image_695369.jpg" }}
                                        containerStyle={styles.avatar}
                                    />
                                    <Text style={styles.amenityText}>{value} {key}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={styles.box}>
                    <Text h2 style={styles.title}>Details:</Text>
                    <Text style={{ color: colors.primary.normal }}>{currProperty.description}</Text>
                </View>

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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center', // Center content horizontally if needed
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start", // Changed from 'space-between' to 'flex-start'
        alignItems: "center",
        paddingVertical: 10,
        rowGap: 15,
        width: '100%', // Ensure container takes full width
    },
    flexCol: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    amenityText: {
        fontFamily: "Quicksand_700Bold",
        color: colors.primary.normal,
        textTransform: "capitalize"
    },
    title: {
        width: "100%",
        textAlign: "left"
    },
    box: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        padding: 3,
        width: "90%",
        rowGap: 10
    },
    priceBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        padding: 2,
        width: "90%",
        rowGap: 10
    },
    priceText: {
        fontWeight: "bold",
        fontFamily: "Poppins_700Bold",
        color: colors.primary.normal,
        fontSize: 24
    },
    itemContainer: {
        width: width * 0.95,
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
});

export default DetailComponent;
