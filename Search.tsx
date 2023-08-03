import { Tab, TabBar , Button, Input } from "@ui-kitten/components";
import React from "react";
import { Dimensions, StyleSheet, View, Text , Image, FlatList, Animated, TouchableOpacity, ScrollView, TextInput} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from 'react-native-drop-shadow';
import { useRoute } from '@react-navigation/native';
import Slide from './Slides'
import MaskedView from "@react-native-masked-view/masked-view";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor:string[] = ["#FF07E6","#13D7E3"]

export default function ProfileScreen({navigation,route}: {navigation: any,route:any}) {
    const [searchItem,setSearchItem] = React.useState("");
    return (
        <ScrollView style={search.ScrollView}>
            <View style={search.ParentView}>
                <View style={search.view_1}>
                <TouchableOpacity style={{justifyContent:"center",paddingVertical:2,flexGrow:4,paddingHorizontal:20}} onPress={()=>{navigation.navigate("Home")}}>
                <Image source={require("./assets/arrow.png")} style={{width:30,height:30,objectFit:"contain"}}/>
        </TouchableOpacity>
                </View>
                <View style={search.view_2}>
                <TextInput
              onChangeText={value => setSearchItem(value)}
              inlineImageLeft="username"
              inlineImagePadding={50}
              style={search.Input}
              placeholder="Search NGO, Food Name, Volunteer etc... "
            />
                </View>
                <View style={search.view_3}>
                    
                </View>
                
            </View>
        </ScrollView>
    )
}

const search = StyleSheet.create({
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
      borderWidth:1
    },
    view_3: {
      borderWidth:1,
      flex:1 ,
      backgroundColor:"red" 
    }, 
  Input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    fontSize: 15,
    borderRadius: 5,
    width:"90%"
  }
})