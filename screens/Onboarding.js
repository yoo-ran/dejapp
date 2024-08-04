import { StyleSheet, View, ImageBackground, Image} from 'react-native';

import { Button, Text } from '@rneui/themed';

export default function Onboarding({ navigation }) {

  return (
    <View style={styles.container}>
        <ImageBackground
        style={styles.backgroundImage}
        source={require('../assets/onboarding.jpg')}>

            <View style={styles.bg}>
                <View style={{flex:1, flexDirection:"column", justifyContent:"flex-end", alignItems:"center", marginTop:100}}>
                    <Text h1 >Welcome to</Text>
                    <Image
                        source={require('../assets/logo_white.png')} // Path to your image file
                        style={styles.image}
                    />
                </View>
                <View style={{flex:1, flexDirection:"column", justifyContent:"flex-end", alignItems:"end", width:"90%", marginBottom:40, rowGap:40}}>
                    <Text style={{color:"white"}}>
                    Explore the best properties, connect with trusted realtors, and make your real estate journey smooth and enjoyable with Lodge.
                    </Text>
                    <Button
                        title="Next"
                        icon={{
                            name: 'arrow-forward-outline',
                            type: 'ionicon',
                            size: 15,
                            color:"#00495F"
                        }}
                        iconPosition='right'
                        onPress={() => navigation.navigate('Main')}
                    />
                </View>
            </View>
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headingText: {
    marginTop: 300,
    marginBottom: 0,
    alignSelf: 'center',
  },

  backgroundImage: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    alignItems:"center",
    width:"100%",
    height:"100%"

  },
  bg:{
    backgroundColor:"rgba(0,52,67,0.3)",
    backdropFilter: "blur(10px)",
    flex: 1,
    flexDirection:"column",
    justifyContent: "flex-end",
    alignItems:"center",
    width:"100%",
    height:"100%"
  }
});