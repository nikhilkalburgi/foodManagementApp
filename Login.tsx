import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, Text, Button} from '@ui-kitten/components';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const LoginScreen = (): JSX.Element => (
  <ScrollView style={login.ScrollView} automaticallyAdjustKeyboardInsets={true}>
    <View style={login.ParentView}>
      <View style={login.view_1}>
        <Text style={login.WelcomeTxt}>Welcome To</Text>
      </View>
      <View style={login.view_2}>
        <Text style={login.TitleTxt}>Food Management App</Text>
      </View>
      <View style={login.view_3}>
        <Text style={login.LoginTxt}>Sign In</Text>
      </View>
      <View style={login.view_4}>
        <TextInput
          inlineImageLeft="search_icon.png"
          inlineImagePadding={5}
          style={login.Input}
          placeholder=" Username"
        />
        <TextInput
          inlineImageLeft="search_icon.png"
          inlineImagePadding={5}
          style={login.Input}
          placeholder=" Password"
        />
      </View>
      <View style={login.view_5}>
        <Text style={login.PlaceTxt}>Select Your Place</Text>
      </View>
      <View style={login.view_6}>
        <View style={login.Option}>
          <View style={login.OptionIcon}></View>
          <Text style={login.OptionTxt}>Donor</Text>
        </View>
        <View style={login.Option}>
          <View style={login.OptionIcon}></View>
          <Text style={login.OptionTxt}>Volunteer</Text>
        </View>
        <View style={login.Option}>
          <View style={login.OptionIcon}></View>
          <Text style={login.OptionTxt}>Organization</Text>
        </View>
        <View style={login.Option}>
          <View style={login.OptionIcon}></View>
          <Text style={login.OptionTxt}>Food Bank</Text>
        </View>
      </View>
      <View style={login.view_7}>
        <Button style={login.LoginBtn} size="giant">
          Login In
        </Button>
      </View>
      <View style={login.view_8}>
        <Text style={{textAlign: 'center', width: '100%'}}>
          <Text>Don't Have An Account? </Text>
          <Text style={{color: 'green'}}>Sign Up</Text>
        </Text>
      </View>
    </View>
  </ScrollView>
);

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
    justifyContent: 'center',
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
    flexGrow: 3,
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
    flexGrow: 4,
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
  },
  OptionTxt: {
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
  },
  OptionIcon: {
    flex: 1,
    flexGrow: 3,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 100,
    margin: 10,
    aspectRatio: 1 / 1,
    alignItems: 'center',
  },
  LoginBtn: {
    width: '75%',
  },
  Footer: {
    flex: 1,
    borderWidth: 1,
  },
  Input: {
    width: '95%',
    height: 50,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
  },
});

export default LoginScreen;
