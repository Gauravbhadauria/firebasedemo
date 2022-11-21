import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Home from '../tabs/Home';
import Search from '../tabs/Search';
import Add from '../tabs/Add';
import Chat from '../tabs/Chat';
import Profile from '../tabs/Profile';
import Main from '../tabs/Main';
const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const openCamera = async () => {
    const result = await launchCamera({mediaType: 'photo'});
    setImageData(result);
    console.log(result);
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'FirebaseSocial App Camera Permission',
          message:
            'Firebase Social App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        openCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const uplaodImage = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    // uploads file
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    console.log(url);
  };
  return (
    <View style={{flex: 1}}>
      {selectedTab === 0 ? (
        <Home />
      ) : selectedTab === 1 ? (
        <Search />
      ) : selectedTab === 2 ? (
        <Add
          onAdded={() => {
            setSelectedTab(0);
          }}
        />
      ) : selectedTab === 3 ? (
        <Chat />
      ) : (
        <Profile />
      )}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 70,
          flexDirection: 'row',
          backgroundColor: '#fff',
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../images/home.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: selectedTab == 0 ? 'orange' : '#8e8e8e',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../images/search.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: selectedTab == 1 ? 'orange' : '#8e8e8e',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(2);
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../images/add.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: selectedTab == 2 ? 'orange' : '#8e8e8e',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(3);
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../images/chat.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: selectedTab == 3 ? 'orange' : '#8e8e8e',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(4);
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: '#f2f2f2',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('../images/profile.png')}
              style={{
                width: 24,
                height: 24,
                tintColor: selectedTab == 4 ? 'orange' : '#8e8e8e',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
