import { Tab, TabBar } from "@ui-kitten/components";
import React from "react";
import { Button, Dimensions, StyleSheet, View, Text , Image, FlatList} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from 'react-native-drop-shadow';
import Card from "./Cards";

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const  Slide = (props:any):JSX.Element => {

    const [items, setItems] = React.useState([{id:1,name:"Requests"},{id:2,name:"Accepted"},{id:3,name:"InProgress"},{id:4,name:"Completed"},{id:5,name:"InProgress"},{id:6,name:"Completed"}] );
    
        

    return (
        <View style={slide.Container}>
            

            <FlatList
                data={items}
                renderItem={({ item }) => (<View style={{alignItems:"center",width:"100%",paddingTop:15}}><Card slideName={props.slideName} userType={props.userType} navigation={props.navigation} Item={item}/></View>)}
                keyExtractor={(item) => String(item.id)}
               showsHorizontalScrollIndicator = {false}
               showsVerticalScrollIndicator = {false}
            />
        </View>
    );
    
}

export default Slide

const slide = StyleSheet.create({
    Container: {
        backgroundColor: "white",
        flexDirection:"column",
        width:windowWidth,
        alignItems:"center",
        paddingTop:0,
     },
    
})