import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import the stack navigator
import { navigationRef } from './services/RootNavigation';
import { ThemeProvider, Icon } from '@rneui/themed';
import { basicTheme } from './themes/basicThemes';

import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

import './fonts.css';

import Home from './screens/Home';
import Search from './screens/Search';
import Onboarding from './screens/Onboarding';
import Detail from './screens/Detail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontWeight: 'normal',
          fontFamily: 'Poppins_400Regular',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home'; // Replace with your icon name
              break;
            case 'Search':
              iconName = 'search'; // Replace with your icon name
              break;
            case 'Detail':
              iconName = 'document-text-outline'; // Replace with your icon name
              break;
          }
          const iconColor = focused ? '#00495F' : color;

          return <Icon name={iconName} type='ionicon' color={iconColor} size={size} />;
        },
        tabBarActiveTintColor: '#00495F',  // Active tab label color
        tabBarInactiveTintColor: '#8e8e8e', // Inactive tab label color
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}      
      />
      <Tab.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detail',
          headerRight: () => (
            <Icon
              style={{ color: '#003443' }}
              name='heart'
              type='ionicon'
              onPress={() => navigationRef.navigate('Like')}
            />
          ),
        }}  
      />
    </Tab.Navigator>
  );
}

export default function App() {
  // the hook that loads the font  
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Quicksand_400Regular, 
    Quicksand_700Bold
  });

  // conditional to show a spinner while the font is loading
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#00495F' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <ThemeProvider theme={basicTheme}>
          <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
