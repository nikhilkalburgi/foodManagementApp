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

    React.useEffect(()=>{
            getLocation(region, setRegion, setShowMap);
            database()
              .ref(`volreq/${route.params.username.trim()}`)
              .once('value', snapshot => {
                let data = snapshot.val();
                let ele: {
                  region: any;
                  title: {type: string; name: any} | {type: string; name: any};
                  mobile: any;
                  id: any;
                } | null = null;
                if (data) {
                  let array: any[] = [];
                  data = Object.values(data);
                  data.forEach((val: any) => {
                    if(val.status == 'InProgress'){
                      
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
        
                      database()
                        .ref(`/delivery/${val.name.trim()}/geo`)
                        .once('value', snapshot => {
                          if(snapshot.val()){  
                            ele = {
                              region: snapshot.val(),
                              title: {type: 'Volunteer', name: val.name},
                              mobile: val.mobile,
                              id: val.id,
                            };
                            array.push(ele);
                            if (array.length) setItems(array);
                          }
                        });
                      database()
                        .ref(`/delivery/${val.name.trim()}/geo`)
                        .on('value', snapshot => {
                          if(snapshot.val()){
                            
                            if (ele)
                              array.splice(array.indexOf(ele), 1, {
                                region: snapshot.val(),
                                title: {type: 'Volunteer', name: val.name},
                                mobile: val.mobile,
                                id: val.id,
                              });
            
                            ele = {
                              region: snapshot.val(),
                              title: {type: 'Volunteer', name: val.name},
                              mobile: val.mobile,
                              id: val.id,
                            };
                            if(array.length)
                            setItems(array);
                          }
                        });
                      }
                    });
                    if (array.length) setItems(array);
                            setShowMap(false)
                            setShowMap(true)
                }
                  });
      
                  database()
              .ref(`volreq/${route.params.username.trim()}`)
              .on('value', snapshot => {
                let data = snapshot.val();
                let ele: {
                  region: any;
                  title: {type: string; name: any} | {type: string; name: any};
                  mobile: any;
                  id: any;
                } | null = null;
                if (data) {
                  let array: any[] = [];
                  data = Object.values(data);
                  data.forEach((val: any) => {
                    if (val.status == "InProgress" && val.pickup) {
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
      
                    
                  });
                  if (array.length){
                    setItems(array);
                    setShowMap(false)
                    setShowMap(true)
                  } 
                }
                  });
    },[])

    let mapMarkers = () => {
        return items.map((report: any, index: number) => {
          return <Marker
            key={index}
            coordinate={{latitude:report.region.latitude,longitude:report.region.longitude}}
            title={`${report.title.type} : ${report.title.name}`}
            pinColor={(report.title.type == 'Volunteer')?'green':'blue'}
            description={
              report.mobile ? `Mobile : ${report.mobile}` : `${index+1}`
            }></Marker>
        });
      };


        return showMap ? (
            <View style={slide.container}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={slide.map}
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
              <View style={slide.view_1}>
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
          )

}

const slide = StyleSheet.create({
    Container: {
      backgroundColor: 'white',
      flexDirection: 'column',
      width: windowWidth,
      alignItems: 'center',
      paddingTop: 0,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1, //the container will fill the whole screen.
      justifyContent: 'flex-end',
      alignItems: 'center',
      overflow: 'hidden',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
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
  });