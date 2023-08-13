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

export default function DonorNGOVolunteer({navigation,route}: {navigation: any,route:any}) {
    const selectedIndex = React.useRef(new Animated.Value(1)).current;
    const [items, setItems] = React.useState([{id:1,name:"Requests"},{id:2,name:"Accepted"},{id:3,name:"InProgress"},{id:4,name:"Completed"}] );
    let Flatlist = React.useRef<FlatList>(null);

    

    return (
        <ScrollView style={donorngo.ScrollView}>
            <View style={donorngo.ParentView}>
                <View style={donorngo.view_1}>
                <TouchableOpacity style={{justifyContent:"center",paddingVertical:2,flexGrow:4,paddingHorizontal:20}} onPress={()=>{navigation.navigate("Home")}}>
                <Image source={require("./assets/arrow.png")} style={{width:30,height:30,objectFit:"contain"}}/>
        </TouchableOpacity>
        <Text style={{position:"absolute",left:"55%",transform:[{translateX:-windowWidth*0.1,}],fontSize:25,color:"black"}}>
                {route.params.userType}
        </Text>
                </View>
                <View style={donorngo.view_2}>
                <View style={donorngo.TopBar}>
        <View style={donorngo.TopBar_v1}>
          <View >
            <Text style={{color:"black",paddingRight:10}} onPress={()=>{
            Flatlist.current?.scrollToIndex({
                animated:true,
                index:0
              })
            console.log("TT",selectedIndex)
          }}>Requests</Text>
          </View>
          <View >
            <Text style={{color:"black",paddingRight:5}} onPress={()=>{
                 Flatlist.current?.scrollToIndex({
                    animated:true,
                    index:1
                  })
            console.log(selectedIndex)
          }}>Accepted</Text>
          </View>
          <View >
            <Text style={{color:"black",textAlign:"center"}} onPress={()=>{
            Flatlist.current?.scrollToIndex({
                animated:true,
                index:2
              })
            console.log("TT",selectedIndex)
          }}>In Progress</Text>
          </View>
          <View >
            <Text style={{color:"black"}} onPress={()=>{
         Flatlist.current?.scrollToIndex({
            animated:true,
            index:3
          })
            console.log(selectedIndex)
          }}>Completed</Text>
          </View>
        </View>
          <View style={donorngo.TopBar_v2}>
          <Animated.View style={{width:"25%",position:"relative",left:selectedIndex}}><LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={LinearColor} style={{padding: 2,borderRadius:5,width:"100%"}}></LinearGradient></Animated.View>
          </View>
      </View>
                </View>
                <View style={donorngo.view_3}>
                <FlatList
                data={items}
                renderItem={({ item }) => <Slide slideName={item.name} userType={route.params.userType} navigation = {navigation}/>}
                keyExtractor={(item) => String(item.id)}
                snapToAlignment="start"
                decelerationRate={"fast"}
                snapToInterval={Dimensions.get("window").width}
                horizontal
                onScroll={(eve)=>{
                  Animated.timing(selectedIndex, {
                    toValue: eve.nativeEvent.contentOffset.x/4,
                    useNativeDriver: false,
                    duration:10
                  }).start();
                }}
               showsHorizontalScrollIndicator = {false}
               showsVerticalScrollIndicator = {false}
               ref = {Flatlist}
            />
                </View>
               
            </View>
        </ScrollView>
    )
}

const donorngo = StyleSheet.create({
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
      paddingTop:30
    },
    view_3: {
      justifyContent: 'center',
      flex:1
    },
    TopBar : {
        height:40,
      },
      TopBar_v1:{
        flexGrow: 4,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:"#ddd",
        marginHorizontal:5
      },
      TopBar_v2:{
        flexGrow:0.4,
        width:"100%",
        alignSelf:"center",
        justifyContent:"center"
      },
})