import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import LoginScreen from './Login'
import HomeScreen from './Home'
import ProfileScreen from './Profile';
import EditProfileScreen from './EditProfile';
import { Dimensions, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from './Notification';
import DonationScreen from './Donation';
import SearchScreen from './Search';

const Stack = createNativeStackNavigator();


const windowHeight = Dimensions.get('window').height;

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false,animation:"slide_from_bottom"}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
    </Stack.Navigator>
  );
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />
    <NavigationContainer>
    <AppStack/>
    </NavigationContainer>
  </ApplicationProvider>
);

