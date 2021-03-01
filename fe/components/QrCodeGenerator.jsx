import React, { useRef, useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';

import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },
  images: {
    width: 400,
    height: 400,
    alignItems: 'center',
  },
  hiro: {
    position: 'absolute',
    resizeMode: 'contain',
    height: 400,
    width: 400,
    flex: 1,
  },
  qrcode: {
    position: 'absolute',
    top: 150,
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
    <View style={{
      height:500,
      width:90%,
    }}>
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
          size={320}
          quietZone={300}
          backgroundColor="transparent"
        />
      </ViewShot>
    </View>
  );
}
