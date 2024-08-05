// App.js
import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from './services/RootNavigation'; // Import your navigation reference
import { ThemeProvider, Icon } from '@rneui/themed';
import { basicTheme } from './themes/basicThemes';
import { SavedItemsProvider } from './components/saveItem/SavedItemsContext';

import { useFonts } from 'expo-font';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Quicksand_400Regular, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

import './fonts.css';

import Home from './screens/Home';
import Search from './screens/Search';
import Onboarding from './screens/Onboarding';
import Detail from './screens/Detail';
import Like from './screens/Like';
import SearchResult from './components/searchPage/SearchResult';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
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
              iconName = 'home';  
              break;
            case 'Search':
              iconName = 'search';  
              break;
            case 'Detail':
              iconName = 'document-text-outline';  
              break;
            case 'Like':
              iconName = 'heart'; 
              break;
          }
          const iconColor = focused ? '#00495F' : color;

          return <Icon name={iconName} type='ionicon' color={iconColor} size={size} />;
        },
        tabBarActiveTintColor: '#00495F',
        tabBarInactiveTintColor: '#8e8e8e',
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
              style={{ color: '#003443', marginRight: 5 }}
              name='heart'
              type='ionicon'
              onPress={() => navigate('Like')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Like"
        component={Like}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Quicksand_400Regular,
    Quicksand_700Bold
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#00495F' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SavedItemsProvider>
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
              <Stack.Screen
                name="SearchResult"
                component={SearchResult}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Detail"
                component={Detail}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </ThemeProvider>
        </NavigationContainer>
      </SavedItemsProvider>
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
