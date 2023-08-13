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

export default function RequestDonor({
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
    <ScrollView style={requestDonor.ScrollView}>
      <View style={requestDonor.ParentView}>
        <View style={requestDonor.view_1}>
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
        </View>
        <View style={requestDonor.view_2}>
          <View style={{height: windowHeight * 0.8 * 0.3,}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop:20
              }}>
              <Image
                source={require('./assets/bank.png')}
                style={{
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: 'black',
                  width: windowWidth * 0.3,
                  height: windowWidth * 0.3,
                  marginBottom:10
                }}
              />
              <Text numberOfLines={2} style={{fontSize:25,color:"black"}}>Nikhil S Kalburgi</Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>

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


        <DropShadow
        style={{
          shadowColor: 'black',
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
        >

        <View style={requestDonor.view_3}>{

         
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
    paddingVertical:10,
    width:"100%",
    backgroundColor:"white",
    justifyContent:"center"
  },
});
