import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor:string[] = ["#FF07E6","#8A6EE5","#13D7E3"]

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface placeStructure {
  donor: boolean , volunteer : boolean , ngo : boolean , foodbank : boolean
}

const LoginScreen = ({navigation}: {navigation: any}): JSX.Element => {

  let [confirmPassword,setConfirmPassword] = useState({toggle : true ,element : <Text style={{height:0}}></Text>});
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [cp,setCP] = useState("");
  let [place , setPlace] = useState({donor: false , volunteer : false , ngo : false , foodbank : false})

  return (<ScrollView style={login.ScrollView} automaticallyAdjustKeyboardInsets={true}>
    <View style={login.ParentView}>
      <View style={login.view_1}>
        <Text style={login.WelcomeTxt}>Welcome To</Text>
      </View>

      <View style={login.view_2}>
        <MaskedView maskElement={<Text style={login.TitleTxt}>Food Management App</Text>}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={LinearColor}>
          <Text style={{textAlign: 'center',fontSize: 30,fontWeight: 'bold',opacity:0}}>Food Management App</Text>
        </LinearGradient>
        </MaskedView>
      </View>
      <View style={login.view_3}>
        <Text style={login.LoginTxt}>Sign In</Text>
      </View>
      <View style={login.view_4}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={LinearColor} style={{padding: 2,width:"95%",borderRadius:5,zIndex:999}}>
        <TextInput onChangeText={(value)=>setUsername(value)}
          inlineImageLeft="username"
          inlineImagePadding={5}
          style={login.Input}
          placeholder=" Username"
        />
        </LinearGradient>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={LinearColor} style={{padding: 2,width:"95%",borderRadius:5,zIndex:999}}>
        <TextInput onChangeText={(value)=>setPassword(value)}
          inlineImageLeft="password"
          inlineImagePadding={5}
          style={login.Input}
          placeholder=" Password"
        />
        </LinearGradient>
        {confirmPassword.element}
      </View>

      <View style={login.view_5}>
        <Text style={login.PlaceTxt}>Select Your Place</Text>
      </View>
      <View style={login.view_6}>
        <View style={login.Option}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={(!place.donor)? ["#ddd","#ddd"]:LinearColor} style={{padding: 0,borderRadius:100,aspectRatio: 1 / 1,margin:'auto'}}>
          <View style={login.OptionIcon} onTouchStart={()=>{
            setPlace( {donor: !place.donor , volunteer : place.volunteer , ngo : place.ngo , foodbank : place.foodbank})
          }}>
            <Image source={require('./assets/donor.png')} style={{width:"70%"}} />
          </View>
      </LinearGradient>
          <Text style={login.OptionTxt}>Donor</Text>
        </View>

        <View style={login.Option}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={(!place.volunteer)? ["#ddd","#ddd"]:LinearColor} style={{padding: 0,borderRadius:100,aspectRatio: 1 / 1,margin:'auto'}}>
          <View style={login.OptionIcon} onTouchStart={()=>{
            setPlace( {donor: place.donor , volunteer : !place.volunteer , ngo : place.ngo , foodbank : place.foodbank})
          }}>
          <Image source={require('./assets/volunteer.png')} style={{width:"70%"}} />
          </View>
      </LinearGradient>
          <Text style={login.OptionTxt}>Volunteer</Text>
        </View>

        <View style={login.Option}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={(!place.ngo)? ["#ddd","#ddd"]:LinearColor} style={{padding: 0,borderRadius:100,aspectRatio: 1 / 1,margin:'auto'}}>
          <View style={{...login.OptionIcon}} onTouchStart={()=>{
            setPlace( {donor: place.donor , volunteer : place.volunteer , ngo : !place.ngo , foodbank : place.foodbank})
          }}>
          <Image source={require('./assets/ngo.png')} style={{width:"70%"}} />
          </View>
      </LinearGradient>
          <Text style={login.OptionTxt}>NGO</Text>
        </View>

        <View style={login.Option}>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={(!place.foodbank)? ["#ddd","#ddd"]:LinearColor} style={{padding: 0,borderRadius:100,aspectRatio: 1 / 1,margin:'auto'}}>
          <View style={login.OptionIcon} onTouchStart={()=>{
            setPlace( {donor: place.donor , volunteer : place.volunteer , ngo : place.ngo , foodbank : !place.foodbank})
          }}>
          <Image source={require('./assets/bank.png')} style={{width:"70%"}} />
          </View>
      </LinearGradient>
          <Text style={login.OptionTxt}>FoodBank</Text>
        </View>
      </View>
      <View style={login.view_7}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={LinearColor} style={{width:"75%",borderRadius:5,zIndex:999}}>

        <Button style={login.LoginBtn} size="giant" onPress={()=>{
          if(confirmPassword.toggle){
            if(username && password){
              if(!(username.trim().match((/[^a-zA-Z0-9\s]/g)) || password.trim().match((/[^a-zA-Z0-9@#\s]/g)))){
                setUsername(username.trim())
                setPassword(password.trim())
                navigation.navigate('Home')
              }
            }
          }else{
            if(username && password && cp){
              if(!(username.trim().match((/[^a-zA-Z0-9\s]/g)) || password.trim().match((/[^a-zA-Z0-9@#\s]/g) || cp.trim().match((/[^a-zA-Z0-9@#\s]/g))))){
                setUsername(username.trim())
                setPassword(password.trim())
                setCP(cp.trim())
                navigation.navigate('Home')
              }
            }
          }
          }}>
          {(confirmPassword.toggle)? "Login In" : "Sign Up"}
        </Button>
        </LinearGradient>
      </View>
      <View style={login.view_8}>
        <Text style={{textAlign: 'center', width: '100%'}}>
          <Text>Don't Have An Account? </Text>
          <Text style={{color: '#8A6EE5'}}
           onPress={()=>{
            LayoutAnimation.configureNext({
              duration: 300,
              create: {type: 'linear', property: 'scaleY'},
              update: {type: 'linear', property: 'scaleY'},
              delete: {type: 'linear', property: 'scaleY'},
            });
            (confirmPassword.toggle)? 
            (setConfirmPassword({
              toggle : false,
             element : <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={LinearColor} style={{padding: 2,width:"95%",borderRadius:5,zIndex:999}}>
              <TextInput onChangeText={(value)=>setCP(value)}
                inlineImageLeft="search_icon.png"
                inlineImagePadding={5}
                style={login.Input}
                placeholder=" Confirm Password"
              />
              </LinearGradient>
            }
            )) : (setConfirmPassword({
              toggle : true,
             element : <Text style={{height:0}}></Text>
            }
            ))
           }}
          >{(confirmPassword.toggle)? "Sign Up":"Sign In"}</Text>
        </Text>
      </View>
    </View>
  </ScrollView>
);
  }

const login = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white',
  },
  ParentView: {
    flex: 1,
    height: windowHeight,
  },
  view_1: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  view_2: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  view_3: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  view_4: {
    flexGrow: 3.5,
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  },
  view_5: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  view_6: {
    flex: 1,
    flexDirection: 'row',
    flexGrow: 5,
    justifyContent: 'center',
    padding: 5,
  },
  view_7: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_8: {
    flexGrow: 4,
  },
  WelcomeTxt: {
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  TitleTxt: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent'
  },
  LoginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  PlaceTxt: {
    paddingLeft: 30,
  },
  Option: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding:10
  },
  OptionTxt: {
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
  },
  OptionIcon: {
    flex: 1,
    flexGrow: 3,
    borderRadius: 100,
    margin: 10,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    backgroundColor:"white",
    justifyContent:"center"
  },
  LoginBtn: {
    backgroundColor:"transparent",
    borderWidth:0
  },
  Footer: {
    flex: 1,
  },
  Input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
    borderRadius:5
  },
});

export default LoginScreen;
