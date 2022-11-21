import {View, Text} from 'react-native';
import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import NewScreen from './NewScreen';
import NewScreen2 from './NewScreen2';
const RouterFlux = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="NewScreen" component={NewScreen} title="NewScreen" />
        <Scene key="NewScreen2" component={NewScreen2} title="NewScreen2" />
      </Stack>
    </Router>
  );
};

export default RouterFlux;
