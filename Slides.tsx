import { Tab, TabBar } from "@ui-kitten/components";
import React from "react";
import { Button, Dimensions, StyleSheet, View, Text , Image, FlatList} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from 'react-native-drop-shadow';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const  Slide = (props:any):JSX.Element => {

    return (
        <View style={slide.Container}>

        </View>
    );
    
}

export default Slide

const slide = StyleSheet.create({
    Container: {
        backgroundColor: "white",
        flexDirection:"column",
        width:windowWidth,
     }
})