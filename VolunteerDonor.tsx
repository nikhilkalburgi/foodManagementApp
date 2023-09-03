import React from 'react';
import {
  Alert,
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
    if (granted === 'granted') {
      return true;
    } else {
      Alert.alert('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const getLocation = (region: any, setRegion: any, setShowMap: any) => {
  const result = requestLocationPermission();
  result.then(res => {
    if (res) {
      Geolocation.getCurrentPosition(
        position => {
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          });
          setShowMap(true);
        },
        error => {
          // See error code charts below.
          Alert.alert("Error!", error.message);

          setShowMap(true);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
};

export default function VolunteerDonor({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [region, setRegion] = React.useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [showMap, setShowMap] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [items, setItems]: any = React.useState([]);
  const [pickup, setPickup]: any = React.useState([]);

  React.useEffect(() => {
    try{

      getLocation(region, setRegion, setShowMap);
  
      database()
        .ref(`/delivery/${route.params.username.trim()}`)
        .once('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            data.forEach((value: any) => {
              
              database()
                .ref(`/volreq/${value.volunteer.trim()}/${value.id}`)
                .once('value', snapshot => {
                  let vol = snapshot.val();
                  if (vol && vol.status == 'InProgress') {
                    let array: any[] = [];
                    let ele: {
                      region: any;
                      title: {type: string; name: any};
                      mobile: any;
                      id: any;
                    } | null = null;
  
                    array.push({
                      region: vol.drop,
                      title: {type: 'NGO', name: vol.ngo},
                      mobile: vol.mobile,
                      id: vol.id,
                    });
                    database()
                      .ref(`/delivery/${value.volunteer.trim()}/geo`)
                      .once('value', snapshot => {
                        ele = {
                          region: snapshot.val(),
                          title: {type: 'Volunteer', name: vol.name},
                          mobile: vol.mobile,
                          id: vol.id,
                        };
                        array.push(ele);
                        if (array.length) setItems(array);
                      });
                    database()
                      .ref(`/delivery/${value.volunteer.trim()}/geo`)
                      .on('value', snapshot => {
                        if (ele)
                          array.splice(array.indexOf(ele), 1, {
                            region: snapshot.val(),
                            title: {type: 'Volunteer', name: vol.name},
                            mobile: vol.mobile,
                            id: vol.id,
                          });
  
                        ele = {
                          region: snapshot.val(),
                          title: {type: 'Volunteer', name: vol.name},
                          mobile: vol.mobile,
                          id: vol.id,
                        };
                        setItems(array);
                        setShowMap(false);
                        setShowMap(true)
                      });
                  }
                });
  
              database()
                .ref(`/volreq/${value.volunteer.trim()}/${value.id}`)
                .on('value', snapshot => {
                  let vol = snapshot.val();
                  if (vol && vol.status == "InProgress") {
                    let array: any[] = [];
  
                    array.push({
                      region: vol.drop,
                      title: {type: 'NGO', name: vol.ngo},
                      mobile: vol.mobile,
                      id: vol.id,
                    });
                    database()
                      .ref(`/delivery/${value.volunteer.trim()}/geo`)
                      .on('value', snapshot => {
                        array.push({
                          region: snapshot.val(),
                          title: {type: 'Volunteer', name: vol.name},
                          mobile: vol.mobile,
                          id: vol.id,
                        });
                      });
                    if (array.length){
                      setItems(array);
                      setShowMap(false);
                      setShowMap(true)
                    } 
                  }
                });
            });
          }
        });
    }
    catch(err){

    }
  }, []);

  let mapMarkers = () => {
    return items.map((report: any, index: number) => (
      <Marker
        key={index}
        coordinate={report.region}
        title={`${report.title.type} : ${report.title.name}`}
        pinColor={(report.title.type == 'Volunteer')?'green':'blue'}
        description={
          report.mobile ? `Mobile : ${report.mobile}` : `${index+1}`
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
