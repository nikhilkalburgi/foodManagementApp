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
import DropShadow from 'react-native-drop-shadow';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function RequestVolunteer({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [requested, setRequested] = React.useState(false);

  database()
    .ref(
      `/volreq/${route.params.username.trim()}/${route.params.Item.id}/status`,
    )
    .once('value', snapshot => {
      if (snapshot.val() == 'Requested') setRequested(false);
      else if (snapshot.val() == 'Accepted') setRequested(true);
    });

  return (
    <ScrollView style={requestVolunteer.ScrollView}>
      <View style={requestVolunteer.ParentView}>
        <View style={requestVolunteer.view_1}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
            onPress={() => {
              navigation.navigate('Home',{...route.params});
            }}>
            <Image
              source={require('./assets/arrow.png')}
              style={{width: 30, height: 30, objectFit: 'contain'}}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              flexGrow: 1,
              verticalAlign: 'middle',
            }}>
            {route.params.userType}
          </Text>
          {route.params.slideName == 'Accepted' ? (
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'green',
                width: '25%',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
                padding: 5,
                position: 'absolute',
                top: 5,
                right: 10,
                backgroundColor: 'white',
                zIndex: 999,
              }}
              onPress={() => {
                try{

                  database()
                    .ref(
                      `/volreq/${route.params.username.trim()}/${
                        route.params.Item.id
                      }/status`,
                    )
                    .set('InProgress');
                  database()
                    .ref(
                      `/volreq/${route.params.Item.ngo.trim()}/${
                        route.params.Item.id
                      }/status`,
                    )
                    .set('InProgress');
                  route.params.Item.pickup.forEach((value: any, index: any) => {
                    database()
                      .ref(
                        `/requests/${route.params.Item.ngo.trim()}/${
                          value.id
                        }/status`,
                      )
                      .set('InProgress');
                    database()
                      .ref(`/requests/${value.donor.trim()}/${value.id}/status`)
                      .set('InProgress');
                    database()
                      .ref(`/delivery/${value.donor.trim()}/${value.id}`)
                      .set({
                        volunteer: route.params.username.trim(),
                        id: route.params.Item.id,
                      });
                  });
                  Alert.alert('Successfully Added to the Map!',`NGO ${route.params.Item.ngo} is in progress.`)
                }
                catch(err){

                }
              }}>
              <Text style={{flexGrow: 1, textAlign: 'center'}}>Begin</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <View style={requestVolunteer.view_2}>
          <View style={{height: windowHeight * 0.8 * 0.3}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View
                style={{
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: 'black',
                  width: windowWidth * 0.25,
                  height: windowWidth * 0.25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <Text style={{fontSize: 50, color: 'black'}}>
                  {route.params.Item.ngo[0].toUpperCase()}
                </Text>
              </View>
              <Text numberOfLines={2} style={{fontSize: 25, color: 'black'}}>
                {route.params.Item.ngo}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                margin: 'auto',
                borderRadius: 10,
                width: windowWidth - 30,
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'white',
                padding: 10,
                height: windowHeight * 0.44,
                borderWidth: StyleSheet.hairlineWidth,
              }}>
              <ScrollView>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Mobile : </Text>{route.params.Item.mobile}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Date : </Text>{String(new Date(route.params.Item.requestdate))}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  >
                  <Text style={{fontWeight: 'bold'}}>Drop Location : </Text>{`\n Lat : ${route.params.Item.drop.latitude},\n Lon : ${route.params.Item.drop.longitude}`}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Color : </Text>{route.params.Item.color}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Pickups : </Text>{route.params.Item.pickup.length}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Default Location : </Text>{route.params.Item.defaultlocation}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>

        <DropShadow
          style={{
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.2,
            shadowRadius: 10,
          }}>
          <View style={requestVolunteer.view_3}>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'green',
                width: '50%',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
                padding: 5,
                backgroundColor: 'white',
                height:windowHeight*0.08
              }}
              onPress={() => {
                try{

                  if (!requested) {
                    database()
                      .ref(
                        `/volreq/${route.params.username.trim()}/${
                          route.params.Item.id
                        }/status`,
                      )
                      .set('Accepted');
                    database()
                      .ref(
                        `/volreq/${route.params.Item.ngo.trim()}/${
                          route.params.Item.id
                        }/status`,
                      )
                      .set('Accepted');
                    database()
                      .ref(
                        `/notifications/${route.params.Item.ngo.trim()}/${
                          route.params.Item.id
                        }`,
                      )
                      .set({
                        id: route.params.Item.id,
                        name: route.params.Item.name,
                        time: Date.now(),
                        msg: `Accepted By ${route.params.username.trim()}`,
                        status: 'unread',
                      });
                  } else {
                    database()
                      .ref(
                        `/volreq/${route.params.username.trim()}/${
                          route.params.Item.id
                        }`,
                      )
                      .set(null);
                    database()
                      .ref(
                        `/volreq/${route.params.Item.ngo.trim()}/${
                          route.params.Item.id
                        }`,
                      )
                      .set(null);
                    database()
                      .ref(
                        `/notifications/${route.params.Item.ngo.trim()}/${
                          route.params.Item.id
                        }`,
                      )
                      .set({
                        id: route.params.Item.id,
                        name: route.params.Item.name,
                        time: Date.now(),
                        msg: `Cancelled By ${route.params.username.trim()}`,
                        status: 'unread',
                      });

                      route.params.Item.pickup.forEach((value: any, index: any) => {

                        database()
                        .ref(`/delivery/${value.donor.trim()}/${value.id}`)
                        .set(null);

                        database().ref(`/requests/${value.donor.trim()}/${value.id}/status`).set('Accepted')
                        database().ref(`/requests/${route.params.Item.ngo.trim()}/${value.id}/status`).set('Accepted')
                      })
                      navigation.navigate('Home',{...route.params});
                  }
                  setRequested(!requested);
                }
                catch(err){

                }
              }}>
              <View style={{flexGrow: 1, padding: 5}}>
                <Image
                  source={
                    requested
                      ? require('./assets/cancel.png')
                      : require('./assets/request.png')
                  }
                  resizeMode='contain'
                    style={{width:"80%"}}
                />
              </View>
              <Text style={{flexGrow: 1, textAlign: 'center'}}>
                {requested ? 'Reject' : 'Accept'}
              </Text>
            </TouchableOpacity>
          </View>
        </DropShadow>
      </View>
    </ScrollView>
  );
}

const requestVolunteer = StyleSheet.create({
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
    padding: 5,
  },
  view_2: {
    flexGrow: 9,
  },
  view_3: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
