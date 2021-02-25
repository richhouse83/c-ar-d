import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
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
          name="Home"
          component={Home}
          options={{ title: 'Homepage' }}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{ title: 'Camera Page' }}
        />
        <Stack.Screen
          name="Send"
          component={Send}
          options={{ title: 'Send Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Home = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        style={styling.button}
        title="send a C-AR-D"
        onPress={() => navigation.navigate('Send')}
      >
        <Text>Test button</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styling.button}
        title="scan a C-AR-D"
        onPress={() => navigation.navigate('Camera')}
      >
        <Text>Test button</Text>
      </TouchableOpacity>
    </View>
  );
};

const Camera = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styling.button}
      title="placeholder"
      onPress={() => navigation.navigate()}
    >
      <Text>Test button</Text>
    </TouchableOpacity>
  );
};

const Send = ({ navigation }) => {
  return (
    <Text>Text</Text>
    // <TouchableOpacity title="send a C-AR-D" onPress={() => navigation.navigate('Send')} />
  );
};

const styling = StyleSheet.create({
  button: {
    backgroundColor: '#DDDDDD',
  },
});

export default App;
