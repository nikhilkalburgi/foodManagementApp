import {Tab, TabBar, Button, Input, Spinner} from '@ui-kitten/components';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

export default function EditProfileScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [file, setFile] = React.useState({});
  const [defaultLocation, setDefaultLocation] = React.useState(
    route.params.defaultLocation,
  );
  const [mobile, setMobile] = React.useState(route.params.mobile);
  const [currentPass, setCurrentPass] = React.useState(route.params.password);
  const [newPass, setnewPass] = React.useState('');
  const [confirmPass, setconfirmPass] = React.useState('');
  const [disable, setDisable] = React.useState(false);

  return (
    <ScrollView style={profile.ScrollView}>
      <View style={profile.ParentView}>
      {disable ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 999,
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth,
              height: windowHeight,
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}>
            <Spinner size="giant" status="info" />
          </View>
        ) : null}
        <View style={[profile.view_1, profile.view_2]}>
          <Text>Edit Your Profile</Text>
        </View>
        <View style={profile.view_3}>
          <View>
            <Text
              style={{fontSize: 25, color: 'black', fontWeight: 'bold'}}
              numberOfLines={1}>
              {route.params.username}
            </Text>
          </View>
          <View>
            <Text numberOfLines={1}>{route.params.userType} </Text>
          </View>
        </View>
        <View style={profile.view_4}>
          <Input
            label="Default Location"
            placeholder="Your Location"
            value={String(defaultLocation)}
            onChangeText={value => {
              setDefaultLocation(value);
            }}
          />
          <Input
            label="Mobile"
            placeholder="Your Mobile Number"
            value={String(mobile)}
            onChangeText={value => {
              setMobile(value);
            }}
          />
          <Input
            label="Current Passward"
            placeholder="Your Password"
            value={String(currentPass)}
            onChangeText={value => {
              setCurrentPass(value);
            }}
          />
          <Input
            label="New Passward"
            placeholder="Your New Password"
            value={String(newPass)}
            onChangeText={value => {
              setnewPass(value);
            }}
          />
          <Input
            label="Confirm Passward"
            placeholder="Type New Password Again"
            value={String(confirmPass)}
            onChangeText={value => {
              setconfirmPass(value);
            }}
          />
        </View>
        <View style={profile.view_5}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={LinearColor}
            style={{
              width: '75%',
              borderRadius: 5,
              zIndex: 999,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              backgroundColor: 'white',
            }}>
            <Button
              disabled={disable}
              style={{backgroundColor: 'transparent', borderWidth: 0}}
              onPress={() => {
                try{

                  setDisable(true);
                  if ((newPass == confirmPass) && (newPass.match(/[^a-zA-Z0-9@#\s]/g) || newPass == "")) {
                    database()
                      .ref(`/users/${route.params.username.trim()}/file`)
                      .set(file)
                      .then(() => {
  
                        if(newPass)
                        database()
                          .ref(`/users/${route.params.username.trim()}/password`)
                          .set(newPass)
  
                            database()
                              .ref(
                                `/users/${route.params.username.trim()}/mobile`,
                              )
                              .set(mobile)
                              .then(() => {
                                database()
                                  .ref(
                                    `/users/${route.params.username.trim()}/location`,
                                  )
                                  .set(defaultLocation)
                                  .then(() => {
  
  
                                    if(route.params.userType == "Volunteer"){
                                      database()
                                      .ref(
                                        `/volreq/${route.params.username.trim()}`,
                                      )
                                      .once("value",(snapshot)=>{
                                        if(snapshot.val()){
                                        let data = Object.values(snapshot.val());
                                          data.forEach((value:any)=>{
                                            database().ref(`/volreq/${route.params.username.trim()}/${value.id}/mobile`).set(mobile)
                                            database().ref(`/volreq/${route.params.username.trim()}/${value.id}/location`).set(defaultLocation)
                                            database().ref(`/volreq/${value.ngo.trim()}/${value.id}/mobile`).set(mobile)
                                            database().ref(`/volreq/${value.ngo.trim()}/${value.id}/location`).set(defaultLocation)
                                          })
                                        }
                                      })
                                    }
  
                                    if(route.params.userType == "Donor"){
                                      database()
                                      .ref(
                                        `/requests/${route.params.username.trim()}`
                                      )
                                      .once("value",(snapshot)=>{
                                        if(snapshot.val()){
                                        let data = Object.values(snapshot.val());
                                          data.forEach((value:any)=>{
                                            database().ref(`/requests/${route.params.username.trim()}/${value.id}/donationmobile`).set(mobile)
                                            database().ref(`/requests/${route.params.username.trim()}/${value.id}/donationlocation`).set(defaultLocation)
                                            database().ref(`/requests/${value.ngo.trim()}/${value.id}/donationmobile`).set(mobile)
                                            database().ref(`/requests/${value.ngo.trim()}/${value.id}/donationlocation`).set(defaultLocation)
                                          })
                                        }
                                      })
                                      database()
                                      .ref(
                                        `/donations/${route.params.username.trim()}`
                                      )
                                      .once("value",(snapshot)=>{
                                        if(snapshot.val()){
                                        let data = Object.values(snapshot.val());
                                          data.forEach((value:any)=>{
                                            database().ref(`/donations/${route.params.username.trim()}/${value.id}/donationmobile`).set(mobile)
                                            database().ref(`/donations/${route.params.username.trim()}/${value.id}/donationlocation`).set(defaultLocation)
                                        })
                                      }
                                      })
                                    }
  
                                    if(route.params.userType == "NGO"){
                                      database()
                                      .ref(
                                        `/requests/${route.params.username.trim()}`
                                      )
                                      .once("value",(snapshot)=>{
                                        if(snapshot.val()){
                                        let data = Object.values(snapshot.val());
                                          data.forEach((value:any)=>{
                                            database().ref(`/requests/${route.params.username.trim()}/${value.id}/mobile`).set(mobile)
                                            database().ref(`/requests/${route.params.username.trim()}/${value.id}/defaultlocation`).set(defaultLocation)
                                            database().ref(`/requests/${value.donor.trim()}/${value.id}/mobile`).set(mobile)
                                            database().ref(`/requests/${value.donor.trim()}/${value.id}/defaultlocation`).set(defaultLocation)
                                          })
                                        }
                                      })
                                      database()
                                      .ref(
                                        `/volreq/${route.params.username.trim()}`,
                                      )
                                      .once("value",(snapshot)=>{
                                        if(snapshot.val()){
                                        let data = Object.values(snapshot.val());
                                          data.forEach((value:any)=>{
                                            database().ref(`/volreq/${route.params.username.trim()}/${value.id}/mobile`).set(mobile)
                                            database().ref(`/volreq/${route.params.username.trim()}/${value.id}/location`).set(defaultLocation)
                                            database().ref(`/volreq/${value.name.trim()}/${value.id}/mobile`).set(mobile)
                                            database().ref(`/volreq/${value.name.trim()}/${value.id}/location`).set(defaultLocation)
                                          })
                                        }
                                      })
                                    }
  
                                    setDisable(false);
                                    navigation.navigate('Profile', {
                                      username: route.params.username,
                                      password: newPass,
                                      userType: route.params.userType,
                                      mobile,
                                      defaultLocation,
                                    });
                                  });
                              });
                      });
                  }
                }
                catch(err){
                  console.log(err)
                }
              }}>
              <Animated.Text>Done</Animated.Text>
            </Button>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

const profile = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white',
  },
  ParentView: {
    flex: 1,
    height: windowHeight,
  },
  view_1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  view_2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  view_3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_4: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around',
  },
  view_5: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ProfileImage: {
    borderRadius: 5,
    elevation: 5,
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
