import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let userId = '';
const Main = () => {
  const [onLikeClick, setOnLikeCLick] = useState(false);
  const isFocused = useIsFocused();
  const [postData, setPostData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getUserId();
    getData();
  }, [onLikeClick]);
  const getUserId = async () => {
    userId = await AsyncStorage.getItem('USERID');
  };
  const getData = () => {
    let tempData = [];
    const subscriber = firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        console.log('Total posts: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
        });
        setPostData(tempData);
      });
    return () => subscriber();
  };
  const getLikeStatus = likes => {
    let status = false;
    likes.map(item => {
      if (item === userId) {
        status = true;
      } else {
        status = false;
      }
    });
    return status;
  };
  const onLike = item => {
    let tempLikes = item.likes;
    if (tempLikes.length > 0) {
      tempLikes.map(item1 => {
        if (item1 == userId) {
          const index = tempLikes.indexOf(item1);
          if (index > -1) {
            // only splice array when item is found
            tempLikes.splice(index, 1); // 2nd parameter means remove one item only
          }
        } else {
          tempLikes.push(userId);
        }
      });
    } else {
      tempLikes.push(userId);
    }

    firestore()
      .collection('posts')
      .doc(item.postId)
      .update({
        likes: tempLikes,
      })
      .then(() => {
        console.log('post updated!');
      })
      .catch(error => {});
    setOnLikeCLick(!onLikeClick);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'center',
          paddingLeft: 20,
          backgroundColor: '#fff',
        }}>
        <Text style={{fontSize: 20, color: '#000', fontWeight: '700'}}>
          Firebase Demo
        </Text>
      </View>

      {postData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '90%',

                  alignSelf: 'center',
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  marginBottom: postData.length - 1 == index ? 80 : 0,
                }}>
                {/* <Image
                  source={{uri: item.image}}
                  style={{width: '100%', height: '100%'}}
                /> */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={require('../images/user.png')}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginLeft: 15,
                    }}
                  />
                  <Text
                    style={{fontSize: 18, marginLeft: 15, fontWeight: '600'}}>
                    {item.name}
                  </Text>
                </View>
                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 10,
                  }}>
                  {item.caption}
                </Text>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: '90%',
                    height: 120,
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginBottom: 20,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 50,
                    marginBottom: 10,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      onLike(item);
                    }}>
                    <Text style={{marginRight: 10}}>{item.likes.length}</Text>
                    {getLikeStatus(item.likes) ? (
                      <Image
                        source={require('../images/heart.png')}
                        style={{width: 24, height: 24, tintColor: 'red'}}
                      />
                    ) : (
                      <Image
                        source={require('../images/love.png')}
                        style={{width: 24, height: 24}}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('Comments', {
                        postId: item.postId,
                        comments: item.comments,
                      });
                    }}>
                    <Text style={{marginRight: 10}}>
                      {item.comments.length}
                    </Text>
                    <Image
                      source={require('../images/comment.png')}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Post Found</Text>
        </View>
      )}
    </View>
  );
};

export default Main;
