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
import DropShadow from 'react-native-drop-shadow';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const images: any = {
  Veg: {
    uri: require('./assets/veg.png'),
  },
  'Non-Veg': {
    uri: require('./assets/nonveg.png'),
  },
  Pulses: {
    uri: require('./assets/pulses.png'),
  },
  Fruits: {
    uri: require('./assets/fruits.png'),
  },
  Vegetables: {
    uri: require('./assets/vegetables.png'),
  },
};

export default function DonationDetails({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const selectedIndex = React.useRef(new Animated.Value(1)).current;
  const [items, setItems] = React.useState([
    {id: 1, name: 'Requests'},
    {id: 2, name: 'Accepted'},
    {id: 3, name: 'InProgress'},
    {id: 4, name: 'Completed'},
  ]);
  const [requested, setRequested] = React.useState(false);
  let Flatlist = React.useRef<FlatList>(null);

  database()
    .ref(
      `/requests/${route.params.username.trim()}/${
        route.params.Item.id
      }/status`,
    )
    .once('value', snapshot => {
      if (snapshot.val() == 'Requested' || snapshot.val() == 'Accepted')
        setRequested(true);
    });

  return (
    <ScrollView style={donationdetails.ScrollView}>
      <View style={donationdetails.ParentView}>
        <View style={donationdetails.view_1}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
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
          <Text
            style={{
              fontSize: 25,
              color: 'black',
              flexGrow: 1,
              verticalAlign: 'middle',
            }}>
            {route.params.userType}
          </Text>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <View
              style={{
                borderWidth: 10,
                padding: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftColor: 'transparent',
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor:
                  route.params.Item.type == 'Non-Veg' ? 'red' : 'green',
                position: 'relative',
                top: -10,
              }}>
              <View
                style={{
                  borderWidth: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftColor: 'transparent',
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor:
                    route.params.Item.type == 'Non-Veg' ? 'red' : 'green',
                }}></View>
            </View>
            <View style={{margin: 5}}>
              <Text style={{fontSize: 10}}>Type</Text>
              <Text style={{fontSize: 15}}>{route.params.Item.type}</Text>
            </View>
          </View>
        </View>
        <View style={donationdetails.view_2}>
          <View style={{height: windowHeight * 0.8 * 0.3}}>
            <Image
              source={images[route.params.Item.type].uri}
              style={{width: '100%', height: windowHeight * 0.8 * 0.3}}
            />
            <View
              style={{
                position: 'absolute',
                right: 20,
                bottom: -50,
                width: '25%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
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
                  {route.params.Item.donor[0].toUpperCase()}
                </Text>
              </View>
              <Text numberOfLines={2}>{route.params.Item.donor}</Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                height: windowHeight * 0.1,
              }}>
              <Text
                style={{
                  width: '70%',
                  fontSize: 25,
                  paddingLeft: 15,
                  color: 'black',
                }}
                numberOfLines={1}>
                {route.params.Item.name}
              </Text>
            </View>

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
                  <Text style={{fontWeight: 'bold'}}>Food Type : </Text>
                  {route.params.Item.type}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Date : </Text>
                  {route.params.Item.date}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Location : </Text>
                  {route.params.Item.location.latitude +
                    ', ' +
                    route.params.Item.location.longitude}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Expires On : </Text>
                  {route.params.Item.expiry}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Weight : </Text>
                  {route.params.Item.weight}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Note : </Text>
                  {route.params.Item.note}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>

        {route.params.slideName == 'Donations' ||
        route.params.slideName == 'Requests' ||
        route.params.slideName == 'Accepted' ? (
          <DropShadow
            style={{
              shadowColor: 'black',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0.2,
              shadowRadius: 10,
            }}>
            <View style={{...donationdetails.view_3, justifyContent: 'center'}}>
              {route.params.userType == 'Donor' ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      database()
                        .ref(
                          `/donations/${route.params.username.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .remove()
                        .then(() => {
                          navigation.navigate('Home', {
                            place: route.params.place,
                            username: route.params.username,
                            password: route.params.password,
                            user: route.params.user,
                          });
                        });
                    }}
                    style={{
                      borderWidth: 2,
                      borderColor: 'red',
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      overflow: 'hidden',
                    }}>
                    <View
                      style={{
                        padding: 5,
                        height: windowHeight * 0.055,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image source={require('./assets/Delete.png')} />
                    </View>
                    <Text style={{textAlign: 'center', padding: 5}}>
                      DELETE
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
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
                  }}
                  onPress={() => {
                    if (!requested) {
                      console.log('Requested', route.params.username);
                      database()
                        .ref(
                          `/requests/${route.params.username.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set({
                          ...route.params.Item,
                          status: 'Requested',
                          ngo: route.params.username.trim(),
                          requestdate: Date.now(),
                        });
                      database()
                        .ref(
                          `/requests/${route.params.Item.donor.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set({
                          ...route.params.Item,
                          status: 'Requested',
                          ngo: route.params.username.trim(),
                          mobile: route.params.user.mobile,
                          defaultlocation: route.params.user.location,
                          requestdate: Date.now(),
                        });
                      database()
                        .ref(
                          `/notifications/${route.params.Item.donor.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set({
                          id: route.params.Item.id,
                          name: route.params.Item.name,
                          time: Date.now(),
                          msg: `Request From ${route.params.username.trim()}`,
                          status: 'unread',
                        });
                      database()
                        .ref(
                          `/donations/${route.params.Item.donor.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set(null);
                    } else {
                      console.log('Cancelled');
                      database()
                        .ref(
                          `/donations/${route.params.Item.donor.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set(route.params.Item);
                      database()
                        .ref(
                          `/notifications/${route.params.Item.donor.trim()}/${
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
                      database()
                        .ref(
                          `/requests/${route.params.username.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set(null);
                      database()
                        .ref(
                          `/requests/${route.params.Item.donor.trim()}/${
                            route.params.Item.id
                          }`,
                        )
                        .set(null);
                    }
                    setRequested(!requested);
                  }}>
                  <View style={{flexGrow: 1, padding: 5}}>
                    <Image
                      source={
                        requested
                          ? require('./assets/cancel.png')
                          : require('./assets/request.png')
                      }
                    />
                  </View>
                  <Text style={{flexGrow: 1, textAlign: 'center'}}>
                    {requested ? 'Cancel' : 'Request'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </DropShadow>
        ) : null}
      </View>
    </ScrollView>
  );
}

const donationdetails = StyleSheet.create({
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
  },
});
