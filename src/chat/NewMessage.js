import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Bubble, GiftedChat, InputToolbar, Send} from 'react-native-gifted-chat';
import {Router, urlencoded} from 'express';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Video from 'react-native-video';
const NewMessage = () => {
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const route = useRoute();
  useEffect(() => {
    const querySnapShot = firestore()
      .collection('chats')
      .doc('123456789')
      .collection('messages')
      .orderBy('createdAt', 'desc');
    querySnapShot.onSnapshot(snapShot => {
      const allMessages = snapShot.docs.map(snap => {
        return {...snap.data(), createdAt: new Date()};
      });
      setMessages(allMessages);
    });
  }, []);

  const onSend = messageArray => {
    console.log('fsfsf');
    let myMsg = null;
    if (imageUrl !== '') {
      const msg = messageArray[0];
      myMsg = {
        ...msg,
        senderId: route.params.data.myId,
        receiverId: route.params.data.userId,
        image: imageUrl,
      };
    } else {
      const msg = messageArray[0];
      myMsg = {
        ...msg,
        senderId: route.params.data.myId,
        receiverId: route.params.data.userId,
        image: '',
      };
    }

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    firestore()
      .collection('chats')
      .doc('123456789')
      .collection('messages')
      .add({
        ...myMsg,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    setImageUrl('');
    setImageData(null);
  };
 
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    console.log(result);
    if (result.didCancel && result.didCancel == true) {
    } else {
      setImageData(result);
      uplaodImage(result);
    }
  };

  const uplaodImage = async imageDataa => {
    const reference = storage().ref(imageDataa.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log('url', url);
    setImageUrl(url);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <GiftedChat
        alwaysShowSend
       
        renderSend={props => {
          return (
            <View
              style={{flexDirection: 'row', alignItems: 'center', height: 60}}>
              {imageUrl !== '' ? (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    marginRight: 10,
                  }}>
                  <Image
                    source={{uri: imageData.assets[0].uri}}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      position: 'absolute',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setImageUrl('');
                    }}>
                    <Image
                      source={require('../images/cross.png')}
                      style={{width: 16, height: 16, tintColor: '#fff'}}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  openCamera();
                }}>
                <Image
                  source={require('../images/image.png')}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <Send {...props} containerStyle={{justifyContent: 'center'}}>
                <Image
                  source={require('../images/send.png')}
                  style={{
                    width: 24,
                    height: 24,
                    marginRight: 10,
                    tintColor: 'orange',
                  }}
                />
              </Send>
            </View>
          );
        }}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.data.myId,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: 'orange',
                },
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default NewMessage;
