import {Tab, TabBar, Button, Input} from '@ui-kitten/components';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';
import {useRoute} from '@react-navigation/native';
import Slide from './Slides';
import MaskedView from '@react-native-masked-view/masked-view';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

export default function DonationScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [date, setDate] = React.useState(new Date(1598051730000));

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
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
              navigation.navigate('Home');
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
          <Input label="Name for the Food" placeholder="Place your Text" />
          <Input label="Type of Food" placeholder="Place your Text" />
          <Input label="Pickup Location" placeholder="Place your Text" />
          <Input
            label="Food Expiry Time"
            placeholder="Place your Text"
            value={date.toDateString()}
            onFocus={() => showMode('date')}
          />
          <Input label="Weight in KGs" placeholder="Place your Text" />
          <Input label="Note" placeholder="" numberOfLines={9} multiline={true}/>
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
            <Button style={{backgroundColor: 'transparent', borderWidth: 0}}>
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
