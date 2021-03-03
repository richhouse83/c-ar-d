import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CameraPage from './components/CameraPage';
import Homepage from './components/Homepage';
import QrCodeGenerator from './components/QrCodeGenerator';
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
        component={Homepage}
        options={{ title: 'Homepage' }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraPage}
        options={{ title: 'Camera Page' }}
      />

      <Stack.Screen
        name="MessagePage"
        component={MessagePage}
        options={{ title: 'Message page' }}
      />

      <Stack.Screen
        name="QRcode"
        component={QrCodeGenerator}
        options={{ title: 'QrCode' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
