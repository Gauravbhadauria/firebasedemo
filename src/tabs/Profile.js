import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
let userId = '';
const Profile = () => {
  const navigation = useNavigation();
  const [imageData, setImageData] = useState(null);
  const [imagePicked, setImagePicked] = useState(false);
  const [uplaodedPicUrl, setUplaodedPicUrl] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    getProfileData();
  }, []);
  const getProfileData = async () => {
    userId = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setUplaodedPicUrl(documentSnapshot.data().profilePic);
          setFollowers(documentSnapshot.data().followers);
          setFollowing(documentSnapshot.data().following);
          console.log('data ', documentSnapshot.data().following);
        }
      });
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
  const uploadProfilePic = async () => {
    const reference = storage().ref(imageData.assets[0].fileName);
    const pathToFile = imageData.assets[0].uri;
    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(imageData.assets[0].fileName)
      .getDownloadURL();
    saveProfileToStore(url);
  };

  const saveProfileToStore = async url => {
    const userId = await AsyncStorage.getItem('USERID');
    console.log(userId, ' ' + url);
    firestore()
      .collection('Users')
      .doc(userId)
      .update({
        profilePic: url,
      })
      .then(() => {
        console.log('profile updated!');
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getFollowStatus = followers => {
    let status = false;

    followers.map(item => {
      if (item.userId == userId) {
        status = true;
      } else {
        status = false;
      }
    });
    return status;
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderBottomColor: '#8e8e8e',
          alignItems: 'center',
        }}>
        <Text style={{marginLeft: 15, fontSize: 18, fontWeight: '600'}}>
          Profile
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {imagePicked == true ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        ) : uplaodedPicUrl === '' ? (
          <Image
            source={require('../images/user.png')}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        ) : (
          <Image
            source={{uri: uplaodedPicUrl}}
            style={{width: 100, height: 100, borderRadius: 50}}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 200,
          height: 40,
          borderWidth: 0.2,
          alignSelf: 'center',
          borderRadius: 8,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: 'orange',
        }}
        onPress={() => {
          if (imagePicked === false) {
            openGallery();
            setImagePicked(true);
          } else {
            setImagePicked(false);
            uploadProfilePic();
          }
        }}>
        <Text style={{color: 'orange'}}>
          {imagePicked === true ? 'Save Pic' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 30,
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTab == 0 ? '#fff' : 'rgba(0,0,0,0)',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Text style={{fontSize: 18}}>Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: selectedTab == 1 ? '#fff' : 'rgba(0,0,0,0)',
          }}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Text style={{fontSize: 18}}>Following</Text>
        </TouchableOpacity>
      </View>

      {selectedTab == 1 ? null : (
        <FlatList
          data={followers}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={
                      item.profilePic == ''
                        ? require('../images/user.png')
                        : {uri: item.profilePic}
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginLeft: 20,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginRight: 20}}
                  onPress={() => {
                    navigation.navigate('NewMessage', {
                      data: {
                        userId: item.userId,
                        name: item.name,
                        myId: userId,
                        profilePic:
                          item.profilePic == '' || item.profilePic == null
                            ? ''
                            : item.profilePic,
                      },
                    });
                  }}>
                  <Image
                    source={require('../images/chat.png')}
                    style={{width: 24, height: 24, tintColor: 'orange'}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}

      {selectedTab == 0 ? null : (
        <FlatList
          data={following}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={
                      item.profilePic == ''
                        ? require('../images/user.png')
                        : {uri: item.profilePic}
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginLeft: 20,
                      marginRight: 10,
                    }}
                  />
                  <Text style={{fontSize: 18, fontWeight: '600'}}>
                    {item.name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginRight: 20}}
                  onPress={() => {
                    navigation.navigate('Messages', {
                      data: item,
                    });
                  }}>
                  <Image
                    source={require('../images/chat.png')}
                    style={{width: 24, height: 24, tintColor: 'orange'}}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Profile;
