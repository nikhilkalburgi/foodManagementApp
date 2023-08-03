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
                <TouchableOpacity style={{justifyContent:"center",paddingVertical:2,flexGrow:1,paddingHorizontal:20}} onPress={()=>{navigation.navigate("Home")}}>
                <Image source={require("./assets/arrow.png")} style={{width:30,height:30,objectFit:"contain"}}/>
        </TouchableOpacity>

        <Text style={{position:"absolute",left:"45%",transform:[{translateX:-windowWidth*0.1,}],fontSize:25,color:"black"}}>
                Notification
        </Text>
                </View>
                <View style={profile.view_2}>
                    
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
      paddingVertical:30,
      flex:1
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