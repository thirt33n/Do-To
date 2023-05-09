import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginPage,{Check} from './Screens/LoginPage';
import SignupPage from './Screens/SignupPage';
import HomePage from './Screens/HomePage';
// import Check from './Screens/List';
import SettingsPage from './Screens/Settings';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


export function TabNavigation()
{
  return(

    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={({route}) => ({
        tabBarIcon:({color,size}) =>
        {
          if(route.name === 'Home'){
            return <FontAwesome name="home" size={size} color={color} />
          }
          else if(route.name === 'Settings'){
            return <Ionicons name="settings" size={size} color={color} />
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarHideOnKeyboard: 'true',
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ]


      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Check">
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerTitle: 'Login ' }}/>
            <Stack.Screen name="SignupPage" component={SignupPage} options={{ headerTitle: 'Signup' }}/>
            <Stack.Screen name="HomePage" component={TabNavigation} options={{ headerShown: false,headerLeft: null,gestureEnabled: false }}/>
            <Stack.Screen name="Check" component={Check} options={{ headerShown: false,headerLeft: null,gestureEnabled: false }}/>
      </Stack.Navigator>
    </NavigationContainer>




  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
