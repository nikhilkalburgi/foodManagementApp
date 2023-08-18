import { Tab, TabBar } from "@ui-kitten/components";
import React from "react";
import { Button, Dimensions, StyleSheet, View, Text , Image, FlatList} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from 'react-native-drop-shadow';
import Card from "./Cards";
import database from "@react-native-firebase/database"

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const  Slide = (props:any):JSX.Element => {

    const [items, setItems] = React.useState();

    
    
    React.useEffect(()=>{

        console.log(props.slideName,props.userType)
        
        if(props.slideName == "Donations" && props.userType == "Donor"){
            
            database()
    .ref(`/donations/${props.username.trim()}`)
    .on('value', snapshot => {
        if(snapshot.val()){
            let data:any = Object.values(snapshot.val())
            setItems(data)
        }
    });
            database()
            .ref(`/donations/${props.username.trim()}`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
              
            });  
        }else if(props.slideName == "Donations" && props.userType == "NGO"){

            database()
            .ref(`/donations`)
            .on('value', snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
            database()
            .ref(`/donations`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
        }else if(props.slideName == "Donors" && (props.userType == "NGO" || props.userType == "Volunteer")){
            database()
            .ref(`/donors`)
            .on('value', snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
            database()
            .ref(`/donors`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
        }else if(props.slideName == "NGO" && (props.userType == "Donor" || props.userType == "Volunteer")){
            database()
            .ref(`/NGO}`)
            .on('value', snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
            database()
            .ref(`/NGO`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
        }else if(props.slideName == "Volunteer" && (props.userType == "Donor" || props.userType == "NGO")){
            database()
            .ref(`/volunteers`)
            .on('value', snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
            database()
            .ref(`/volunteers`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
        }else if(props.slideName == "Requests" && props.userType == "Donor"){
            database()
            .ref(`/volunteers`)
            .once('value')
            .then(snapshot => {
                if(snapshot.val()){
                    let data:any = Object.values(snapshot.val())
                    setItems(data)
                }
            });
        }else if(props.slideName == "Requests" &&  props.userType == "Volunteer"){
            database()
            .ref(`/volunteers`)
            .once('value')
            .then(snapshot => {
                let data:any = Object.values(snapshot.val())
                if(data){
                    setItems(data)
                }
            });
        }else if(props.slideName == "Requests" && props.userType == "NGO"){
            database()
            .ref(`/volunteers`)
            .once('value')
            .then(snapshot => {
                let data:any = Object.values(snapshot.val())
                if(data){
                    setItems(data)
                }
            });
        }
    },[])
    
    

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