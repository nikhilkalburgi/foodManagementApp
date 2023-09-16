import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import database from '@react-native-firebase/database';
import {Button} from '@ui-kitten/components';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
let date: String = '';

const images: any = {
  Veg: {
    uri: require('./assets/veg.png'),
  },
  'Non-Veg': {
    uri: require('./assets/nonveg.png'),
  },
  Pulses: {
    uri: require('./assets/pulses.png'),
  },
  Fruits: {
    uri: require('./assets/fruits.png'),
  },
  Vegetables: {
    uri: require('./assets/vegetables.png'),
  },
};


const Donations = (props: any): JSX.Element => {
  date = String(new Date(props.Item.date).toLocaleString());
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
      <View
        style={slide.Card}
        onTouchEnd={() =>
          props.slideName !== 'InProgress' || props.slideName !== 'Completed'
            ? props.navigation.navigate('DonationDetails', {
                userType: props.userType,
                slideName: props.slideName,
                Item: props.Item,
                username: props.username,
                password: props.password,
                place: props.place,
                user: props.user,
              })
            : null
        }>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '30%',
            borderColor: '#ddd',
          }}>
          <Image
            source={images[props.Item.type].uri}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View style={{width: '70%'}}>
          <View style={slide.CardAbsoluteBottom}>
            <View
              style={{
                borderWidth: 5,
                padding: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderLeftColor: 'transparent',
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor:
                  props.Item.type == 'Non-Veg' ? 'red' : 'green',
              }}>
              <View
                style={{
                  borderWidth: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftColor: 'transparent',
                  borderTopColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderBottomColor:
                    props.Item.type == 'Non-Veg' ? 'red' : 'green',
                }}></View>
            </View>
          </View>
          <View style={slide.CardBody}>
            <View style={slide.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
            <View style={slide.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>donor : </Text>
                {props.Item.donor}
              </Text>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Date : </Text>
                {date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

const NGO = (props: any): JSX.Element => {
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
      <View
        style={slide.Card}
        onTouchEnd={() =>
          props.navigation.navigate('DonorNGODetails', {
            userType: props.userType,
            slideName: props.slideName,
            Item: props.Item,
            username: props.username,
            password: props.password,
            place: props.place,
            user: props.user,
          })
        }>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '30%',
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Text style={{fontSize: 50, color: 'black'}}>
            {props.Item.name[0].toUpperCase()}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <View style={slide.CardBody}>
            <View style={slide.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
            <View style={slide.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Mobile : </Text>
                {props.Item.mobile}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

const RequestVolunteer = (props: any): JSX.Element => {
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
      <View
        style={slide.Card}
        onTouchEnd={(e: any) => {
          if (
            props.slideName !== 'InProgress' &&
            props.slideName !== 'Completed'
          )
            props.navigation.navigate('RequestVolunteer', {
              userType: props.userType,
              slideName: props.slideName,
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
            width: '30%',
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Text style={{fontSize: 50, color: 'black'}}>
            {props.Item.ngo[0].toUpperCase()}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <View style={slide.CardBody}>
            <View style={slide.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.ngo}</Text>
            </View>
            <View style={slide.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Mobile : </Text>
                {props.Item.mobile}
              </Text>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Location : </Text>
                {`${props.Item.drop.latitude}, ${props.Item.drop.longitude}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

const RequestDonor = (props: any): JSX.Element => {
  date = String(new Date(props.Item.date).toLocaleString());
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
      <View
        style={slide.Card}
        onTouchEnd={() =>
          props.slideName !== 'InProgress' && props.slideName !== 'Completed'
            ? props.navigation.navigate('RequestDonor', {
                userType: props.userType,
                slideName: props.slideName,
                Item: props.Item,
                username: props.username,
                password: props.password,
                place: props.place,
                user: props.user,
              })
            : null
        }>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '30%',
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Text style={{fontSize: 50, color: 'black'}}>
            {props.Item.name[0].toUpperCase()}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <View style={slide.CardBody}>
            <View style={slide.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
            <View style={slide.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>NGO : </Text>
                {props.Item.ngo}
              </Text>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Date : </Text>
                {date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

const Donors = (props: any): JSX.Element => {
  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
      <View
        style={slide.Card}
        onTouchEnd={() =>
          props.navigation.navigate('DonorDetails', {
            userType: props.userType,
            slideName: props.slideName,
            Item: props.Item,
            username: props.username,
            password: props.password,
            place: props.place,
            user: props.user,
          })
        }>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '30%',
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Text style={{fontSize: 50, color: 'black'}}>
            {props.Item.name[0].toUpperCase()}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <View style={slide.CardBody}>
            <View style={slide.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
            <View style={slide.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Mobile : </Text>
                {props.Item.mobile}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

const Volunteers = (props: any): JSX.Element => {
  const [requested, setRequested] = React.useState(false);
  
  database()
    .ref(`/volreq/${props.username.trim()}/${props.Item.id}/status`)
    .once('value', snapshot => {
      if ((snapshot.val() == 'Requested' || snapshot.val() == 'Accepted'))
        setRequested(true);
      else{
        setRequested(false);
      }
    });
    database()
    .ref(`/volreq/${props.username.trim()}/${props.Item.id}/status`)
    .on('value', snapshot => {
      if ((snapshot.val() == 'Requested' || snapshot.val() == 'Accepted'))
        setRequested(true);
      else{
        setRequested(false);
      }
    });

  return (
    <DropShadow
      style={{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 5,
      }}>
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
            padding: 5,
            position: 'absolute',
            bottom: 10,
            right: 10,
            backgroundColor: 'white',
            zIndex:999
          }}
          onPress={() => {
            try{
              
              database().ref(`/volreq/${props.username.trim()}/${props.Item.id+props.username.trim()}`).once('value',(snapshot)=>{
                let data = snapshot.val()
                if(data && data.status == 'InProgress' ){
                  Alert.alert("Not Possible!",`This Volunteer is already in your list with ${data.status} status`);
                }else{
                  
                  if (!requested) {
                    props.navigation.navigate('Location', {
                      userType: props.userType,
                      props: {
                        username: props.username,
                        password: props.password,
                        user: props.user,
                        Item: props.Item,
                        place: props.place,
                      },
                    });
                  } else {
                    database()
                      .ref(
                        `/notifications/${props.Item.name.trim()}/${props.Item.id + props.username.trim()}`,
                      )
                      .set({
                        id: props.Item.id + props.username.trim(),
                        name: props.username,
                        time: Date.now(),
                        msg: `Cancelled By ${props.username.trim()},status:'unread'`,
                      });
                    database()
                      .ref(`/volreq/${props.username.trim()}/${props.Item.id + props.username.trim()}`)
                      .set(null);
                    database()
                      .ref(`/volreq/${props.Item.name.trim()}/${props.Item.id + props.username.trim()}`)
                      .set(null);
                  }
                }
              })

            }
            catch(err){
            console.log(err)
            }
          }}>
          <Text style={{flexGrow: 1, textAlign: 'center'}}>
            {requested ? 'Cancel' : 'Request'}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderRightWidth: StyleSheet.hairlineWidth,
            width: '30%',
            borderColor: '#ddd',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <Text style={{fontSize: 50, color: 'black'}}>
            {props.Item.name[0].toUpperCase()}
          </Text>
        </View>
        <View style={{width: '70%'}}>
          <View style={slide.CardBody}>
            <View style={slide.CardBodyTitle}>
              <Text style={{fontWeight: 'bold'}}>{props.Item.name}</Text>
            </View>
            <View style={slide.CardBodyContent}>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Mobile : </Text>
                {props.Item.mobile}
              </Text>
              <Text style={{fontSize: 10, lineHeight: 18}} numberOfLines={1}>
                <Text style={{fontWeight: 'bold'}}>Location : </Text>
                {props.Item.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </DropShadow>
  );
};

const Card = (props: any): JSX.Element => {
  let element = <></>;
  if (props.slideName == 'Donations') {
    element = (
      <Donations
        Item={props.Item}
        slideName={props.slideName}
        userType={props.userType}
        navigation={props.navigation}
        username={props.username}
        password={props.password}
        place={props.place}
        user={props.user}
      />
    );
  } else if (props.slideName == 'NGO') {
    element = (
      <NGO
        Item={props.Item}
        slideName={props.slideName}
        userType={props.userType}
        navigation={props.navigation}
        username={props.username}
        password={props.password}
        place={props.place}
        user={props.user}
      />
    );
  } else if (props.slideName == 'Donors') {
    element = (
      <Donors
        Item={props.Item}
        slideName={props.slideName}
        userType={props.userType}
        navigation={props.navigation}
        username={props.username}
        password={props.password}
        place={props.place}
        user={props.user}
      />
    );
  } else if (props.slideName == 'Volunteer' || props.slideName == 'VolReq') {
    element = (
      <Volunteers
        Item={props.Item}
        slideName={props.slideName}
        userType={props.userType}
        navigation={props.navigation}
        username={props.username}
        password={props.password}
        place={props.place}
        user={props.user}
      />
    );
  } else if (props.slideName == 'Requests') {
    if (props.userType == 'Donor') {
      element = (
        <RequestDonor
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'NGO') {
      element = (
        <Donations
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'Volunteer') {
      element = (
        <RequestVolunteer
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    }
  } else if (props.slideName == 'Accepted') {
    if (props.userType == 'Donor') {
      element = (
        <RequestDonor
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'NGO') {
      element = (
        <Donations
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'Volunteer') {
      element = (
        <RequestVolunteer
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    }
  } else if (props.slideName == 'InProgress') {
    if (props.userType == 'Donor') {
      element = (
        <RequestDonor
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'NGO') {
      element = (
        <Donations
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'Volunteer') {
      element = (
        <RequestVolunteer
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    }
  } else if (props.slideName == 'Completed') {
    if (props.userType == 'Donor') {
      element = (
        <RequestDonor
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'NGO') {
      element = (
        <Donations
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    } else if (props.userType == 'Volunteer') {
      element = (
        <RequestVolunteer
          Item={props.Item}
          slideName={props.slideName}
          userType={props.userType}
          navigation={props.navigation}
          username={props.username}
          password={props.password}
          place={props.place}
          user={props.user}
        />
      );
    }
  } else if (props.slideName == 'VolReq' || props.slideName == 'VolAccepted') {
    element = (
      <Volunteers
        Item={props.Item}
        slideName={props.slideName}
        userType={props.userType}
        navigation={props.navigation}
        username={props.username}
        password={props.password}
        place={props.place}
        user={props.user}
      />
    );
  }

  return element;
};

export default Card;

const slide = StyleSheet.create({
  Card: {
    height: windowHeight * 0.13,
    backgroundColor: 'white',
    width: '92%',
    marginHorizontal: 'auto',
    borderRadius: 5,

    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
    paddingTop: 5,
  },
  CardAbsoluteBottom: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  CardBody: {
    width: '90%',
    marginTop: 5,
    height: 95,
  },
  CardBodyTitle: {
    paddingLeft: 10,
    flexGrow: 0.1,
  },
  CardBodyContent: {
    paddingLeft: 10,
    flexGrow: 1,
  },
});

