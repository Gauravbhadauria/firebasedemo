import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  notificationListener,
  requestUserPermission,
} from './src/notification_helper';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {
  Settings,
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const App = () => {
  // const [confirm, setConfirm] = useState(null);

  // const [code, setCode] = useState('');
  const [profileImage, setProfileImage] = useState('');
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);

  // useEffect(() => {
  //   requestUserPermission();
  //   notificationListener();
  // }, []);

  // const signInWithPhoneNumber = async phoneNumber => {
  //   const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // };

  // const confirmCode = async () => {
  //   try {
  //     const res = await confirm.confirm(code);
  //     console.log(res);
  //   } catch (error) {
  //     console.log('Invalid code.');
  //   }
  // };

  // if (!confirm) {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         width: 250,
  //         height: 50,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         borderWidth: 0.5,
  //         alignSelf: 'center',
  //         marginTop: 100,
  //       }}
  //       onPress={() => {}}>
  //       <Text>Email Sign In</Text>
  //     </TouchableOpacity>
  //   );
  // }

  // const registerWithEmail = async email => {
  //   try {
  //     const res = await auth().createUserWithEmailAndPassword(email, '123456');
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const signinWithEmail = async () => {
  //   try {
  //     const res = await auth().signInWithEmailAndPassword(
  //       'gauravofficial1995@gmail.com',
  //       '123456',
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getEmailData = async () => {
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     ,
  //   ]);
  //   console.log('res', result);
  // };
  useEffect(() => {
    GoogleSignin.configure();
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('user inf', userInfo);
      setProfileImage(userInfo.photo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const fbLogin = async () => {
    // Attempt login with permissions
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          getData();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  
  };
  const getData = async () => {
    const data = await AccessToken.getCurrentAccessToken();
    console.log(data);
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,friends&access_token=' +
        data.accessToken,
    )
      .then(response => {
        response.json().then(json => {
          const ID = json.id;
          console.log('ID ' + ID);

          const EM = json.email;
          console.log('Email ' + EM);

          const FN = json.first_name;
          console.log('First Name ' + FN);
        });
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        keyboardType={'number-pad'}
        maxLength={6}
        style={{borderWidth: 0.5, width: 200, marginBottom: 50}}
      /> */}
      {/* <Button
        title="Email Register in"
        onPress={() => {
          registerWithEmail();
        }}
      />
      <View style={{marginTop: 50}}>
        <Button
          title="Email Sign in"
          onPress={() => {
            signinWithEmail();
          }}
        />
      </View> */}
      <View style={{marginTop: 30}}>
        {/* <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              fbLogin();
              // AccessToken.getCurrentAccessToken().then(data => {
              //   console.log(data);
              // });
              // const currentProfile = Profile.getCurrentProfile().then(function (
              //   currentProfile,
              // ) {
              //   if (currentProfile) {
              //     console.log(currentProfile);
              //     setProfileImage(currentProfile.imageURL);
              //     // getEmailData();
              //   }
              // });
            }
          }}
          onLogoutFinished={() => {
            console.log('logout.');
            setProfileImage('');
          }}
        /> */}
        <TouchableOpacity
          style={{
            width: 200,
            height: 40,
            borderWidth: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            fbLogin();
          }}>
          <Text>Fb Login</Text>
        </TouchableOpacity>
      </View>
      {profileImage !== '' && (
        <Image
          source={{uri: profileImage}}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            marginTop: 100,
            alignSelf: 'center',
          }}
        />
      )}
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
          alignSelf: 'center',
          marginTop: 50,
        }}
        onPress={() => {
          signIn();
        }}>
        <Text>Google Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
