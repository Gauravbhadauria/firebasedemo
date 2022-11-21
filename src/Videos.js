import {View, Text, FlatList, Image, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import {
  OffsetYProvider,
  IndexProvider,
  InCenterConsumer,
} from '@n1ru4l/react-in-center-of-screen';
const {height: windowHeight} = Dimensions.get('window');
const boxHeight = windowHeight / 3;
const Videos = () => {
  const [yValue, setYValue] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleViewableItemsChanged = (viewableItems, changed) => {
    console.log(viewableItems);
  };
  return (
    <OffsetYProvider
      columnsPerRow={1}
      listItemHeight={boxHeight}
      centerYStart={(windowHeight * 1) / 3}
      centerYEnd={(windowHeight * 2) / 3}>
      {({setOffsetY}) => (
        <FlatList
          data={[
            {type: 'image', src: require('../src/images/post1.jpeg')},
            {type: 'video', src: require('../src/images/video.mp4')},
            {type: 'image', src: require('../src/images/post2.jpeg')},
            {type: 'video', src: require('../src/images/video2.mp4')},
            {type: 'image', src: require('../src/images/post3.jpeg')},
            {type: 'video', src: require('../src/images/video3.mp4')},
            {type: 'video', src: require('../src/images/video4.mp4')},
            {type: 'image', src: require('../src/images/post5.jpeg')},
            {type: 'image', src: require('../src/images/post6.webp')},
          ]}
          onScroll={ev => {
            setOffsetY(ev.nativeEvent.contentOffset.y);
          }}
          keyExtractor={({item, index}) => index}
          renderItem={({index, item}) => (
            <IndexProvider index={index}>
              {() => (
                <View style={{height: boxHeight}}>
                  {item.type == 'image' ? (
                    <Image
                      source={item.src}
                      style={{width: '100%', height: '100%'}}
                    />
                  ) : (
                    <InCenterConsumer>
                      {({isInCenter}) =>
                        isInCenter ? (
                          <Video
                            paused={false}
                            source={item.src}
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: '#000',
                            }}
                            resizeMode="cover"
                          />
                        ) : (
                          <View style={{width: '100%', height: '100%'}}>
                            <Video
                              paused={true}
                              source={item.src}
                              style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#000',
                              }}
                              resizeMode="cover"
                            />
                            <View
                              style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position:'absolute',
                                top:0
                              }}>
                              <Image
                                source={require('../src/images/video.png')}
                                style={{width: 50, height: 50,tintColor:'#fff'}}
                              />
                            </View>
                          </View>
                        )
                      }
                    </InCenterConsumer>
                  )}
                </View>
              )}
            </IndexProvider>
          )}
        />
      )}
    </OffsetYProvider>
  );
};

export default Videos;
