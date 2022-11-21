import {View, Text} from 'react-native';
import React, {memo, useContext} from 'react';

const ComponentB = ({counter2}) => {
  console.log('Component B');
  return (
    <View>
      <Text
        style={{fontSize: 20}}
        onPress={() => {
          // myfunction();
        }}>
        {counter2}
      </Text>
    </View>
  );
};

export default ComponentB;
