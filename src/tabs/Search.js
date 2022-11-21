import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
let userId = '';
const Search = () => {
  const [usersList, setUsersList] = useState([]);
  const [onFollowClick, setOnFollowClick] = useState(false);
  useEffect(() => {
    getUsers();
  }, [onFollowClick]);
  const getUsers = async () => {
    let tempUsers = [];
    userId = await AsyncStorage.getItem('USERID');
    firestore()
      .collection('Users')
      // Filter results
      // .where('userId', '==', userId)
      .get()
      .then(querySnapshot => {
        querySnapshot._docs.map(item => {
          if (item._data.userId !== userId) {
            tempUsers.push(item);
          }
        });
        setUsersList(tempUsers);
      });
  };

  const followUser = item => {
    let tempFollowers = item._data.followers;
    let following = [];
    let name = '';
    let profilePic = '';

    firestore()
      .collection('Users')
      .doc(userId)
      .get()
      .then(snapshot => {
        console.log('my data====>', item);
        following = snapshot.data().following;
        name = snapshot.data().name;
        profilePic = snapshot.data().profilePic;
        if (following.length > 0) {
          following.map(item2 => {
            if (item2.userId == item._data.userId) {
              let index2 = -1;
              following.map((x, i) => {
                if (x.userId == item._data.userId) {
                  index2 = i;
                }
              });
              if (index2 > -1) {
                following.splice(index2, 1);
              } else {
                following.push({
                  name: item._data.name,
                  userId: item._data.userId,
                  profilePic: item._data.profilePic,
                });
              }
            } else {
              following.push({
                name: item._data.name,
                userId: item._data.userId,
                profilePic: item._data.profilePic,
              });
            }
          });
        } else {
          following.push({
            name: item._data.name,
            userId: item._data.userId,
            profilePic: item._data.profilePic,
          });
        }
        console.log(following);
        if (tempFollowers.length > 0) {
          tempFollowers.map(item1 => {
            if (item1.userId == userId) {
              let index = -1;
              tempFollowers.map((x, i) => {
                if (x.userId == userId) {
                  index = i;
                }
              });

              if (index > -1) {
                tempFollowers.splice(index, 1);
              }
            } else {
              tempFollowers.push({
                name: name,
                userId: userId,
                profilePic: profilePic,
              });
            }
          });
        } else {
          tempFollowers.push({
            name: name,
            userId: userId,
            profilePic: profilePic,
          });
        }
        firestore()
          .collection('Users')
          .doc(item._data.userId)
          .update({
            followers: tempFollowers,
          })
          .then(res => {})
          .catch(error => {
            console.log(error);
          });
        firestore()
          .collection('Users')
          .doc(userId)
          .update({
            following: following,
          })
          .then(res => {})
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log;
      });

    setOnFollowClick(!onFollowClick);
    getUsers();
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
      <FlatList
        data={usersList}
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
                    item._data.profilePic == ''
                      ? require('../images/user.png')
                      : {uri: item._data.profilePic}
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
                  {item._data.name}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  marginRight: 20,
                  backgroundColor: '#0099ff',
                  height: 35,
                  borderRadius: 6,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  followUser(item);
                }}>
                <Text style={{color: '#fff', marginLeft: 10, marginRight: 10}}>
                  {getFollowStatus(item._data.followers)
                    ? 'Unfollow'
                    : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Search;
