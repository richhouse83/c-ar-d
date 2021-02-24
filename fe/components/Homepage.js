import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
} from 'react-native';

import background from '../assets/background.jpg';

export default function App() {
  return (
    <ImageBackground style={styles.background} source={background}>
      <View style={styles.container}>
        <Text style={styles.text}>C-AR-D</Text>
        <SafeAreaView style={createBtnStyle}>
          <Button
            color="white"
            title="Create a C-AR-D"
            onPress={() => console.log('clicked create')}
          />
        </SafeAreaView>
        <SafeAreaView style={scanBtnStyle}>
          <Button
            color="white"
            title="Scan a C-AR-D"
            onPress={() => console.log('clicked scan')}
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  width: 300,
  position: 'absolute',
  top: 300,
  borderRadius: 50,
};
const scanBtnStyle = {
  backgroundColor: '#DEA5A4',
  width: 300,
  position: 'absolute',
  top: 380,
  borderRadius: 50,
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    position: 'absolute',
    top: 150,
    fontSize: 40,
    fontWeight: 'bold',
  },
});
