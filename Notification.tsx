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
import DropShadow from 'react-native-drop-shadow';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Note = (props: any): JSX.Element => {
  let time: String = String(new Date(props.Item.time));
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0,
        shadowRadius: 5,
      }}>
      <View style={notify.Card}>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '30%',
            borderColor: '#ddd',
            margin: 10,
          }}>
          <Image
            source={require('./assets/search.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: '70%'}}>
          <View style={notify.CardBody}>
            <View style={notify.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
            <View style={notify.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}}>
                {props.Item.msg}
              </Text>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                {time}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

export default function NotificationScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [items, setItems] = React.useState([{id: 1}]);

  React.useEffect(() => {
    database()
      .ref(`/notifications/${route.params.username}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          let data: any = Object.values(snapshot.val());
          setItems(data);
        }
      });
    database()
      .ref(`/notifications/${route.params.username}`)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          let data: any = Object.values(snapshot.val());
          setItems(data);
        }
      });
  }, []);

  return (
    <View style={notify.ParentView}>
      <View style={notify.view_1}>
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
            left: '45%',
            transform: [{translateX: -windowWidth * 0.1}],
            fontSize: 25,
            color: 'black',
          }}>
          Notification
        </Text>
      </View>
      <View style={notify.view_2}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <View style={{alignItems: 'center', width: '100%', paddingTop: 15}}>
              <Note Item={item} />
            </View>
          )}
          keyExtractor={item => String(item.id)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const notify = StyleSheet.create({
  ParentView: {
    flex: 1,
    height: windowHeight,
    backgroundColor: 'white',
  },
  view_1: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  view_2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    flex: 1,
  },
  Card: {
    height: windowHeight * 0.13,
    backgroundColor: 'white',
    width: '92%',
    marginHorizontal: 'auto',
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
    paddingTop: 5,
  },
  CardBody: {
    width: '90%',
    marginTop: 5,
    height: 95,
  },
  CardBodyTitle: {
    paddingLeft: 10,
    flexGrow: 0.1,
    marginBottom: 10,
  },
  CardBodyContent: {
    paddingLeft: 10,
    flexGrow: 1,
  },
});
