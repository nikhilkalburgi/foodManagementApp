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
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

export default function RequestDonor({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [requested, setRequested] = React.useState(false);
  let Flatlist = React.useRef<FlatList>(null);

  database()
    .ref(
      `/requests/${route.params.username.trim()}/${
        route.params.Item.id
      }/status`,
    )
    .once('value', snapshot => {
      if (snapshot.val() == 'Requested') setRequested(false);
      else if (snapshot.val() == 'Accepted') setRequested(true);
    });

  return (
    <ScrollView style={requestDonor.ScrollView}>
      <View style={requestDonor.ParentView}>
        <View style={requestDonor.view_1}>
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
        </View>
        <View style={requestDonor.view_2}>
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
                  {route.params.Item.donor[0].toUpperCase()}
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
                  <Text style={{fontWeight: 'bold'}}>Mobile : </Text>
                  {route.params.Item.mobile}
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
                  {route.params.Item.requestdate}
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
                  {route.params.Item.defaultLocation}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Donation Name : </Text>
                  {route.params.Item.name}
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
          <View style={requestDonor.view_3}>
            {
              <TouchableOpacity
                onPress={() => {
                  try{

                    if (!requested) {
                      database()
                        .ref(
                          `/requests/${route.params.username.trim()}/${
                            route.params.Item.id
                          }/status`,
                        )
                        .set('Accepted');
                      database()
                        .ref(
                          `/requests/${route.params.Item.ngo.trim()}/${
                            route.params.Item.id
                          }/status`,
                        )
                        .set("Accepted");
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
                          `/requests/${route.params.username.trim()}/${
                            route.params.Item.id
                          }/status`,
                        )
                        .set("Requested");
                      database()
                        .ref(
                          `/requests/${route.params.Item.ngo.trim()}/${
                            route.params.Item.id
                          }/status`,
                        )
                        .set("Requested");
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
                     

                        database().ref(`/volreq/${route.params.Item.ngo.trim()}`).once('value',(snapshot)=>{
                          if(snapshot.val()){
                            let d1 = Object.values(snapshot.val());
                            d1.forEach((value:any)=>{
                              if(value.pickup.length == 1){
                                database().ref(`/volreq/${route.params.Item.ngo.trim()}/${value.id}`).set(null)
                                database().ref(`/volreq/${value.name.trim()}/${value.id}`).set(null)
                              }
                              else{
                                value.pickup.forEach((d2:any,index:any)=>{
                                  if(d2.id == route.params.Item.id){
                                    database().ref(`/volreq/${route.params.Item.ngo.trim()}/${value.id}/pickup/${index}`).set(null)
                                    database().ref(`/volreq/${value.name.trim()}/${value.id}/pickup/${index}`).set(null)
                                  }
                                })
                              }
                            })

                          }
                        })
                    }
                    setRequested(!requested);
                  }
                  catch(err){
                    console.log(err)
                  }
                }}
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
                  {requested ? 'Cancel' : 'Accept'}
                </Text>
              </TouchableOpacity>
            }
          </View>
        </DropShadow>
      </View>
    </ScrollView>
  );
}

const requestDonor = StyleSheet.create({
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
