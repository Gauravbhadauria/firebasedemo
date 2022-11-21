import {View, Text} from 'react-native';
import React, {memo} from 'react';

const ComponentA = ({counter1}) => {
  console.log('Component A');
  return (
    <View>
      <Text style={{fontSize: 18, marginBottom: 20}}>{counter1}</Text>
    </View>
  );
};

export default memo(ComponentA);
