import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
const data = [
  require('./images/view1.jpg'),
  require('./images/view2.jpg'),
  require('./images/view3.jpg'),
  require('./images/view4.jpg'),
  require('./images/view5.jpg'),
  require('./images/view6.jpg'),
];
const {height, width} = Dimensions.get('window');
const ImageGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const bottomRef = useRef();
  const topRef = useRef();

  return (
    <View style={{flex: 1}}>
      <FlatList
        horizontal
        ref={topRef}
        onScroll={e => {
          const index = (e.nativeEvent.contentOffset.x / width).toFixed(0);
          setSelectedIndex(index);
          bottomRef.current.scrollToIndex({animated: true, index: index});
        }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          return <Image source={item} style={{width: width, height: height}} />;
        }}
      />
      <View style={{position: 'absolute', bottom: 20}}>
        <FlatList
          horizontal
          pagingEnabled
          ref={bottomRef}
          initialScrollIndex={selectedIndex}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 90,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setSelectedIndex(index);
                  topRef.current.scrollToIndex({animated: true, index: index});
                }}>
                <Image
                  source={item}
                  style={{
                    width: selectedIndex == index ? 90 : 50,
                    height: selectedIndex == index ? 90 : 50,
                    borderRadius: selectedIndex == index ? 45 : 10,
                    borderWidth: selectedIndex == index ? 1 : 0,
                    borderColor: '#fff',
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default ImageGallery;
