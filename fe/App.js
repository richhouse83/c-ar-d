import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { Permissions } from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';

import CameraPage from './components/CameraPage';
import Homepage from './components/Homepage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ title: 'Camera Page' }}
        />
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: 'Homepage' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Welcome = ({ navigation }) => {
  return <Button title="scan a C-AR-D" onPress={() => navigation.navigate()} />;
};

const Camera = ({ navigation }) => {
  return (
    <Button
      title="send a C-AR-D"
      onPress={() => navigation.navigate('Welcome')}
    />
  );
};

// const CameraPage = ({Navigation}) => {
//   return (

//   )
// }
export default App;
