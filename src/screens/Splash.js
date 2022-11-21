import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);

  const checkLogin = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    // if (userId !== '' || userId !== null || userId !== undefined) {
    //   navigation.navigate('HomeScreen');
    // } else {
      navigation.navigate('Login');
    // }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 30, fontWeight: '800', color: '#000'}}>
        Firebase
      </Text>
      <Text style={{fontSize: 14, fontWeight: '800', color: 'red'}}>
        The Social App
      </Text>
    </View>
  );
};

export default Splash;
