import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppNavigator from './AppNavigator';
import messaging from '@react-native-firebase/messaging';
import {
  notificationListener,
  requestUserPermission,
} from './notification_helper';
import NewScreen from './NewScreen';
import NewScreen2 from './NewScreen2';
import ImageGallery from './ImageGallery';
import GetMobileNumber from './GetMobileNumber';
import VideosAutoPlay from './VideosAutoPlay';
import BookSeat from './BookSeat';
const Index = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  // return <AppNavigator />;
  return <BookSeat />;
};

export default Index;
