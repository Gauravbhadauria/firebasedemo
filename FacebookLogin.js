import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  Settings,
  LoginButton,
  AccessToken,
  Profile,
  LoginManager,
} from 'react-native-fbsdk-next';
const FacebookLogin = () => {
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
          console.log('my email id ' + EM);

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
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          borderWidth: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          fbLogin();
        }}>
        <Text>Fb Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FacebookLogin;
