import {
  Tab,
  TabBar,
  Button,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Modal,
} from '@ui-kitten/components';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Animated,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];
let idWithDate: Number = Date.now();
const imageType = ['Veg', 'Non-Veg', 'Pulses', 'Fruits', 'Vegetables'];

export default function DonationScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [date, setDate] = React.useState(new Date());
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0),
  );
  const [weight, setWeight] = React.useState('');
  const [note, setNote] = React.useState('');
  const [disable, setDisable] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  return (
    <ScrollView style={donate.ScrollView}>
      <View style={donate.ParentView}>
        <View style={donate.view_1}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingVertical: 2,
              flexGrow: 1,
              paddingHorizontal: 20,
            }}
            onPress={() => {
              navigation.navigate('Home', {...route.params});
            }}>
            <Image
              source={require('./assets/arrow.png')}
              style={{width: 30, height: 30, objectFit: 'contain'}}
            />
          </TouchableOpacity>

          <Text
            style={{
              position: 'absolute',
              left: '40%',
              transform: [{translateX: -windowWidth * 0.1}],
              fontSize: 25,
              color: 'black',
            }}>
            New Donation
          </Text>
        </View>
        <View style={donate.view_2}>
          <Button
            onPress={e => {
              e.preventDefault();
              navigation.navigate('Location', {...route.params});
            }}
            style={{backgroundColor: 'black', width: '95%'}}>
            {!route.params.region.latitude
              ? 'Pick Up Location'
              : 'Location Selected'}
          </Button>
          <Input
            label="Name for the Food"
            placeholder="Food Name"
            onChangeText={value => setName(value)}
          />
          <Select
            label="Type of Food"
            style={{width: '100%'}}
            value={imageType[Number(type.toString()) - 1]}
            selectedIndex={type}
            onSelect={index => setType(index)}>
            <SelectItem title="Veg" />
            <SelectItem title="Non-Veg" />
            <SelectItem title="Pulses" />
            <SelectItem title="Fruits" />
            <SelectItem title="Vegetables" />
          </Select>
          <Input
            label="Food Expiry Time"
            placeholder="Place your Text"
            value={date.toDateString()}
            onFocus={() => showMode('date')}
          />
          <Input
            label="Weight in KGs"
            placeholder="Place your Text"
            onChangeText={value => setWeight(value)}
          />
          <Input
            label="Note"
            placeholder=""
            numberOfLines={9}
            multiline={true}
            onChangeText={value => setNote(value)}
          />
        </View>
        <View style={donate.view_3}>
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
              style={{backgroundColor: 'transparent', borderWidth: 0}}
              disabled={disable}
              onPress={() => {
                setDisable(true);
                if (
                  name && name != "Volunteer Message" &&
                  date && type &&
                  new Date(date.toISOString().split('T')[0]).getTime() >
                    new Date(
                      new Date().toISOString().split('T')[0],
                    ).getTime() &&
                  route.params.region.latitude
                ) {
                  idWithDate = Date.now();
                  database()
                    .ref(`/donations/${route.params.username.trim()}`)
                    .once('value')
                    .then(snapshot => {
                      if (snapshot.val()) {
                        let data: any = Object.values(snapshot.val());

                        if (
                          data.every((value: any) => {
                            if (value.name !== name) return true;
                          })
                        ) {
                          database()
                            .ref(
                              `/donations/${route.params.username.trim()}/${idWithDate}`,
                            )
                            .set({
                              id: idWithDate,
                              name: name,
                              type: imageType[Number(type.toString()) - 1],
                              donor: route.params.username.trim(),
                              location: route.params.region,
                              expiry: date,
                              date: Date.now(),
                              weight: weight,
                              note: note,
                            })
                            .then(() => {
                              setDisable(false);
                              Alert.alert(
                                'Successfully Submitted',
                                `Your Donation ${name} is included.`,
                              );
                            });
                        } else {
                          setDisable(false);
                          Alert.alert(
                            'Operation unsuccessful!',
                            'Food Name Already Exists!',
                          );
                        }
                      } else {
                        database()
                          .ref(
                            `/donations/${route.params.username.trim()}/${idWithDate}`,
                          )
                          .set({
                            id: idWithDate,
                            name: name,
                            type: imageType[Number(type.toString()) - 1],
                            donor: route.params.username.trim(),
                            location: route.params.region,
                            expiry: date,
                            date: Date.now(),
                            weight: weight,
                            note: note,
                          })
                          .then(() => {
                            setDisable(false);
                            Alert.alert(
                              'Successfully Submitted',
                              `Your Donation ${name} is included.`,
                            );
                          });
                      }
                    });
                } else {
                  Alert.alert('Unsuccessful!', 'Incorrect Input! Try again');
                  setDisable(false);
                }
                setType(new IndexPath(0))
              }}>
              <Animated.Text>Submit</Animated.Text>
            </Button>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  );
}

const donate = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white',
  },
  ParentView: {
    flex: 1,
    height: windowHeight,
  },
  view_1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  view_2: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-around',
  },
  view_3: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
