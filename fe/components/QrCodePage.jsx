import React from 'react';
import QRCode from 'react-native-qrcode-svg';

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function QrCodePage({ navigation, route }) {
  const { fileName, toWhom, from, message } = route.params;
  console.log(route.params);
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.container}>
        <Text style={styles.title}>QrCode</Text>
        <Text>
          https://richhouse83.github.io/c-ar-d-viewer/?video={fileName}.mp4
        </Text>
        <QRCode
          value={`https://richhouse83.github.io/c-ar-d-viewer/?video=${fileName}.mp4`}
          size={200}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    position: 'absolute',
    top: 150,
    fontSize: 40,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
});
