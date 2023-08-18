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
import RequestVolunteer from './RequestVolunteer';
import EncryptedStorage from 'react-native-encrypted-storage';
import database from '@react-native-firebase/database';

let initialPage = "Login",params = {};


const Stack = createNativeStackNavigator();


const windowHeight = Dimensions.get('window').height;




function AppStack(props:any) {
  let [appState,setAppState] = React.useState(true)
  
      async function retrieveUserSession() {
          try {   
            let session:any = await EncryptedStorage.getItem("user_session");
          
              if (session !== undefined) {
                  // Congrats! You've just retrieved your first value!
                  session = JSON.parse(session || "")
                    database()
                                  .ref(`/users/${session.username.trim()}`)
                                  .once('value')
                                  .then(snapshot => {
                                    let user = snapshot.val()
                                    console.log(user)
                                  if(user.authenticated == true)
                                    initialPage = "Home"
                                  params = {
                                    place:session.place,
                                    username:session.username,
                                    password:user.password,
                                    user
                                  }
                                  setAppState(false)
                                  })
              }
          } catch (error) {
              // There was an error on the native side
          }
        }
        retrieveUserSession()
  return (
    (!appState)?<Stack.Navigator screenOptions={{headerShown:false,animation:"slide_from_bottom"}} initialRouteName={initialPage}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} initialParams={params}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
      <Stack.Screen name="DonorNGOVolunteer" component={DonorNGOVolunteer} />
      <Stack.Screen name="DonationDetails" component={DonationDetails} />
      <Stack.Screen name="RequestDonor" component={RequestDonor} />
      <Stack.Screen name="RequestVolunteer" component={RequestVolunteer} />
      <Stack.Screen name="VolunteerNGO" component={VolunteerNGO} />
    </Stack.Navigator>:null
  );
}

export default (props:any) => (
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

