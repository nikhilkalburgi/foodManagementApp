import { Tab, TabBar , Button, Input } from "@ui-kitten/components";
import React from "react";
import { Dimensions, StyleSheet, View, Text , Image, FlatList, Animated, TouchableOpacity, ScrollView} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from 'react-native-drop-shadow';
import { useRoute } from '@react-navigation/native';
import Slide from './Slides'
import MaskedView from "@react-native-masked-view/masked-view";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor:string[] = ["#FF07E6","#13D7E3"]

export default function ProfileScreen({navigation,route}: {navigation: any,route:any}) {
    return (
        <ScrollView style={profile.ScrollView}>
            <View style={profile.ParentView}>
                <View style={profile.view_1}>
                <TouchableOpacity style={{justifyContent:"center",paddingVertical:2,flexGrow:4,paddingHorizontal:20}} onPress={()=>{navigation.navigate("Home")}}>
                <Image source={require("./assets/arrow.png")} style={{width:30,height:30,objectFit:"contain"}}/>
        </TouchableOpacity>

        <TouchableOpacity style={{justifyContent:"center",alignItems:"flex-end",paddingVertical:2,paddingHorizontal:20}} onPress={()=>{navigation.navigate("EditProfile")}}>
                <Image source={require("./assets/edit.png")} style={{width:30,height:30,objectFit:"contain"}}/>
        </TouchableOpacity>
                </View>
                <View style={profile.view_2}>
                    <View style={profile.ProfileImage}></View>
                </View>
                <View style={profile.view_3}>
                    <View>
                        <Text style={{fontSize:25,color:"black",fontWeight:"bold"}}>Name</Text>
                    </View>
                    <View>
                        <Text>Role</Text>
                    </View>
                </View>
                <View style={profile.view_4}>
                <Input
      label='Default Location'
      placeholder='Your Loction' disabled={true}
    />
    <Input
      label='Mobile'
      placeholder='Your Mobile Number' disabled={true}
    />
    <Input
      label='Passward'
      placeholder='Your Password' disabled={true}
    />
                </View>
                <View style={profile.view_5}>
                <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={LinearColor}
            style={{
              width: '75%',
              borderRadius: 5,
              zIndex: 999,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity style={{backgroundColor:"transparent",borderWidth:0,paddingVertical:15}}>
              <Animated.Text style={{color:"white",textAlign:"center",fontWeight:"bold"}}>
                Logout
              </Animated.Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={["#FF0303","#F66262"]}
            style={{
              width: '75%',
              borderRadius: 5,
              zIndex: 999,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              backgroundColor: 'white',
              marginTop:20
            }}>
            <TouchableOpacity style={{backgroundColor:"transparent",borderWidth:0,paddingVertical:15}}>
              <Animated.Text style={{color:"white",textAlign:"center",fontWeight:"bold"}}>
                Delete Account
              </Animated.Text>
            </TouchableOpacity>
          </LinearGradient>
                </View>
            </View>
        </ScrollView>
    )
}

const profile = StyleSheet.create({
    ScrollView: {
      backgroundColor: 'white',
    },
    ParentView: {
      flex: 1,
      height: windowHeight,
    },
    view_1: {
      justifyContent: 'flex-end',
      flexDirection:"row",
      marginTop:20
    },
    view_2: {
      justifyContent: 'center',
      alignItems:"center",
      paddingVertical:30
    },
    view_3: {
      justifyContent: 'center',
      alignItems:"center"
    },
    view_4: {
      flexGrow: 1,
      alignItems:"center",
      padding:20,
      justifyContent:"space-around"
    },
    view_5: {
      flexGrow: 1,
      alignItems:"center",
      justifyContent:"center"
    },
    ProfileImage: {
        borderRadius:100,
        elevation:5,
        width:"30%",
        aspectRatio:1,
        backgroundColor:"white"
    }
})