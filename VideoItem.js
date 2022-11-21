import {View, Text, Dimensions} from 'react-native';
import React, {useRef, useState} from 'react';
import Video from 'react-native-video';
const {height, width} = Dimensions.get('window');
import VideoPlayer from 'react-native-video-player';
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
const VideoItem = ({index}) => {
  const [paused, setPaused] = useState(true);
  const videoRef = useRef();
  const handleImageVisibility = visible => {
    console.log(videoRef.current);

    if (visible) {
      videoRef.current.resume();
    } else {
      videoRef.current.pause();
    }
  };
  return (
    <View style={{width: width, height: 400}}>
      <VisibilitySensor onChange={handleImageVisibility}>
        <VideoPlayer
          ref={videoRef}
          
          video={
            index === 4
              ? require('./src/images/video.mp4')
              : index === 5
              ? require('./src/images/video2.mp4')
              : require('./src/images/video3.mp4')
          }
          videoWidth={width}
          videoHeight={400}
          resizeMode={'cover'}
        />
      </VisibilitySensor>
    </View>
  );
};

export default VideoItem;
