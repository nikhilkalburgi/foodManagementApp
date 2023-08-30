import {Tab, TabBar, Button, Input} from '@ui-kitten/components';
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
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import database from '@react-native-firebase/database';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

export default function ProfileScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [disable, setDisable] = React.useState(false);

  return (
    <ScrollView style={profile.ScrollView}>
      <View style={profile.ParentView}>
        <View style={profile.view_1}>
          <TouchableOpacity
            disabled={disable}
            style={{
              justifyContent: 'center',
              paddingVertical: 2,
              flexGrow: 4,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              navigation.navigate('Home', {
                place: route.params.place,
                username: route.params.username,
                password: route.params.password,
                user: route.params.user,
              });
            }}>
            <Image
              source={require('./assets/arrow.png')}
              style={{width: 30, height: 30, objectFit: 'contain'}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={disable}
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingVertical: 2,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              navigation.navigate('EditProfile', {
                username: route.params.username,
                password: route.params.password,
                userType: route.params.userType,
                mobile: route.params.mobile,
                defaultLocation: route.params.defaultLocation,
              });
            }}>
            <Image
              source={require('./assets/edit.png')}
              style={{width: 30, height: 30, objectFit: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <View style={profile.view_2}>
          <View style={profile.ProfileImage}>
            <Text style={{fontSize: 50}}>
              {route.params.username[0].toUpperCase()}
            </Text>
          </View>
        </View>
        <View style={profile.view_3}>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              numberOfLines={1}>
              {route.params.username}
            </Text>
          </View>
          <View>
            <Text style={{textAlign: 'center'}} numberOfLines={1}>
              {route.params.userType}{' '}
            </Text>
          </View>
        </View>
        <View style={profile.view_4}>
          <Input
            label="Default Location"
            value={String(route.params.defaultLocation)}
            placeholder="Your Location"
            disabled={true}
          />
          <Input
            label="Mobile"
            value={String(route.params.mobile)}
            placeholder="Your Mobile Number"
            disabled={true}
          />
          <Input
            label="Passward"
            value={String(route.params.password)}
            placeholder="Your Password"
            disabled={true}
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
              size="giant"
              style={{backgroundColor: 'transparent', borderWidth: 0}}
              onPress={async () => {
                setDisable(true);
                await EncryptedStorage.removeItem('user_session');
                database()
                  .ref(`/users/${route.params.username}/authenticated`)
                  .set(false);
                Alert.alert(
                  'Successfully Signed Out',
                  'To Login again. Please restart the app.',
                );
              }}>
              <Animated.Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Logout
              </Animated.Text>
            </Button>
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#FF0303', '#F66262']}
            style={{
              width: '75%',
              borderRadius: 5,
              zIndex: 999,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              backgroundColor: 'white',
              marginTop: 20,
            }}>
            <Button
              disabled={disable}
              size="giant"
              style={{backgroundColor: 'transparent', borderWidth: 0}}
              onPress={async () => {
                setDisable(true);
                await EncryptedStorage.removeItem('user_session');
                database()
                  .ref(`/notifications/${route.params.username.trim()}`)
                  .remove();
                database()
                  .ref(`/users/${route.params.username.trim()}`)
                  .remove()
                  .then(() => {
                    database()
                      .ref(`/donations/${route.params.username.trim()}`)
                      .set(null)
                      .then(() => {
                        Alert.alert(
                          'Successfully Deleted',
                          'Your Account has been Removed.',
                        );
                      });
                  });
              }}>
              <Animated.Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Delete Account
              </Animated.Text>
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
    paddingVertical: 20,
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
    borderRadius: 100,
    elevation: 5,
    width: '30%',
    aspectRatio: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
});
