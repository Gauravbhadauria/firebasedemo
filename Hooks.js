import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Slider,
  Image,
  ScrollView,
  Dimensions,
  Button,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import Video from 'react-native-video';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MyCustomModule from './MyCustomModule'
const Hooks = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        {/* <FlatList
          data={videos}
          keyExtractor={({item, index}) => index}
          // onScroll={e => {
          //   console.log();
          //   const ind = e.nativeEvent.contentOffset.y / 300;
          //   console.log(ind.toFixed(0));
          //   if (ind === 4 || ind === 2 || ind === 7) {
          //     ref.current.setNativeProps({paused: false});
          //   } else {
          //     ref.current.setNativeProps({paused: true});
          //   }
          // }}
          renderItem={({item, index}) => {
            return (
              <View style={{width: '100%'}}>
                {index == 2 || index === 4 || index == 5 ? (
                  <VideoItem index={index} />
                ) : (
                  <View
                    style={{
                      width: width,
                      height: 300,
                      marginTop: 20,
                      backgroundColor: '#336699',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('./src/images/placeholder.png')}
                      style={{width: '100%', height: '100%'}}
                    />
                  </View>
                )}
              </View>
            );
          }}
        /> */}
        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            borderWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
         MyCustomModule.goToNextScreen();
          }}>
          <Text>Call Native Screen</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

export default Hooks;
