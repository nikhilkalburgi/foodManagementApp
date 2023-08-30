import React from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import Card from './Cards';
import database from '@react-native-firebase/database';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Spinner} from '@ui-kitten/components';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

const Slide = (props: any): JSX.Element => {
  const getLocation = (region: any, setRegion: any, setShowMap: any) => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        setInterval(() => {
          Geolocation.getCurrentPosition(
            position => {
              database()
                .ref(`/delivery/${props.username.trim()}/geo`)
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

  const [items, setItems]: any = React.useState([]);
  const [showMap, setShowMap] = React.useState(false);
  const [region, setRegion] = React.useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  let mapMarkers = () => {
    console.log('iiiiiii', items);
    return items.map((report: any, index: number) => (
      <Marker
        key={index}
        coordinate={report.region}
        title={`${report.title.type} : ${report.title.name}`}
        description={
          report.mobile ? `Mobile : ${report.mobile}` : `${index}`
        }></Marker>
    ));
    setShowMap(false);
    setShowMap(true);
  };

  React.useEffect(() => {
    console.log(props.slideName, props.userType);
    getLocation(region, setRegion, setShowMap);
    if (props.slideName == 'Map') {
      database()
        .ref(`volreq/${props.username.trim()}`)
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
                  ele = {
                    region: snapshot.val(),
                    title: {type: 'Volunteer', name: val.name},
                    mobile: val.mobile,
                    id: val.id,
                  };
                  array.push(ele);
                  if (array.length) setItems(array);
                });
              database()
                .ref(`/delivery/${val.name.trim()}/geo`)
                .on('value', snapshot => {
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
                  setItems(array);
                });
            });
          }
        });
    }

    if (props.slideName == 'Donations' && props.userType == 'Donor') {
      database()
        .ref(`/donations/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            setItems(data);
          }
        });
      database()
        .ref(`/donations/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            setItems(data);
          }
        });
    } else if (props.slideName == 'Donations' && props.userType == 'NGO') {
      database()
        .ref(`/donations`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              newData.push(Object.values(element));
            });
            setItems(newData[0]);
          }
        });
      database()
        .ref(`/donations`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              newData.push(Object.values(element));
            });
            setItems(newData[0]);
          }
        });
    } else if (
      props.slideName == 'Donors' &&
      (props.userType == 'NGO' || props.userType == 'Volunteer')
    ) {
      database()
        .ref(`/users`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('D') > -1 &&
                element.name.trim() != props.username.trim()
              )
                newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/users`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('D') > -1 &&
                element.name.trim() != props.username.trim()
              )
                newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (
      props.slideName == 'NGO' &&
      (props.userType == 'Donor' || props.userType == 'Volunteer')
    ) {
      database()
        .ref(`/users}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('N') > -1 &&
                element.name.trim() != props.username.trim()
              )
                newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/users`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('N') > -1 &&
                element.name.trim() != props.username.trim()
              )
                newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (
      props.slideName == 'Volunteer' &&
      (props.userType == 'Donor' || props.userType == 'NGO')
    ) {
      database()
        .ref(`/users`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('V') > -1 &&
                element.name.trim() != props.username.trim()
              )
                newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/users`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('V') > -1 &&
                element.name.trim() != props.username.trim()
              )
                newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Requests' && props.userType == 'Donor') {
      database()
        .ref(`/requests/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Requests' && props.userType == 'Volunteer') {
      database()
        .ref(`/volreq/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/volreq/${props.username}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Requests' && props.userType == 'NGO') {
      database()
        .ref(`/requests/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
      console.log(props.username);
      database()
        .ref(`/requests/${props.username}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Accepted' && props.userType == 'Donor') {
      database()
        .ref(`/requests/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            console.log(newData);
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Accepted' && props.userType == 'Volunteer') {
      database()
        .ref(`/volreq/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
      console.log(props.username);
      database()
        .ref(`/volreq/${props.username}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Accepted' && props.userType == 'NGO') {
      database()
        .ref(`/requests/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'InProgress' && props.userType == 'Donor') {
      database()
        .ref(`/requests/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'InProgress') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'InProgress') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (
      props.slideName == 'InProgress' &&
      props.userType == 'Volunteer'
    ) {
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'InProgress') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'InProgress') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'InProgress' && props.userType == 'NGO') {
      database()
        .ref(`/requests/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'InProgress') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'InProgress') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Completed' && props.userType == 'Donor') {
      database()
        .ref(`/requests/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Completed') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Completed') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (
      props.slideName == 'Completed' &&
      props.userType == 'Volunteer'
    ) {
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Completed') newData.push(element);
            });
            setItems(newData);
          }
        });

      database()
        .ref(`/volreq/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Completed') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'Completed' && props.userType == 'NGO') {
      database()
        .ref(`/requests/${props.username}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Completed') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/requests/${props.username}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Completed') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'VolReq' && props.userType == 'NGO') {
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
      console.log(props.username);
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Requested') newData.push(element);
            });
            setItems(newData);
          }
        });
    } else if (props.slideName == 'VolAccepted' && props.userType == 'NGO') {
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
      database()
        .ref(`/volreq/${props.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
            setItems(newData);
          }
        });
    }
  }, []);

  return (
    <View style={slide.Container}>
      {props.slideName != 'Map' ? (
        <FlatList
          data={items}
          renderItem={({item}) => (
            <View style={{alignItems: 'center', width: '100%', paddingTop: 15}}>
              <Card
                slideName={props.slideName}
                userType={props.userType}
                navigation={props.navigation}
                Item={item}
                username={props.username}
                password={props.password}
                place={props.place}
                user={props.user}
              />
            </View>
          )}
          keyExtractor={item => String(item.id)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : showMap ? (
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
      )}
    </View>
  );
};

export default Slide;

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
});
