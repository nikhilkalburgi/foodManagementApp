import React, {useState} from 'react';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  Text,
  Button,
  Spinner,
} from '@ui-kitten/components';
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
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import {firebase} from './android/app/src/firebase/config.js';
import database from '@react-native-firebase/database';
import EncryptedStorage from 'react-native-encrypted-storage';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#8A6EE5', '#13D7E3'];
let currentRole: string = '';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
async function storeUserSession(username: string, place: any) {
  try {
    await EncryptedStorage.removeItem('user_session');
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        username,
        place,
      }),
    );

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

const LoginScreen = ({navigation}: {navigation: any}): JSX.Element => {
  let [confirmPassword, setConfirmPassword] = useState({
    toggle: true,
    element: <Text style={{height: 0}}></Text>,
  });
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [cp, setCP] = useState('');
  let [place, setPlace] = useState({
    donor: false,
    volunteer: false,
    ngo: false,
  });

  const SignBtnScreenTxtOpacity = React.useRef(new Animated.Value(1)).current;
  const [loginBtnDisable, setLoginBtndisable] = React.useState(false);

  React.useEffect(() => {
    SignBtnScreenTxtOpacity.setValue(0);
    Animated.timing(SignBtnScreenTxtOpacity, {
      toValue: 1,
      useNativeDriver: true,
      duration: 400,
    }).start();
  }, [confirmPassword]);

  return (
    <ScrollView
      style={login.ScrollView}
      automaticallyAdjustKeyboardInsets={true}>
      <View style={login.ParentView}>
        {loginBtnDisable ? (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 999,
              justifyContent: 'center',
              alignItems: 'center',
              width: windowWidth,
              height: windowHeight,
              backgroundColor: 'rgba(255,255,255,0.8)',
            }}>
            <Spinner size="giant" status="info" />
          </View>
        ) : null}

        <View style={login.view_1}>
          <Text style={login.WelcomeTxt}>Welcome To</Text>
        </View>

        <View style={login.view_2}>
          <MaskedView
            maskElement={
              <Text style={login.TitleTxt}>Food Management App</Text>
            }>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={LinearColor}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 'bold',
                  opacity: 0,
                }}>
                Food Management App
              </Text>
            </LinearGradient>
          </MaskedView>
        </View>
        <View style={login.view_3}>
          <Text style={login.LoginTxt}>Sign In</Text>
        </View>
        <View style={login.view_4}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={LinearColor}
            style={{
              padding: 2,
              width: '95%',
              borderRadius: 5,
              zIndex: 998,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              backgroundColor: 'white',
            }}>
            <TextInput
              onChangeText={value => setUsername(value)}
              inlineImageLeft="username"
              inlineImagePadding={50}
              style={login.Input}
              placeholder=" Username"
            />
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={LinearColor}
            style={{
              padding: 2,
              width: '95%',
              borderRadius: 5,
              zIndex: 998,
              elevation: 5,
              shadowColor: 'black',
              shadowOffset: {width: 20, height: 20},
              shadowOpacity: 1,
              backgroundColor: 'white',
            }}>
            <TextInput
              onChangeText={value => setPassword(value)}
              inlineImageLeft="password"
              inlineImagePadding={50}
              style={login.Input}
              placeholder=" Password"
              secureTextEntry={true}
            />
          </LinearGradient>
          {confirmPassword.element}
        </View>

        <View style={login.view_5}>
          <Animated.Text
            style={[login.PlaceTxt, {opacity: SignBtnScreenTxtOpacity}]}>
            {confirmPassword.toggle
              ? 'Select Your Role'
              : 'Select Any Number Of Roles'}
          </Animated.Text>
        </View>
        <View style={[login.view_6]}>
          <Animated.View
            style={{
              width: '100%',
              position: 'absolute',
              height: windowHeight * 0.2,
              backgroundColor: 'white',
              top: 0,
              zIndex: SignBtnScreenTxtOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [999, -1],
              }),
              opacity: SignBtnScreenTxtOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}></Animated.View>
          <Animated.View style={[login.Option]}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={!place.donor ? ['white', 'white'] : LinearColor}
              style={{
                ...login.PlaceColor,
                borderRadius: confirmPassword.toggle ? 100 : 5,
              }}>
              <View
                style={{
                  ...login.OptionIcon,
                  borderRadius: confirmPassword.toggle ? 100 : 5,
                  borderWidth: 1,
                  paddingRight:3
                }}
                onTouchStart={() => {
                  if (confirmPassword.toggle) {
                    setPlace({
                      donor: !place.donor,
                      volunteer: false,
                      ngo: false,
                    });
                  } else {
                    setPlace({
                      donor: !place.donor,
                      volunteer: place.volunteer,
                      ngo: place.ngo,
                    });
                  }
                }}>
                <Image
                  source={require('./assets/donor.png')}
                  style={{width: '50%'}}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
            <Text style={login.OptionTxt}>Donor</Text>
          </Animated.View>

          <View style={login.Option}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={!place.volunteer ? ['white', 'white'] : LinearColor}
              style={{
                ...login.PlaceColor,
                borderRadius: confirmPassword.toggle ? 100 : 5,
              }}>
              <View
                style={{
                  ...login.OptionIcon,
                  borderRadius: confirmPassword.toggle ? 100 : 5,
                  borderWidth: 1,
                }}
                onTouchStart={() => {
                  if (confirmPassword.toggle) {
                    setPlace({
                      donor: false,
                      volunteer: !place.volunteer,
                      ngo: false,
                    });
                  } else {
                    setPlace({
                      donor: place.donor,
                      volunteer: !place.volunteer,
                      ngo: place.ngo,
                    });
                  }
                }}>
                <Image
                  source={require('./assets/volunteer.png')}
                  style={{width: '50%'}}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
            <Text style={login.OptionTxt}>Volunteer</Text>
          </View>

          <View style={login.Option}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={!place.ngo ? ['white', 'white'] : LinearColor}
              style={{
                ...login.PlaceColor,
                borderRadius: confirmPassword.toggle ? 100 : 5,
              }}>
              <View
                style={{
                  ...login.OptionIcon,
                  borderRadius: confirmPassword.toggle ? 100 : 5,
                  borderWidth: 1,
                }}
                onTouchStart={() => {
                  if (confirmPassword.toggle) {
                    setPlace({
                      donor: false,
                      volunteer: false,
                      ngo: !place.ngo,
                    });
                  } else {
                    setPlace({
                      donor: place.donor,
                      volunteer: place.volunteer,
                      ngo: !place.ngo,
                    });
                  }
                }}>
                <Image
                  source={require('./assets/ngo.png')}
                  style={{width: '60%'}}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
            <Text style={login.OptionTxt}>NGO</Text>
          </View>
        </View>
        <View style={login.view_7}>
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
            <Button
              disabled={loginBtnDisable}
              style={login.LoginBtn}
              size="giant"
              onPress={() => {
                try {
                  setLoginBtndisable(true);
                  if (confirmPassword.toggle) {
                    if (
                      username &&
                      password &&
                      (place.donor || place.ngo || place.volunteer)
                    ) {
                      if (
                        !(
                          username.trim().match(/[^a-zA-Z0-9\s]/g) ||
                          password.match(/[^a-zA-Z0-9@#\s]/g)
                        )
                      ) {
                        setUsername(username.trim());
                        if (place.donor) {
                          currentRole = 'D';
                        } else if (place.ngo) {
                          currentRole = 'N';
                        } else {
                          currentRole = 'V';
                        }
                        database()
                          .ref(`/users/${username.trim()}`)
                          .once('value')
                          .then(snapshot => {
                            let user = snapshot.val();

                            if (
                              user &&
                              user.password == password &&
                              user.role.split('').indexOf(currentRole) > -1
                            ) {
                              setLoginBtndisable(false);
                              storeUserSession(username.trim(), place);
                              database()
                                .ref(`/users/${username.trim()}/authenticated`)
                                .set(true);
                              navigation.navigate('Home', {
                                place,
                                username,
                                password,
                                user,
                              });
                            } else {
                              setLoginBtndisable(false);
                              if (!user) {
                                Alert.alert('Unsuccessfull!', 'Please Sign Up');
                                return;
                              }
                              if (user.password !== password) {
                                Alert.alert('Unsuccessfull!', 'Invalid Password');
                              } else if (
                                user.role.split('').indexOf(currentRole) == -1
                              ) {
                                Alert.alert('Unsuccessfull!', 'Invalid role');
                              } else {
                                Alert.alert('Unsuccessfull!', 'Please Sign Up');
                              }
                            }
                          });
                      } else {
                        Alert.alert('Unsuccessfull!', 'Invalid Input');
                        setLoginBtndisable(false);
                      }
                    } else {
                      Alert.alert('Unsuccessfull!', 'Incomplete Input');
                      setLoginBtndisable(false);
                    }
                  } else {
                    if (
                      username &&
                      password &&
                      cp &&
                      (place.donor || place.ngo || place.volunteer)
                    ) {
                      if (
                        !(
                          username.trim().match(/[^a-zA-Z0-9\s]/g) ||
                          password.match(
                            /[^a-zA-Z0-9@#\s]/g ||
                              cp.trim().match(/[^a-zA-Z0-9@#\s]/g),
                          )
                        )
                      ) {
                        setUsername(username.trim());
                        currentRole = '';
                        if (password == cp) {
                          if (place.donor) {
                            currentRole += 'D';
                          }
                          if (place.ngo) {
                            currentRole += 'N';
                          }
                          if (place.volunteer) {
                            currentRole += 'V';
                          }

                          database()
                            .ref(`/users/${username}`)
                            .once('value')
                            .then(snapshot => {
                              if (!snapshot.val()) {
                                database()
                                  .ref(`/users/${username.trim()}`)
                                  .set({
                                    name: username.trim(),
                                    password: password,
                                    role: currentRole,
                                    mobile: '',
                                    location: '',
                                    authenticated: false,
                                    id: Date.now(),
                                  })
                                  .then(() => {
                                    LayoutAnimation.configureNext({
                                      duration: 100,
                                      create: {
                                        type: 'linear',
                                        property: 'scaleY',
                                      },
                                      update: {
                                        type: 'linear',
                                        property: 'scaleY',
                                      },
                                      delete: {
                                        type: 'linear',
                                        property: 'scaleY',
                                      },
                                    });
                                    if (confirmPassword.toggle) {
                                      setConfirmPassword({
                                        toggle: false,
                                        element: (
                                          <LinearGradient
                                            start={{x: 0, y: 0}}
                                            end={{x: 1, y: 0}}
                                            colors={LinearColor}
                                            style={{
                                              padding: 2,
                                              width: '95%',
                                              borderRadius: 5,
                                              zIndex: 998,
                                              elevation: 5,
                                              shadowColor: 'black',
                                              shadowOffset: {
                                                width: 20,
                                                height: 20,
                                              },
                                              shadowOpacity: 1,
                                              backgroundColor: 'white',
                                            }}>
                                            <TextInput
                                              onChangeText={value =>
                                                setCP(value)
                                              }
                                              inlineImageLeft="password"
                                              inlineImagePadding={50}
                                              style={login.Input}
                                              placeholder=" Confirm Password"
                                            />
                                          </LinearGradient>
                                        ),
                                      });
                                    } else {
                                      setPlace({
                                        donor: false,
                                        volunteer: false,
                                        ngo: false,
                                      });
                                      setConfirmPassword({
                                        toggle: true,
                                        element: (
                                          <Text style={{height: 0}}></Text>
                                        ),
                                      });
                                    }
                                    setLoginBtndisable(false);
                                  });
                              } else {
                                Alert.alert('Unsuccessfull!', 'Username Exists');
                                setLoginBtndisable(false);
                              }
                            });
                        } else {
                          Alert.alert('Unsuccessfull!', 'password != confirm passpord');
                          setLoginBtndisable(false);
                        }
                      } else {
                        Alert.alert('Unsuccessfull!', 'Invalid Input');
                        setLoginBtndisable(false);
                      }
                    } else {
                      Alert.alert('Unsuccessfull!', 'Incomplete Input');
                      setLoginBtndisable(false);
                    }
                  }
                } catch {
                  Alert.alert('Unsuccessfull!', 'Unexpected Error Occured!');
                }
              }}>
              <Animated.Text
                style={{
                  color: 'white',
                  fontSize: 25,
                  opacity: SignBtnScreenTxtOpacity,
                }}>
                {confirmPassword.toggle ? 'Login In' : 'Sign Up'}
              </Animated.Text>
            </Button>
          </LinearGradient>
        </View>
        <View style={login.view_8}>
          <Text style={{textAlign: 'center', width: '100%'}}>
            <Text>Don't Have An Account? </Text>
            <Animated.Text
              style={[{color: '#8A6EE5'}, {opacity: SignBtnScreenTxtOpacity}]}
              onPress={() => {
                LayoutAnimation.configureNext({
                  duration: 100,
                  create: {type: 'linear', property: 'scaleY'},
                  update: {type: 'linear', property: 'scaleY'},
                  delete: {type: 'linear', property: 'scaleY'},
                });
                if (confirmPassword.toggle) {
                  setConfirmPassword({
                    toggle: false,
                    element: (
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={LinearColor}
                        style={{
                          padding: 2,
                          width: '95%',
                          borderRadius: 5,
                          zIndex: 998,
                          elevation: 5,
                          shadowColor: 'black',
                          shadowOffset: {width: 20, height: 20},
                          shadowOpacity: 1,
                          backgroundColor: 'white',
                        }}>
                        <TextInput
                          onChangeText={value => setCP(value)}
                          inlineImageLeft="password"
                          inlineImagePadding={50}
                          style={login.Input}
                          placeholder=" Confirm Password"
                        />
                      </LinearGradient>
                    ),
                  });
                } else {
                  setPlace({donor: false, volunteer: false, ngo: false});
                  setConfirmPassword({
                    toggle: true,
                    element: <Text style={{height: 0}}></Text>,
                  });
                }
              }}>
              {confirmPassword.toggle ? 'Sign Up' : 'Sign In'}
            </Animated.Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

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
    flexGrow: 0.5,
    justifyContent: 'center',
  },
  view_3: {
    flexGrow: 0.5,
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
    flexGrow: 7,
    justifyContent: 'center',
    padding: 15,
    overflow: 'visible',
  },
  view_7: {
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_8: {
    flexGrow: 1,
  },
  WelcomeTxt: {
    paddingLeft: 30,
    fontWeight: 'bold',
  },
  TitleTxt: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
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
    padding: 10,
  },
  OptionTxt: {
    flex: 1,
    flexGrow: 1,
    textAlign: 'center',
    marginTop: 5,
  },
  OptionIcon: {
    flex: 1,
    flexGrow: 3,
    margin: 10,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  LoginBtn: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  Footer: {
    flex: 1,
  },
  Input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    fontSize: 20,
    borderRadius: 5,
  },
  PlaceColor: {
    padding: 0,
    borderRadius: 100,
    aspectRatio: 1 / 1,
    margin: 'auto',
    elevation: 3,
    shadowColor: 'black',
    shadowOpacity: 2,
    shadowOffset: {width: 20, height: 20},
    backgroundColor: 'white',
  },
});

export default LoginScreen;
