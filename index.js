/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import Index from './src/Index';
import FacebookLogin from './FacebookLogin';
import Hooks from './Hooks';
import RouterFlux from './src/RouterFlux';
import Videos from './src/Videos';
import VideosAutoPlay from './src/VideosAutoPlay';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => VideosAutoPlay);
