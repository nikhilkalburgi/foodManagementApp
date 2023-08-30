import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';
import Slide from './Slides';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

export default function HomeScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const selectedIndex = React.useRef(new Animated.Value(0)).current;

  const [items, setItems] = React.useState([{id: 1, name: ''}]);
  const [userType, setUserType] = React.useState('');
  const [tab, setTab] = React.useState({topBar: <></>, bottomBar: <></>});
  const [dot, setDot]: any[] = React.useState('none');
  let Flatlist = React.useRef<FlatList>(null);

  React.useEffect(
    () =>
      navigation.addListener(
        'beforeRemove',
        (e: {data: any; preventDefault: () => void}) => {
          // Prevent default behavior of leaving the screen
          e.preventDefault();
        },
      ),
    [navigation],
  );

  console.log('----------->', route.params);
  React.useEffect(() => {
    database()
      .ref(`/notifications/${route.params.username}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          let data: object[] = Object.values(snapshot.val());
          if (
            data.some((value: any) => {
              if (value.status == 'unread') return true;
            })
          )
            setDot('flex');
        }
      });

    if (route.params.place.donor) {
      setUserType('Donor');
      setItems([
        {id: 1, name: 'Donations'},
        {id: 2, name: 'NGO'},
      ]);
      setTab({
        topBar: (
          <View style={home.TopBar}>
            <View style={home.TopBar_v1}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{color: 'black', textAlign: 'center'}}
                  onPress={() => {
                    Flatlist.current?.scrollToIndex({
                      animated: true,
                      index: 0,
                    });
                  }}>
                  My Donations
                </Text>
              </View>
              <View>
                <Text
                  style={{color: 'black', textAlign: 'center'}}
                  onPress={() => {
                    Flatlist.current?.scrollToIndex({
                      animated: true,
                      index: 1,
                    });
                  }}>
                  NGO
                </Text>
              </View>
            </View>
            <View style={home.TopBar_v2}>
              <Animated.View
                style={{
                  width: '48%',
                  position: 'relative',
                  left: selectedIndex,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={LinearColor}
                  style={{
                    padding: 2,
                    borderRadius: 5,
                    width: '100%',
                  }}></LinearGradient>
              </Animated.View>
            </View>
          </View>
        ),
        bottomBar: (
          <>
            <DropShadow
              style={{
                shadowColor: '#ddd',
                shadowOffset: {width: 0, height: -5},
                shadowOpacity: 0.6,
                shadowRadius: 6,
              }}>
              <View style={home.BottomBar_v1}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}>
                  <Image source={require('./assets/bank.png')} />
                  <Text>Bank</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('VolunteerDonor', {
                      userType: 'Donor',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/volunteer.png')} />
                  <Text>Volunteer</Text>
                </TouchableOpacity>
                <View style={{paddingHorizontal: 30}}></View>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('DonorNGOVolunteer', {
                      userType: 'Donor',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/ngo.png')} />
                  <Text>NGO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('Profile', {
                      userType: 'Donor',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/donor.png')} />
                  <Text>Profile</Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
            <View style={home.BottomBar_Circle}>
              <DropShadow
                style={{
                  shadowColor: '#ddd',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 5,
                }}>
                <TouchableOpacity
                  style={home.BottomBar_Circle_v1}
                  onPress={() => {
                    navigation.navigate('Donation', {
                      userType: 'Donor',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      region: {latitude: '', longitude: ''},
                    });
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 60,
                      fontWeight: 'bold',
                      opacity: 1,
                      width: '100%',
                      lineHeight: 70,
                      verticalAlign: 'middle',
                      color: 'black',
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              </DropShadow>
              <View style={home.BottomBar_Circle_v2}></View>
            </View>
          </>
        ),
      });
    } else if (route.params.place.ngo) {
      setUserType('NGO');
      setItems([
        {id: 1, name: 'Donations'},
        {id: 2, name: 'Donors'},
      ]);
      setTab({
        topBar: (
          <View style={home.TopBar}>
            <View style={home.TopBar_v1}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{color: 'black', textAlign: 'center'}}
                  onPress={() => {
                    Flatlist.current?.scrollToIndex({
                      animated: true,
                      index: 0,
                    });
                  }}>
                  Donations
                </Text>
              </View>
              <View>
                <Text
                  style={{color: 'black', textAlign: 'center'}}
                  onPress={() => {
                    Flatlist.current?.scrollToIndex({
                      animated: true,
                      index: 1,
                    });
                  }}>
                  Donors
                </Text>
              </View>
            </View>
            <View style={home.TopBar_v2}>
              <Animated.View
                style={{
                  width: '48%',
                  position: 'relative',
                  left: selectedIndex,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={LinearColor}
                  style={{
                    padding: 2,
                    borderRadius: 5,
                    width: '100%',
                  }}></LinearGradient>
              </Animated.View>
            </View>
          </View>
        ),
        bottomBar: (
          <>
            <DropShadow
              style={{
                shadowColor: '#ddd',
                shadowOffset: {width: 0, height: -5},
                shadowOpacity: 0.6,
                shadowRadius: 6,
              }}>
              <View style={{...home.BottomBar_v1, padding: 10}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('DonorNGOVolunteer', {
                      userType: 'NGO',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/request.png')} />
                  <Text>Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('VolunteerNGO', {
                      userType: 'NGO',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/volunteer.png')} />
                  <Text>Volunteer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('Profile', {
                      userType: 'NGO',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/ngo.png')} />
                  <Text>Profile</Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
          </>
        ),
      });
    } else if (route.params.place.volunteer) {
      setUserType('Volunteer');
      setItems([
        {id: 1, name: 'NGO'},
        {id: 2, name: 'Donors'},
      ]);
      setTab({
        topBar: (
          <View style={home.TopBar}>
            <View style={home.TopBar_v1}>
              <View>
                <Text
                  style={{color: 'black', textAlign: 'center'}}
                  onPress={() => {
                    Flatlist.current?.scrollToIndex({
                      animated: true,
                      index: 0,
                    });
                  }}>
                  NGO
                </Text>
              </View>
              <View>
                <Text
                  style={{color: 'black', textAlign: 'center'}}
                  onPress={() => {
                    Flatlist.current?.scrollToIndex({
                      animated: true,
                      index: 1,
                    });
                  }}>
                  Donors
                </Text>
              </View>
            </View>
            <View style={home.TopBar_v2}>
              <Animated.View
                style={{
                  width: '48%',
                  position: 'relative',
                  left: selectedIndex,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={LinearColor}
                  style={{
                    padding: 2,
                    borderRadius: 5,
                    width: '100%',
                  }}></LinearGradient>
              </Animated.View>
            </View>
          </View>
        ),
        bottomBar: (
          <>
            <DropShadow
              style={{
                shadowColor: '#ddd',
                shadowOffset: {width: 0, height: -5},
                shadowOpacity: 0.6,
                shadowRadius: 6,
              }}>
              <View style={{...home.BottomBar_v1, padding: 10}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('DonorNGOVolunteer', {
                      userType: 'Volunteer',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/request.png')} />
                  <Text>Requests</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('VolunteerMap', {
                      userType: 'Volunteer',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image
                    source={require('./assets/map.png')}
                    style={{height: 30, resizeMode: 'contain'}}
                  />
                  <Text>Map</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 2,
                  }}
                  onPress={() => {
                    navigation.navigate('Profile', {
                      userType: 'Volunteer',
                      username: route.params.username.trim(),
                      password: route.params.password,
                      mobile: '',
                      defaultLocation: '',
                      place: route.params.place,
                      user: route.params.user,
                    });
                  }}>
                  <Image source={require('./assets/ngo.png')} />
                  <Text>Profile</Text>
                </TouchableOpacity>
              </View>
            </DropShadow>
          </>
        ),
      });
    }
  }, []);

  return (
    <View style={home.ParentView}>
      <View style={home.view_1}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingVertical: 2,
            flexGrow: 4,
            paddingHorizontal: 10,
          }}
          onPress={() => {
            navigation.navigate('Search', {
              userType,
              username: route.params.username.trim(),
              password: route.params.password,
              place: route.params.place,
              user: route.params.user,
            });
          }}>
          <Image
            source={require('./assets/search.png')}
            style={{width: 40, height: 40, objectFit: 'contain'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingVertical: 2,
            paddingHorizontal: 5,
          }}>
          <Text numberOfLines={1}>{route.params.username}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingVertical: 2,
            paddingHorizontal: 10,
          }}
          onPress={() => {
            setDot('none');
            navigation.navigate('Notification', {
              userType,
              username: route.params.username.trim(),
              password: route.params.password,
              place: route.params.place,
              user: route.params.user,
            });
          }}>
          <Image
            source={require('./assets/alarm.png')}
            style={{width: 40, height: 40, objectFit: 'contain'}}
          />
          <View
            style={{
              position: 'absolute',
              width: 8,
              aspectRatio: 1,
              right: 10,
              top: 0,
              borderRadius: 100,
              backgroundColor: 'red',
              display: dot,
            }}></View>
        </TouchableOpacity>
      </View>
      <View style={home.view_2}>
        <Text style={home.TitleTxt}>{userType}</Text>
      </View>
      <View style={home.view_3}>{tab.topBar}</View>
      <View style={home.view_4}>
        <FlatList
          data={items}
          renderItem={({item}) =>
            userType ? (
              <Slide
                slideName={item.name}
                navigation={navigation}
                userType={userType}
                username={route.params.username}
                place={route.params.place}
                password={route.params.password}
                user={route.params.user}
              />
            ) : null
          }
          keyExtractor={item => String(item.id)}
          snapToAlignment="start"
          decelerationRate={'fast'}
          snapToInterval={Dimensions.get('window').width}
          horizontal
          onScroll={eve => {
            Animated.timing(selectedIndex, {
              toValue: eve.nativeEvent.contentOffset.x / 2,
              useNativeDriver: false,
              duration: 10,
            }).start();
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ref={Flatlist}
        />
      </View>
      <View style={home.view_5}>{tab.bottomBar}</View>
    </View>
  );
}

const home = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white',
  },
  ParentView: {
    flex: 1,
    height: windowHeight,
    backgroundColor: 'white',
  },
  view_1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 15,
  },
  view_2: {
    justifyContent: 'center',
  },
  view_3: {
    justifyContent: 'center',
  },
  view_4: {
    flexGrow: 30,
    alignItems: 'center',
    flex: 1,
  },
  view_5: {
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  TitleTxt: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 0,
    marginLeft: 20,
    color: 'black',
  },
  TopBar: {
    margin: 5,
  },
  TopBar_v1: {
    flexGrow: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    paddingBottom: 5,
  },
  TopBar_v2: {
    flexGrow: 0.4,
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
    left: '50%',
    transform: [{translateX: -windowWidth * 0.49}],
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
    overflow: 'hidden',
  },
  BottomBar_Circle: {
    position: 'absolute',
    width: windowWidth * 0.2,
    aspectRatio: 1,
    left: '50%',
    top: -40,
    borderRadius: 100,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{translateX: -windowWidth * 0.1}],
  },
  BottomBar_v1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  BottomBar_Circle_v1: {
    borderRadius: 100,
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  BottomBar_Circle_v2: {
    position: 'absolute',
    width: '120%',
    aspectRatio: 1 / 0.5,
    margin: -3,
    bottom: -8,
    zIndex: -1,
    backgroundColor: '#F8F9F9',
    borderBottomEndRadius: 100,
    borderBottomStartRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
});
