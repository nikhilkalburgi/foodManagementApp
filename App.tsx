import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import LoginScreen from './Login'
import { Dimensions, StatusBar } from 'react-native';


const windowHeight = Dimensions.get('window').height;

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <StatusBar
        animated={true}
        backgroundColor="transparent"
      />
    <LoginScreen/>
  </ApplicationProvider>
);

