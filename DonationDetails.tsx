import {Tab, TabBar, Button, Input} from '@ui-kitten/components';
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
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';
import {useRoute} from '@react-navigation/native';
import Slide from './Slides';
import MaskedView from '@react-native-masked-view/masked-view';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

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
  const [requested,setRequested] = React.useState(false)
  let Flatlist = React.useRef<FlatList>(null);

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
              navigation.navigate('Home');
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
              flexGrow:1,
              verticalAlign:"middle"
            }}>
            {route.params.userType}
          </Text>
          <View style={{justifyContent:"center",flexDirection:"row"}}>
          <View style={{borderWidth:10,padding:2,justifyContent:"center",alignItems:"center",borderLeftColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",borderBottomColor:"black",position:"relative",top:-10}} >
                    <View style={{borderWidth:10,justifyContent:"center",alignItems:"center",borderLeftColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",borderBottomColor:"black"}}></View>
                        </View>
                     <View style={{margin:5}}>
                      <Text style={{fontSize:10}}>Status</Text>
                        <Text style={{fontSize:15}}>Available</Text>
                      </View>   

          </View>
        </View>
        <View style={donationdetails.view_2}>
          <View style={{height: windowHeight * 0.8 * 0.3,}}>
            <Image
              source={require('./assets/bank.png')}
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
              <Image
                source={require('./assets/bank.png')}
                style={{
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: 'black',
                  width: windowWidth * 0.25,
                  height: windowWidth * 0.25,
                }}
              />
              <Text numberOfLines={2}>Nikhil S Kalburgi</Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                height:windowHeight*0.1
              }}>
              <Text
                style={{
                  width: '70%',
                  fontSize: 25,
                  paddingLeft: 15,
                  color: 'black',
                }} numberOfLines={1}>
                Food Name
              </Text>
            </View>

              <View
                style={{
                  margin: 'auto',
                  borderRadius: 10,
                  width: windowWidth-30,
                  marginHorizontal: 10,
                  marginVertical: 10,
                  backgroundColor: 'white',
                  padding: 10,
                  height:windowHeight*0.44,
                  borderWidth:StyleSheet.hairlineWidth
                }}>
                  <ScrollView>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, padding: 5,flexGrow:1}}
                    numberOfLines={1}>
                    <Text style={{fontWeight: 'bold'}}>Food Type : </Text>Hello
                    World
                  </Text>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, padding: 5,flexGrow:1}}
                    numberOfLines={1}>
                    <Text style={{fontWeight: 'bold'}}>Date : </Text>Hello World
                  </Text>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, padding: 5,flexGrow:1}}
                    numberOfLines={1}>
                    <Text style={{fontWeight: 'bold'}}>Location : </Text>Hello
                    World
                  </Text>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, padding: 5,flexGrow:1}}
                    numberOfLines={1}>
                    <Text style={{fontWeight: 'bold'}}>Expires On : </Text>Hello
                    World
                  </Text>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, padding: 5,flexGrow:1}}
                    numberOfLines={1}>
                    <Text style={{fontWeight: 'bold'}}>Weight : </Text>Hello
                    World
                  </Text>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, padding: 5,flexGrow:1}}
                    >
                    <Text style={{fontWeight: 'bold'}}>Note : </Text>Hello World Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                  </Text>
                </ScrollView>
              </View>
          </View>
        </View>

        {(route.params.slideName == "Donations")? (

        <DropShadow
        style={{
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        >

        <View style={{...donationdetails.view_3,justifyContent:(route.params.userType == "Donor")?"space-between":"center"}}>{

          (route.params.userType == "Donor")?(
          <>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'orange',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <View style={{padding: 5,height:windowHeight*0.055,justifyContent:"center",alignItems:"center"}}>
                <Image source={require('./assets/edit.png')} />
              </View>
              <Text style={{textAlign: 'center',padding:5}}>EDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: 'red',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <View style={{ padding: 5,height:windowHeight*0.055,justifyContent:"center",alignItems:"center"}}>
                <Image source={require('./assets/Delete.png')} />
              </View>
              <Text style={{ textAlign: 'center',padding:5}}>DELETE</Text>
            </TouchableOpacity>
          </>
          ): (
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'green',
              width: '50%',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              overflow: 'hidden',
              padding:5
            }} onPress={()=>{
              setRequested(!requested)
            }}>
            <View style={{flexGrow: 1, padding: 5}}>
              <Image source={(requested)?require('./assets/cancel.png'):require('./assets/request.png')} />
            </View>
            <Text style={{flexGrow: 1, textAlign: 'center'}}>{(requested)?"Cancel":"Request"}</Text>
          </TouchableOpacity>
          )
        }
        </View>
        </DropShadow>
        ):null}
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
    paddingVertical:10,
    width:"100%",
    backgroundColor:"white"
  },
});
