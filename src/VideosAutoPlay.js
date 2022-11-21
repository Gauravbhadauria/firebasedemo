import {View, Text, Dimensions, FlatList, Image} from 'react-native';
import React from 'react';
import {
  OffsetYProvider,
  IndexProvider,
  InCenterConsumer,
} from '@n1ru4l/react-in-center-of-screen';
import Video from 'react-native-video';
const {height: windowHeight} = Dimensions.get('window');

const boxHeight = windowHeight / 3;
const data = [
  {type: 'image', src: require('../src/images/post1.jpeg')},
  {type: 'video', src: require('../src/images/video.mp4')},
  {type: 'image', src: require('../src/images/post2.jpeg')},
  {type: 'video', src: require('../src/images/video2.mp4')},
  {type: 'image', src: require('../src/images/post3.jpeg')},
  {type: 'video', src: require('../src/images/video3.mp4')},
  {type: 'video', src: require('../src/images/video4.mp4')},
  {type: 'image', src: require('../src/images/post5.jpeg')},
  {type: 'image', src: require('../src/images/post6.webp')},
];
const VideosAutoPlay = () => {
  return (
    <OffsetYProvider
      columnsPerRow={1}
      listItemHeight={boxHeight}
      centerYStart={(windowHeight * 1) / 3}
      centerYEnd={(windowHeight * 2) / 3}>
      {({setOffsetY}) => (
        <FlatList
          data={data}
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
                            style={{width: '100%', height: '100%'}}
                            resizeMode={'cover'}
                          />
                        ) : (
                          <View
                            style={{
                              width: '100%',
                              height: '100%',

                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#000',
                            }}>
                            <Image
                              source={require('../src/images/video.png')}
                              style={{width: 50, height: 50, tintColor: '#fff'}}
                            />
                            <Video
                              paused={true}
                              source={item.src}
                              style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                              }}
                              resizeMode={'cover'}
                            />
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

export default VideosAutoPlay;
