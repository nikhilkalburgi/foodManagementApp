import React from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import {Button, Spinner} from '@ui-kitten/components';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default function VolunteerMap({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const getLocation = (region: any, setRegion: any, setShowMap: any) => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        setInterval(() => {
          Geolocation.getCurrentPosition(
            position => {
              database()
                .ref(`/delivery/${route.params.username.trim()}/geo`)
                .set({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: region.latitudeDelta,
                  longitudeDelta: region.longitudeDelta,
                });
            },
            error => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
        }, 10000);
        Geolocation.getCurrentPosition(
          position => {
            setRegion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: region.latitudeDelta,
              longitudeDelta: region.longitudeDelta,
            });
            console.log('true');
            setShowMap(true);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);

            setShowMap(true);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const [region, setRegion] = React.useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [showMap, setShowMap] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [items, setItems]: any = React.useState([]);
  const [pickup, setPickup]: any = React.useState([]);

  React.useEffect(() => {
    getLocation(region, setRegion, setShowMap);
    database()
      .ref(`volreq/${route.params.username.trim()}`)
      .once('value', snapshot => {
        let data = snapshot.val();
        if (data) {
          let array: any[] = [];
          data = Object.values(data);
          data.forEach((val: any) => {
            if (val.pickup) {
              val.pickup.sort(
                (a: any, b: any) =>
                  Math.abs(a.location.latitude - region.latitude) +
                  Math.abs(a.location.longitude - region.longitude),
              );
              val.pickup.forEach((value: any) => {
                if (value.location.latitude && value.location.longitude)
                  array.push({
                    region: value.location,
                    title: {type: 'Donor', name: value.donor},
                    mobile: value.mobile,
                    id: value.id,
                  });
              });
            }
            array.push({
              region: val.drop,
              title: {type: 'NGO', name: val.ngo},
              mobile: val.mobile,
              id: val.id,
            });
          });
          if (array.length) setItems(array);
        }
      });
  }, []);

  let mapMarkers = () => {
    console.log('iiiiiii', items);
    return items.map((report: any, index: number) => (
      <Marker
        key={index}
        coordinate={report.region}
        title={report.title.name}
        description={
          report.mobile ? `Mobile : ${report.mobile}` : `${index}`
        }></Marker>
    ));
  };

  return showMap ? (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //specify our coordinates.
        initialRegion={
          items.length
            ? {
                ...items[0].region,
                latitudeDelta: region.latitudeDelta,
                longitudeDelta: region.longitudeDelta,
              }
            : region
        }
        onRegionChangeComplete={region => {
          setRegion(region);
        }}
        showsUserLocation
        showsTraffic
        showsCompass>
        {mapMarkers()}
      </MapView>
      <View style={styles.view_1}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingVertical: 2,
            flexGrow: 1,
            paddingHorizontal: 20,
          }}
          onPress={() => {
            navigation.navigate('Home', {...route.params});
          }}>
          <Image
            source={require('./assets/arrow.png')}
            style={{width: 30, height: 30, objectFit: 'contain'}}
          />
        </TouchableOpacity>

        <Text
          style={{
            position: 'absolute',
            left: '30%',
            transform: [{translateX: -windowWidth * 0.1}],
            fontSize: 20,
            color: 'black',
            height: windowHeight * 0.07,
            verticalAlign: 'middle',
          }}>
          Map
        </Text>
      </View>
      {items.length ? (
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: '2%',
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: 'rgba(255,255,255,0.7)',
            width: '95%',
            height: windowHeight * 0.15,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
          onLongPress={() => {
            if (items[0].title.type == 'Donor') {
              database()
                .ref(`/requests/${items[0].title.name.trim()}/${items[0].id}`)
                .once('value', snapshot => {
                  let data = snapshot.val();
                  if (data) {
                    console.log(data);
                    database()
                      .ref(
                        `/requests/${items[0].title.name.trim()}/${
                          items[0].id
                        }/status`,
                      )
                      .set('Completed');
                    database()
                      .ref(`/requests/${data.ngo.trim()}/${data.id}/status`)
                      .set('Completed');
                  }
                });
            } else if (items[0].title.type == 'NGO') {
              database()
                .ref(
                  `/volreq/${items[0].title.name.trim()}/${items[0].id}/status`,
                )
                .set('Completed');
              database()
                .ref(
                  `/volreq/${route.params.username.trim()}/${
                    items[0].id
                  }/status`,
                )
                .set('Completed');
            }
            items.shift();
            setItems(items);
            setShowMap(false);
            setShowMap(true);
          }}>
          <View
            style={{
              borderRightWidth: StyleSheet.hairlineWidth,
              width: '25%',
              aspectRatio: 1,
              borderColor: '#ddd',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 5,
              borderRadius: 100,
              elevation: 3,
              backgroundColor: 'white',
            }}>
            <Text style={{fontSize: 40, color: 'black'}}>{`${
              items.length ? items[0].title.type[0] : ''
            }`}</Text>
          </View>
          <View style={{width: '70%', paddingLeft: 5}}>
            <View style={styles.CardAbsoluteBottom}>
              <Text
                style={{
                  verticalAlign: 'middle',
                  paddingRight: 5,
                  color: 'black',
                  fontWeight: '700',
                }}>
                Donor
              </Text>
              <Button
                style={{backgroundColor: 'black', borderWidth: 0}}
                onPress={() => {
                  console.log(`Notify to ${items[0].title.name}`);
                  if (items[0].title.type == 'Donor') {
                    database()
                      .ref(
                        `/notifications/${items[0].title.name.trim()}/${
                          items[0].id
                        }`,
                      )
                      .set({
                        id: items[0].id,
                        name: 'Delivery',
                        time: Date.now(),
                        msg: `Volunteer ${route.params.username} has reached your location.`,
                        status: 'unread',
                      });
                  } else if (items[0].title.type == 'NGO') {
                    database()
                      .ref(
                        `/notifications/${items[0].title.name.trim()}/${
                          items[0].id
                        }`,
                      )
                      .set({
                        id: items[0].id,
                        name: 'Delivery',
                        time: Date.now(),
                        msg: `Volunteer ${route.params.username} has reached your location.`,
                        status: 'unread',
                      });
                  }
                }}>
                Notify
              </Button>
            </View>
            <View style={styles.CardBody}>
              <View style={styles.CardBodyTitle}>
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  {items.length
                    ? `${items[0].title.type} : ${items[0].title.name} `
                    : ''}
                </Text>
              </View>
              <View style={styles.CardBodyContent}>
                <Text
                  style={{fontSize: 10, lineHeight: 18, color: 'black'}}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    Mobile :{' '}
                  </Text>
                  {items.length ? items[0].mobile : ''}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  ) : (
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
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  view_1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: windowHeight * 0.07,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: windowHeight * 0.92,
  },
  CardBody: {
    width: '90%',
    marginTop: 5,
    height: 95,
  },
  CardBodyTitle: {
    paddingLeft: 10,
    flexGrow: 0.1,
  },
  CardBodyContent: {
    paddingLeft: 10,
    flexGrow: 1,
  },
  CardAbsoluteBottom: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
  },
});
