import React from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  FlatList,
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
      console.log('You can use Geolocation');
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

          setShowMap(true);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  });
};

const DonLoc = (props: any): JSX.Element => {
  const [color, setColor] = React.useState('danger');

  return (
    <Button
      status={color}
      style={{overflow: 'hidden'}}
      onPress={() => {
        if (color == 'danger') {
          props.pickup.push({
            id: props.item.id,
            donor: props.item.donor,
            mobile: props.item.mobile,
            name: props.item.name,
            location: props.item.location,
          });
          props.setPickup(props.pickup);
          setColor('success');
        } else {
          props.pickup.splice(props.pickup.indexOf(props.item), 1);
          props.setPickup(props.pickup);
          setColor('danger');
        }
      }}>
      {props.item.name}
    </Button>
  );
};

export default function Location({
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
  const [items, setItems] = React.useState([]);
  const [pickup, setPickup]: any = React.useState([]);

  React.useEffect(() => {
    getLocation(region, setRegion, setShowMap);
  }, []);

  return showMap ? (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //specify our coordinates.
        initialRegion={region}
        onRegionChangeComplete={region => {
          setRegion(region);
        }}>
        <Marker coordinate={region} />
      </MapView>
      <Text
        style={{
          position: 'absolute',
          top: 10,
          borderWidth: 1,
          borderRadius: 50,
          paddingHorizontal: 7,
          color: 'black',
          backgroundColor: 'rgba(1,1,1,0.1)',
        }}>
        {route.params.userType}
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          width: '40%',
          justifyContent: 'center',
          paddingVertical: 5,
          borderRadius: 5,
          marginBottom: 10,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onPress={() => {

          if (route.params.userType == 'Donor') {
            navigation.navigate('Donation', {...route.params, region});
          } else if (route.params.userType == 'NGO') {
            database()
              .ref(`/requests/${route.params.props.username.trim()}`)
              .once('value')
              .then(snapshot => {
                if (snapshot.val()) {
                  let data: any = Object.values(snapshot.val());
                  let newData: any = [];
            data.forEach((element: any) => {
              if (element.status == 'Accepted') newData.push(element);
            });
                  setItems(newData);
                  setModalVisible(!modalVisible);
                }
              });
          }
        }}>
        <Text style={{textAlign: 'center', color: 'white'}}>
          {route.params.userType == 'Donor' ? 'Done' : 'Next'}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          borderWidth: 1,
          padding: 5,
          borderRadius: 100,
          borderColor: 'white',
          backgroundColor: 'red',
          transform: [{translateX: -6}, {translateY: -6}],
        }}></View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Select Pickup Donations</Text>
            <FlatList
              style={{width: '100%', marginTop: 20}}
              contentContainerStyle={{alignItems: 'center'}}
              data={items}
              renderItem={({item}) => (
                <View style={{padding: 10, width: '100%'}}>
                  <DonLoc
                    item={item}
                    pickup={pickup}
                    setPickup={setPickup}
                    region={region}
                  />
                </View>
              )}
              keyExtractor={(item:any) => String(item.id)}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                width: '40%',
                position: 'absolute',
                bottom: 0,
                paddingVertical: 5,
                borderRadius: 5,
                marginBottom: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
              onPress={() => {

                if(items.length && pickup.length){
                  let colorCode = `#${parseInt(String(Math.random()*10))}${parseInt(String(Math.random()*10))}${parseInt(String(Math.random()*10))}${parseInt(String(Math.random()*10))}${parseInt(String(Math.random()*10))}${parseInt(String(Math.random()*10))}`;
                  database()
                    .ref(
                      `/volreq/${route.params.props.username.trim()}/${
                        route.params.props.Item.id
                      }`,
                    )
                    .set({
                      ...route.params.props.Item,
                      status: 'Requested',
                      ngo: route.params.props.username.trim(),
                      requestdate: Date.now(),
                      drop: region,
                      pickup: pickup,
                      color: colorCode
                    });
                  database()
                    .ref(
                      `/volreq/${route.params.props.Item.name.trim()}/${
                        route.params.props.Item.id
                      }`,
                    )
                    .set({
                      ...route.params.props.Item,
                      status: 'Requested',
                      ngo: route.params.props.username.trim(),
                      mobile: route.params.props.user.mobile,
                      defaultlocation: route.params.props.user.location,
                      requestdate: Date.now(),
                      drop: region,
                      pickup: pickup,
                      color: colorCode
                    });
                  database()
                    .ref(
                      `/notifications/${route.params.props.Item.name.trim()}/${
                        route.params.props.Item.id
                      }`,
                    )
                    .set({
                      id: route.params.props.Item.id,
                      name: route.params.props.username,
                      time: Date.now(),
                      msg: `Request From ${route.params.props.username.trim()}`,
                      status:'unread'
                    });
                  setModalVisible(!modalVisible);
                  navigation.navigate('VolunteerNGO', {
                    userType: 'NGO',
                    username: route.params.props.username.trim(),
                    password: route.params.props.password,
                    mobile: '',
                    defaultLocation: '',
                    place: route.params.props.place,
                    user: route.params.props.user,
                    toggleRequestFromLocation:true
                  });

                }else{
                  Alert.alert("Task Unsuccessful!","No Donations are accepted yet.",[{text: 'OK', onPress: () => navigation.navigate('VolunteerNGO', {
                    userType: 'NGO',
                    username: route.params.props.username.trim(),
                    password: route.params.props.password,
                    mobile: '',
                    defaultLocation: '',
                    place: route.params.props.place,
                    user: route.params.props.user,
                    toggleRequestFromLocation:false
                  }),}])
                }

              }}>
              <Text style={{textAlign: 'center', color: 'white'}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
        width: '100%',
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
    margin: 10,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
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
});
