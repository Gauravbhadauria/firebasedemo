import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const data = [
  require('./images/view1.jpg'),
  require('./images/view2.jpg'),
  require('./images/view3.jpg'),
  require('./images/view4.jpg'),
  require('./images/view5.jpg'),
  require('./images/view6.jpg'),
];
const {height, width} = Dimensions.get('window');

const NewScreen2 = () => {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  //   useEffect(() => {
  //     topRef.current.scrollToIndex({animated: true, index: selectedIndex});
  //   }, [selectedIndex]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        pagingEnabled
        ref={topRef}
        showsHorizontalScrollIndicator={false}
        keyExtractor={({item, index}) => index}
        onMomentumScrollEnd={e => {
          let index = (e.nativeEvent.contentOffset.x / width).toFixed(0);
          console.log(index);
          setSelectedIndex(index);
          bottomRef.current.scrollToIndex({animated: true, index: index});
        }}
        data={data}
        horizontal
        renderItem={({item, index}) => {
          return <Image source={item} style={{width: width, height: height}} />;
        }}
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
        }}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={bottomRef}
          initialScrollIndex={selectedIndex}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: 90,
                  height: 90,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{marginLeft: 10}}
                  onPress={() => {
                    setSelectedIndex(index);
                    topRef.current.scrollToIndex({
                      animated: true,
                      index: index,
                    });
                  }}>
                  <Image
                    source={item}
                    style={{
                      width: selectedIndex == index ? 90 : 50,
                      borderWidth: selectedIndex == index ? 1 : 0,
                      borderColor: '#fff',
                      height: selectedIndex == index ? 90 : 50,
                      borderRadius: selectedIndex == index ? 45 : 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default NewScreen2;
