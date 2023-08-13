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
import DonorNGOVolunteer from './Requests';
import DonationDetails from './DonationDetails';
import RequestDonor from './RequestDonor'
import VolunteerNGO from './VolunteerNGO';

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
      <Stack.Screen name="DonorNGOVolunteer" component={DonorNGOVolunteer} />
      <Stack.Screen name="DonationDetails" component={DonationDetails} />
      <Stack.Screen name="RequestDonor" component={RequestDonor} />
      <Stack.Screen name="VolunteerNGO" component={VolunteerNGO} />
    </Stack.Navigator>
  );
}

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <StatusBar
        animated={true}
        backgroundColor="transparent"
        translucent={false}
      />
    <NavigationContainer>
    <AppStack/>
    </NavigationContainer>
  </ApplicationProvider>
);

