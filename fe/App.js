import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Permissions } from 'expo-permissions';

import React, { Component } from 'react';

import CameraPage from './components/CameraPage';

export default class App extends Component {
  render() {
    return (
      <>
        <View>
          <CameraPage />
        </View>
      </>
    );
  }
}
