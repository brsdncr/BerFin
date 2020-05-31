import React from 'react';

//For firestore errors
import {decode, encode} from 'base-64'
if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

//Navigation imports
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';


import { Ionicons } from '@expo/vector-icons';

//Screen imports
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';

import AccountsScreen from './screens/AccountsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogsScreen from './screens/LogsScreen';
import FriendsScreen from './screens/FriendsScreen';

//Firebase imports
import * as firebase from 'firebase';
import firebaseConfig from './config/firebaseConfig';


//Ignore yellow boxes FOR DEVELOPMENT
//console.ignoredYellowBox = ['Setting a timer'];
console.disableYellowBox = true;

//Firebase Initialization
firebase.initializeApp(firebaseConfig);

const AppContainer = createStackNavigator({
  default: createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Ionicons name="md-home" size={24} color={tintColor}/>
        }
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Ionicons name="md-person" size={24} color={tintColor}/>
        }
      },
      Accounts: {
        screen: createStackNavigator({
          Accounts: {
            screen: AccountsScreen,
          },
          Logs: {
            screen: LogsScreen,
          },
        }),
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Ionicons name="md-wallet" size={24} color={tintColor}/>
        }
      },
      Friends: {
        screen: FriendsScreen,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => <Ionicons name="md-people" size={24} color={tintColor}/>
        }
      }
    },
    {
      defaultNavigationOptions: {
        tabBarOnPress: ({navigation, defaultHandler}) => {
          // if (navigation.state.key === "Accounts"){
          //   navigation.navigate("Logs")
          // }
          // else {
          //   defaultHandler();
          // }
          defaultHandler();
        }
      },
      tabBarOptions: {
        activeTintColor: "#161F3D",
        inactiveTintColor: "#B8B8C4",
      }
    }
  )
},
{
  mode: "modal",
  headerMode: "none"
});

const AuthStack = createStackNavigator({
  signup: SignupScreen,
  login: LoginScreen
})

export default createAppContainer (
  //Detail has been added to create another stack for Logs Pages
  createSwitchNavigator (
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)

