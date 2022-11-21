import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';
const admin = require('firebase-admin');
import uuid from 'react-native-uuid';
let token = '';
let name = '';
let email = '';

const Add = ({onAdded}) => {
  const [imageData, setImageData] = useState(null);
  const [caption, setCaption] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    getFcmToken();
  }, []);
  const getFcmToken = async () => {
    name = await AsyncStorage.getItem('NAME');
    email = await AsyncStorage.getItem('EMAIL');
    // token = await messaging().getToken();

    console.log(email, name);
    console.log(token);
  };
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };
  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };
  const uplaodImage = async () => {
    setModalVisible(true);
    let id = uuid.v4();
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    const userId = await AsyncStorage.getItem('USERID');
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
    firestore()
      .collection('posts')
      .doc(id)
      .set({
        image: url,
        caption: caption,
        email: email,
        name: name,
        userId: userId,
        postId: id,
        likes: [],
        comments: [],
      })
      .then(() => {
        console.log('post added!');
        getAllTokens();
      })
      .catch(error => {
        setModalVisible(false);
      });
  };

  const getAllTokens = () => {
    let tempTokens = [];
    firestore()
      .collection('tokens')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          //  tempTokens.push(documentSnapshot.data().token);
          sendNotifications(documentSnapshot.data().token);
        });
        sendNotifications(tempTokens);
      })
      .catch(error => {
        setModalVisible(false);
      });
    setModalVisible(false);
    onAdded();
  };
  const sendNotifications = async token => {
    var axios = require('axios');
    var data = JSON.stringify({
      data: {},
      notification: {
        body: 'click to open check Post',
        title: 'New Post Added',
      },
      to: token,
    });

    var config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization:
          'key=AAAA6_lD8TM:APA91bHpYl_t1Z0L-FNrdENSWCP98Fyah0rFaLsHLitDl-Yk2gMZyVUKYW_8JG8LtU_G_EQnQd4xW-bAzVDWEaKGH6vnTxVS7w8Gd4UR4pmdLy4-cKGwDlB-JRJ8P6V8loXLtss4NKOg',
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderBottomColor: '#8e8e8e',
        }}>
        <Text style={{marginLeft: 20, fontSize: 20, color: '#000'}}> Post</Text>
        <Text
          style={{
            marginRight: 20,
            fontSize: 18,
            color: imageData !== null ? 'blue' : '#8e8e8e',
          }}
          onPress={() => {
            if (imageData !== null || caption !== '') {
              uplaodImage();
            } else {
              alert('Please Select Pic or enter caption');
            }
          }}>
          {' '}
          Upload
        </Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
          borderColor: '#8e8e8e',
          borderRadius: 10,
          height: 150,
          borderWidth: 0.2,
          flexDirection: 'row',
        }}>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={{width: 50, height: 50, borderRadius: 10, margin: 10}}
          />
        ) : (
          <Image
            source={require('../images/image.png')}
            style={{width: 50, height: 50, borderRadius: 10, margin: 10}}
          />
        )}
        <TextInput
          value={caption}
          onChangeText={txt => {
            setCaption(txt);
          }}
          placeholder="type Caption here..."
          style={{width: '70%'}}
        />
      </View>
      <TouchableOpacity
        style={{
          width: '100%',
          marginTop: 30,
          height: 50,
          borderBottomWidth: 0.2,
          borderBottomColor: '#8e8e8e',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          openCamera();
        }}>
        <Image
          source={require('../images/camera.png')}
          style={{width: 24, height: 24, marginLeft: 20}}
        />
        <Text style={{marginLeft: 20}}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '100%',
          marginTop: 30,
          height: 50,
          borderBottomWidth: 0.2,
          borderBottomColor: '#8e8e8e',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          openGallery();
        }}>
        <Image
          source={require('../images/gallery.png')}
          style={{width: 24, height: 24, marginLeft: 20}}
        />
        <Text style={{marginLeft: 20}}>Open Gallery</Text>
      </TouchableOpacity>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default Add;
