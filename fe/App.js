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
import QrCodePage from './components/QrCodePage';
import MessagePage from './components/MessagePage';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Homepage} // Links to the custom created homepage (With Dog)
        options={{ title: 'Homepage' }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraPage} // Needs to link to the camera app the backend team made
        options={{ title: 'Camera Page' }}
      />
      {/* <Stack.Screen
          name="Send"
          component={Send} // Needs to
          options={{ title: 'Send Page' }}
        /> */}
      <Stack.Screen
        name="MessagePage"
        component={MessagePage} // Links to the custom created homepage (With Dog)
        options={{ title: 'Message page' }}
      />
      <Stack.Screen
        name="QRcode"
        component={QrCodePage} // Needs to
        options={{ title: 'QrCode Page' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

// const Home = ({ navigation }) => {
//   return (
//     <View>
//       <TouchableOpacity
//         style={styling.button}
//         title="QR"
//         onPress={() => navigation.navigate('QRcode')}
//       >
//         <Text>Test button</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styling.button}
//         title="scan a C-AR-D"
//         onPress={() => navigation.navigate('Camera')}
//       >
//         <Text>Test button</Text>
//       </TouchableOpacity>
//       {/* <TouchableOpacity
//         style={styling.button}
//         title="send a QRCode"
//         onPress={() => navigation.navigate('QRcode')}
//       >
//         <Text>Test button</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const Camera = ({ navigation }) => {
//   return (
//     <TouchableOpacity
//       style={styling.button}
//       title="placeholder"
//       onPress={() => navigation.navigate()}
//     >
//       <Text>Test button</Text>
//     </TouchableOpacity>
//   );
// };

// const Send = ({ navigation }) => {
//   return (
//     <Text>Text</Text>
//     // <TouchableOpacity title="send a C-AR-D" onPress={() => navigation.navigate('Send')} />
//   );
// };

const styling = StyleSheet.create({
  button: {
    backgroundColor: '#80CEE1',
    width: 300,
    top: 300,
    borderRadius: 50,
  },
});

export default App;
