import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Splash = ({ onFinish }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); 

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo_color.png')} // Use require for local assets
        style={styles.image}
        resizeMode="contain" // Ensure the image scales properly
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  image: {
    width: width * 0.8, 
    height: height * 0.4, 
  },
});

export default Splash;
