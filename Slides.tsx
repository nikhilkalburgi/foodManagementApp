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
  Alert,
} from 'react-native';
import Card from './Cards';
import database from '@react-native-firebase/database';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Spinner} from '@ui-kitten/components';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;



const Slide = (props: any): JSX.Element => {
 

  const [items, setItems]: any = React.useState([]);
  const [region, setRegion] = React.useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  
  React.useEffect(() => {

    try{
  
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
              let v:any;
              data.forEach((element: any) => {
                v = Object.values(element)
                v.forEach((value:any)=>{
                  if(new Date(value.expiry) > new Date())
                  newData.push(value)
                  
                })
                
              });
              if(newData.length)
              setItems(newData);
            }
          });
        database()
          .ref(`/donations`)
          .once('value')
          .then(snapshot => {
            if (snapshot.val()) {
              let data: any = Object.values(snapshot.val());
              let newData: any = [];
              let v:any;
              data.forEach((element: any) => {
                v = Object.values(element)
                v.forEach((value:any)=>{
                  if(new Date(value.expiry) > new Date())
                  newData.push(value)
                  
                })
                
              });
              if(newData.length)
              setItems(newData);
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
    }
    catch(err){
      console.log(err)
    }
  }, []);

 

  return (
    <View style={slide.Container}>
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
          keyExtractor={item => {return String(item.id)}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      
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
