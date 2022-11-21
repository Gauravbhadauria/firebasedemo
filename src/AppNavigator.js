import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Login from './screens/Login';
import Signup from './screens/Signup';
import HomeScreen from './screens/HomeScreen';
import Comments from './screens/Comments';
import Messages from './screens/Messages';
import MyMessages from './screens/MyMessages';
import NewMessage from './chat/NewMessage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={props => <Splash {...props} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={props => <Login {...props} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={props => <Signup {...props} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={props => <HomeScreen {...props} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Comments"
          component={props => <Comments {...props} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Messages"
          component={props => <Messages {...props} />}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyMessages"
          component={MyMessages}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewMessage"
          component={NewMessage}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
