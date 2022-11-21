import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import SmsRetriever from 'react-native-sms-retriever';
const GetMobileNumber = () => {
  const _onPhoneNumberPressed = async () => {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      console.log(phoneNumber);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{borderWidth: 1, borderRadius: 10, padding: 10}}
        onPress={() => {
          _onPhoneNumberPressed();
        }}>
        <Text>Get Mobile Numbers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GetMobileNumber;
