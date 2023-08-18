import { Tab, TabBar } from "@ui-kitten/components";
import React from "react";
import { Button, Dimensions, StyleSheet, View, Text , Image, FlatList, TouchableOpacity} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DropShadow from 'react-native-drop-shadow';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Donations = (props:any):JSX.Element => {
    console.log(props.slideName," HH")
    return (
        <DropShadow style={{shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.2,
        shadowRadius:5,}}>
                <View style={slide.Card} onTouchEnd={()=>props.navigation.navigate("DonationDetails",{userType:props.userType,slideName:props.slideName})}>

                <View style={{borderRightWidth:StyleSheet.hairlineWidth,width:"30%",borderColor:"#ddd"}}>
                    <Image source={require('./assets/bank.png')} style={{width:"100%",height:"100%",resizeMode:'contain'}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={slide.CardAbsoluteBottom}>
                    <View style={{borderWidth:5,padding:2,justifyContent:"center",alignItems:"center",borderLeftColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",borderBottomColor:"black"}} >
                    <View style={{borderWidth:5,justifyContent:"center",alignItems:"center",borderLeftColor:"transparent",borderTopColor:"transparent",borderRightColor:"transparent",borderBottomColor:"black"}}></View>
                        </View>
                    </View>
                    <View style={slide.CardBody}>
                        <View style={slide.CardBodyTitle}><Text style={{fontWeight:"bold"}}>{props.Item.name}</Text></View>
                        <View style={slide.CardBodyContent}>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>donor : </Text>{props.Item.name}</Text>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                        </View>
                    </View>
                </View>
                </View>
            </DropShadow>
    )
}

const NGO = (props:any):JSX.Element => {
    return (
        <DropShadow style={{shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.2,
        shadowRadius:5,}}>
                <View style={slide.Card} onTouchEnd={()=>props.navigation.navigate("DonationDetails",{userType:props.userType,slideName:props.slideName})}>

                <View style={{borderRightWidth:StyleSheet.hairlineWidth,width:"30%",borderColor:"#ddd"}}>
                    <Image source={require('./assets/ngo.png')} style={{width:"100%",height:"100%",resizeMode:'contain'}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={slide.CardBody}>
                        <View style={slide.CardBodyTitle}><Text style={{fontWeight:"bold"}}>{props.Item.name}</Text></View>
                        <View style={slide.CardBodyContent}>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                        </View>
                    </View>
                </View>
                </View>
            </DropShadow>
    )
}

const RequestVolunteer = (props:any):JSX.Element => {
    return (
        <DropShadow style={{shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.2,
        shadowRadius:5,}}>
                <View style={slide.Card} onTouchEnd={()=>props.navigation.navigate("RequestVolunteer",{userType:props.userType,slideName:props.slideName})}>

                <View style={{borderRightWidth:StyleSheet.hairlineWidth,width:"30%",borderColor:"#ddd"}}>
                    <Image source={require('./assets/ngo.png')} style={{width:"100%",height:"100%",resizeMode:'contain'}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={slide.CardBody}>
                        <View style={slide.CardBodyTitle}><Text style={{fontWeight:"bold"}}>{props.Item.name}</Text></View>
                        <View style={slide.CardBodyContent}>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                        </View>
                    </View>
                </View>
                </View>
            </DropShadow>
    )
}

const RequestDonor = (props:any):JSX.Element => {
    return (
        <DropShadow style={{shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.2,
        shadowRadius:5,}}>
                <View style={slide.Card} onTouchEnd={()=>props.navigation.navigate("RequestDonor",{userType:props.userType,slideName:props.slideName})}>

                <View style={{borderRightWidth:StyleSheet.hairlineWidth,width:"30%",borderColor:"#ddd"}}>
                    <Image source={require('./assets/ngo.png')} style={{width:"100%",height:"100%",resizeMode:'contain'}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={slide.CardBody}>
                        <View style={slide.CardBodyTitle}><Text style={{fontWeight:"bold"}}>{props.Item.name}</Text></View>
                        <View style={slide.CardBodyContent}>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                        </View>
                    </View>
                </View>
                </View>
            </DropShadow>
    )
}

const Donors = (props:any):JSX.Element => {
    return (
        <DropShadow style={{shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.2,
        shadowRadius:5,}}>
                <View style={slide.Card} onTouchEnd={()=>props.navigation.navigate("DonationDetails",{userType:props.userType,slideName:props.slideName})}>

                <View style={{borderRightWidth:StyleSheet.hairlineWidth,width:"30%",borderColor:"#ddd"}}>
                    <Image source={require('./assets/donor.png')} style={{width:"100%",height:"100%",resizeMode:'contain'}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={slide.CardBody}>
                        <View style={slide.CardBodyTitle}><Text style={{fontWeight:"bold"}}>{props.Item.name}</Text></View>
                        <View style={slide.CardBodyContent}>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                        </View>
                    </View>
                </View>
                </View>
            </DropShadow>
    )
}


const Volunteers = (props:any):JSX.Element => {
    const [requested,setRequested] = React.useState(false)
    return (
        <DropShadow style={{shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity:0.2,
        shadowRadius:5,}}>
                <View style={slide.Card}>
                <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'green',
              width: '30%',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              overflow: 'hidden',
              padding:5,
              position:"absolute",
              bottom:10,
              right:10
            }} onPress={()=>{
              setRequested(!requested)
            }}>
            <Text style={{flexGrow: 1, textAlign: 'center'}}>{(requested)?"Cancel":"Request"}</Text>
          </TouchableOpacity>
                <View style={{borderRightWidth:StyleSheet.hairlineWidth,width:"30%",borderColor:"#ddd"}}>
                    <Image source={require('./assets/donor.png')} style={{width:"100%",height:"100%",resizeMode:'contain'}}/>
                </View>
                <View style={{width:"70%"}}>
                    <View style={slide.CardBody}>
                        <View style={slide.CardBodyTitle}><Text style={{fontWeight:"bold"}}>{props.Item.name}</Text></View>
                        <View style={slide.CardBodyContent}>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                            <Text style={{fontSize:10,lineHeight:18}} numberOfLines={1}><Text style={{fontWeight:"bold"}}>ABc : </Text>Hello World</Text>
                        </View>
                    </View>
                </View>
                </View>
            </DropShadow>
    )
}

const  Card = (props:any):JSX.Element => {
    let element = <></>;
        if(props.slideName == "Donations"){
           element =  <Donations Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
    }else if(props.slideName == "NGO"){
       element =  <NGO Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
    }else if(props.slideName == "Donors"){
       element =  <Donors Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
    }else if(props.slideName == "Volunteers"){
      element =  <Volunteers Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
    }else if(props.slideName == "Requests"){
        if(props.userType == "Donor"){
          element =   <RequestDonor Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
        }else if(props.userType == "NGO"){
          element =   <Donations Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
        }else if(props.userType ==  "Volunteer"){
          element =   <RequestVolunteer Item = {props.Item} slideName={props.slideName} userType={props.userType} navigation={props.navigation}/>
        }
    }else if(props.slideName == "Accepted"){

    }else if(props.slideName == "InProgress"){

    }else if(props.slideName == "Completed"){

    }

    
    return element;
}

export default Card

const slide = StyleSheet.create({
     Card:{
        height:100,
        backgroundColor:"white",
        width:"92%",
        marginHorizontal:"auto",
        borderRadius:5,
    
        flexDirection:"row",
        overflow:"hidden",
        marginBottom:10,
        paddingTop:5,
     },
     CardAbsoluteBottom:{
        position:"absolute",
        bottom:10,
        right:10,
     },
     CardBody:{
        width:"90%",
        marginTop:5,
        height:95
     },
     CardBodyTitle:{
        paddingLeft:10,
        flexGrow:0.1
     },
     CardBodyContent:{
        paddingLeft:10,
        flexGrow:1
     }
})