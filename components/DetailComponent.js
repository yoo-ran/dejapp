import React,{useRef} from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text } from "@rneui/themed"
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; 
import { colors } from '../themes/Theme';
import { basicTheme } from '../themes/basicThemes';

import Carousel from 'react-native-anchor-carousel';


const DetailComponent = ({ currProperty, navigatorRef }) => {
    const amenitiesArray = Object.entries(currProperty.amenity);

    const carouselRef = useRef(null);
    let initIndex = 1


    const renderItem = ({ item, index }) => (
        <TouchableOpacity
          activeOpacity={.7}
        //   style={[styles.caroItem]}
    
        //   onPress={() => {
        //     carouselRef.current.scrollToIndex(index);
        //   }}
          >
          <Image
            // style={styles.caroImage}
            source={{ uri: "https://images.pexels.com/photos/2043035/pexels-photo-2043035.jpeg?auto=compress&cs=tinysrgb&w=800" }}
          />
        </TouchableOpacity>
      );

  return (
    <View style={styles.container}>
        <Carousel
            style={styles.carousel}
            data={currProperty}
            renderItem={renderItem}
            initialIndex={initIndex}

            // itemWidth={windowWidth * 0.7}
            inActiveScale={0.6}
            separatorWidth={15}
            // containerWidth={windowWidth}

            inActiveOpacity={0.3}

            ref={carouselRef}
        />
        <View style={styles.box}>
            <View style={styles.col}>
                <Text h2 style={styles.title}>{currProperty.name}</Text>
                <View style={styles.flexRow}>
                    <FontAwesome name="map-marker" size={20} color={colors.primary.normal} />
                    <Text style={{color:colors.base.dark, width:"90%"}}>{currProperty.address}</Text>
                </View>
            </View>
            <View>
                <Text h2 style={styles.title}>Feautures:</Text>
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
            <Text style={{color:colors.primary.normal}}>{currProperty.description}</Text>
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
  );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        padding:10
    },
    flexCol:{
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center"
    },
    flexRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    amenityText:{
        fontFamily:"Quicksand_700Bold",
        color:colors.primary.normal,
        textTransform:"capitalize"
    },
    title:{
        width:"100%", 
        textAlign:"left"
    },
    box:{
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"flex-start",
        backgroundColor:"white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        padding:2,
        width:"100%"
    },
    priceBox:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"white",
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        padding:2,
        width:"100%",
        rowGap:10
    },
    priceText:{
        fontWeight:"bold",
        fontFamily:"Poppins_700Bold",
        color:colors.primary.normal,
        fontSize:24
    },
    priceBtn:{
        backgroundColor:colors.primary.normal,
        color:"white",
        borderRadius:16,
    }
});

export default DetailComponent;
