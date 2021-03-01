import React, { useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },
  images: {
    height: 350,
    alignItems: 'center',
  },
  hiro: {
    position: 'absolute',
    top: 10,
    resizeMode: 'contain',
    height: 350,
    width: 350,
    flex: 1,
  },
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

export default function QrCodeGenerator({ navigation, route }) {
  const viewShotRef = useRef(null);
  const [hiroUri, setHiroUri] = useState('');

  const { fileName, toWhom, from, message } = route.params;

  const onImageLoad = () => {
    viewShotRef.current.capture().then((imguri) => {
      setHiroUri(imguri);
    });
  };
  return (
    <View
      style={{
        paddingRight: 25,
        paddingLeft: 25,
        backgroundColor: '#EAE8FF',
        height: '100%',
        width: '100%',
      }}
    >
      <Text style={{ padding: 60, fontSize: 30, textAlign: 'center' }}>
        {toWhom}
      </Text>
      <ViewShot ref={viewShotRef} style={styles.images}>
        <Image
          onLoad={onImageLoad}
          style={styles.hiro}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/4/48/Hiro_marker_ARjs.png',
          }}
        />
        <QRCode
          style={styles.qrcode}
          value={`https://richhouse83.github.io/c-ar-d-viewer/?video=${fileName}.mp4`}
          size={300}
          quietZone={270}
          backgroundColor="transparent"
        />
      </ViewShot>
      <Text style={{ paddingTop: 20, fontSize: 30, textAlign: 'center' }}>
        {message}
      </Text>
      <Text style={{ paddingTop: 20, fontSize: 30, textAlign: 'center' }}>
        From:{from}
      </Text>
    </View>
  );
}
