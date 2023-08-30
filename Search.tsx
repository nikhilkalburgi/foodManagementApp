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
  TextInput,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import database from '@react-native-firebase/database';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const LinearColor: string[] = ['#FF07E6', '#13D7E3'];

const Option = (props: any): JSX.Element => {
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
      <View
        style={search.Card}
        onTouchEnd={() => {
          props.Item.role
            ? props.navigation.navigate('DonorDetails', {
                userType: props.userType,
                slideName: 'Search',
                Item: props.Item,
                username: props.username,
                password: props.password,
                place: props.place,
                user: props.user,
              })
            : props.navigation.navigate('DonationNGODetails', {
                userType: props.userType,
                slideName: 'Search',
                Item: props.Item,
                username: props.username,
                password: props.password,
                place: props.place,
                user: props.user,
              });
        }}>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '20%',
            borderColor: '#ddd',
            margin: 10,
          }}>
          <Image
            source={require('./assets/search.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: '70%'}}>
          <View style={search.CardBody}>
            <View style={search.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

export default function SearchScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const [searchItem, setSearchItem] = React.useState('');
  const [items_1, setItems_1] = React.useState([]);
  const [items_2, setItems_2] = React.useState([]);
  const [items, setItems] = React.useState([{id: 1}]);

  React.useEffect(() => {
    if (route.params.userType == 'Donor') {
      database()
        .ref(`/donations/${route.params.username.trim()}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            setItems_1(data);
          }
        });
      database()
        .ref(`/donations/${route.params.username.trim()}`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            setItems_1(data);
          }
        });

      database()
        .ref(`/users}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('N') > -1 &&
                element.name.trim() != route.params.username.trim()
              )
                newData.push(element);
            });
            setItems_2(newData);
          }
        });
      database()
        .ref(`/users`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('N') > -1 &&
                element.name.trim() != route.params.username.trim()
              )
                newData.push(element);
            });
            setItems_2(newData);
          }
        });
    } else if (route.params.userType == 'NGO') {
      database()
        .ref(`/donations`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              newData.push(Object.values(element));
            });
            setItems_1(newData[0]);
          }
        });
      database()
        .ref(`/donations`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              newData.push(Object.values(element));
            });
            setItems_1(newData[0]);
          }
        });
      database()
        .ref(`/users}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('D') > -1 &&
                element.name.trim() != route.params.username.trim()
              )
                newData.push(element);
            });
            setItems_2(newData);
          }
        });
      database()
        .ref(`/users`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('D') > -1 &&
                element.name.trim() != route.params.username.trim()
              )
                newData.push(element);
            });
            setItems_2(newData);
          }
        });
    } else if (route.params.userType == 'Volunteer') {
      database()
        .ref(`/users}`)
        .on('value', snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('D') > -1 &&
                element.name.trim() != route.params.username.trim()
              )
                newData.push(element);
            });
            setItems_2(newData);
          }
        });
      database()
        .ref(`/users`)
        .once('value')
        .then(snapshot => {
          if (snapshot.val()) {
            let data: any = Object.values(snapshot.val());
            let newData: any = [];
            data.forEach((element: any) => {
              if (
                element.role.indexOf('D') > -1 &&
                element.name.trim() != route.params.username.trim()
              )
                newData.push(element);
            });
            setItems_2(newData);
          }
        });
    }
  }, []);

  React.useEffect(() => {
    console.log(searchItem);
    let list = items_1.concat(items_2);
    let data: any = [];
    list.forEach((value: any) => {
      if (value.name.indexOf(searchItem) > -1) {
        data.push(value);
      }
    });
    setItems(data);
  }, [searchItem]);
  return (
    <View style={search.ParentView}>
      <View style={search.view_1}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingVertical: 2,
            flexGrow: 4,
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
      </View>
      <View style={search.view_2}>
        <TextInput
          onChangeText={value => setSearchItem(value)}
          inlineImageLeft="username"
          inlineImagePadding={50}
          style={search.Input}
          placeholder="Search NGO, Food Name, Volunteer etc... "
        />
      </View>
      <View style={search.view_3}>
        <FlatList
          data={items}
          renderItem={({item}) => (
            <View style={{alignItems: 'center', width: '100%', paddingTop: 15}}>
              <Option
                userType={route.params.userType}
                navigation={navigation}
                Item={item}
                username={route.params.username}
                password={route.params.password}
                place={route.params.place}
                user={route.params.user}
              />
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

const search = StyleSheet.create({
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
    paddingVertical: 20,
  },
  view_3: {
    flex: 1,
  },
  Input: {
    height: 50,
    backgroundColor: '#f5f5f5',
    fontSize: 15,
    borderRadius: 5,
    width: '90%',
  },
  Card: {
    height: windowHeight * 0.1,
    backgroundColor: 'white',
    width: '92%',
    marginHorizontal: 'auto',
    borderRadius: 5,

    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 5,
  },
  CardBody: {
    width: '90%',
    justifyContent: 'center',
    flex: 1,
  },
  CardBodyTitle: {
    paddingLeft: 10,
  },
});
