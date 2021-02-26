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

export default function QrCodePage({ navigation, route }) {
  const viewShotRef = useRef(null);
  const [hiroQr, setHiroQr] = useState('');
  const { fileName } = route.params;

  const onCapture = (uri) => {
    setHiroQr(uri);
  };
  const onImageLoad = () => {
    viewShotRef.current.capture();
  };
  return (
    <View style={styles.container}>
      <Button
        title="Click here to see your AR message"
        onPress={() => {
          Linking.openURL(
            `https://richhouse83.github.io/c-ar-d-viewer/?video=${fileName}.mp4`,
          ).catch((err) => {
            // eslint-disable-next-line no-console
            console.error('Failed opening page because: ', err);
            // eslint-disable-next-line no-alert
            alert('Failed to open page');
          });
        }}
      />
      <ViewShot ref={viewShotRef} onCapture={onCapture}>
        <View style={styles.images}>
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
        </View>
      </ViewShot>
    </View>
  );
}
