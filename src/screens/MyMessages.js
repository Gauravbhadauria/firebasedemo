import {View, Text} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

let userId = '';

const MyMessages = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getData();
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const getData = async () => {
    userId = await AsyncStorage.getItem('USERID');
  };
  const onSend = msgArray => {
    const msg = msgArray[0];
    const mymsg = {
      ...msg,
      sendBy: userId,
      sendTo: route.params.data.userId,
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    sendMsg(mymsg);
  };

  const sendMsg = mymsg => {
    firestore()
      .collection('chats')
      .doc(route.params.data.chatId)
      .add({
        ...mymsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

export default MyMessages;
