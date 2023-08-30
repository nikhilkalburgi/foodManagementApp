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

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function DonorNGODetails({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  return (
    <ScrollView style={donationdetails.ScrollView}>
      <View style={donationdetails.ParentView}>
        <View style={donationdetails.view_1}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}
            onPress={() => {
              navigation.navigate('Home', {
                place: route.params.place,
                username: route.params.username,
                password: route.params.password,
                user: route.params.user,
              });
            }}>
            <Image
              source={require('./assets/arrow.png')}
              style={{width: 30, height: 30, objectFit: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <View style={donationdetails.view_2}>
          <View style={{height: windowHeight * 0.8 * 0.3}}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Image
                source={require('./assets/donor.png')}
                style={{
                  borderRadius: 100,
                  borderWidth: 3,
                  borderColor: 'black',
                  width: windowWidth * 0.3,
                  height: windowWidth * 0.3,
                  marginBottom: 10,
                }}
              />
              <Text numberOfLines={2} style={{fontSize: 25, color: 'black'}}>
                {route.params.Item.name}
              </Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                margin: 'auto',
                borderRadius: 10,
                width: windowWidth - 30,
                marginHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'white',
                padding: 10,
                height: windowHeight * 0.44,
                borderWidth: StyleSheet.hairlineWidth,
                alignItems: 'center',
              }}>
              <ScrollView>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}
                  numberOfLines={1}>
                  <Text style={{fontWeight: 'bold'}}>Mobile : </Text>
                  {route.params.Item.mobile}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    lineHeight: 18,
                    padding: 5,
                    flexGrow: 1,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Default Location : </Text>
                  {route.params.Item.location}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const donationdetails = StyleSheet.create({
  ScrollView: {
    backgroundColor: 'white',
  },
  ParentView: {
    flex: 1,
    height: windowHeight,
  },
  view_1: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
    padding: 5,
  },
  view_2: {
    flexGrow: 9,
  },
  view_3: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'white',
  },
});
