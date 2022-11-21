import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Image360Viewer from '@hauvo/react-native-360-image-viewer';
const {height, width} = Dimensions.get('window');
import _ from 'lodash';
const images =[
  require(`./images/iris-1.jpg`),
  require(`./images/iris-2.jpg`),
  require(`./images/iris-3.jpg`),
  require(`./images/iris-4.jpg`),
  require(`./images/iris-5.jpg`),
  require(`./images/iris-6.jpg`),
  require(`./images/iris-7.jpg`),
  require(`./images/iris-8.jpg`),
  require(`./images/iris-9.jpg`),
  require(`./images/iris-10.jpg`),
  require(`./images/iris-11.jpg`),
  require(`./images/iris-12.jpg`),
  require(`./images/iris-13.jpg`),
  require(`./images/iris-14.jpg`),
  require(`./images/iris-15.jpg`),
  require(`./images/iris-16.jpg`),
  require(`./images/iris-17.jpg`),
  require(`./images/iris-18.jpg`),
  require(`./images/iris-19.jpg`),
  require(`./images/iris-20.jpg`),
  require(`./images/iris-21.jpg`),
  require(`./images/iris-22.jpg`),
  require(`./images/iris-23.jpg`),
  require(`./images/iris-24.jpg`),
  require(`./images/iris-25.jpg`),
  require(`./images/iris-26.jpg`),
  require(`./images/iris-27.jpg`),
  require(`./images/iris-28.jpg`),
  require(`./images/iris-29.jpg`),
  require(`./images/iris-30.jpg`),
  require(`./images/iris-31.jpg`),
  require(`./images/iris-32.jpg`),
  require(`./images/iris-33.jpg`),
  require(`./images/iris-34.jpg`),
  require(`./images/iris-35.jpg`),
  require(`./images/iris-36.jpg`),
]
const NewScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image360Viewer srcset={images} width={width} height={200} />
    </View>
  );
};

export default NewScreen;
