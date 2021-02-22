/* eslint-disable no-use-before-define */
/* eslint-disable object-curly-newline */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
// import * as FileSystem from 'expo-file-system';
// import { google } from 'googleapis';
import { listFiles } from '../google-drive-api/functions';

import { googleDriveApi } from '../google-drive-api/google';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [recording, setRecording] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back,
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: 'center' }}
            onPress={async () => {
              let video = {};
              if (!recording) {
                googleDriveApi(listFiles);
                setRecording(true);
                video = await cameraRef.recordAsync({
                  maxDuration: 5,
                });
                console.log('video', video.uri);
                setRecording(false);
                MediaLibrary.saveToLibraryAsync(video.uri);
              } else {
                setRecording(false);
                cameraRef.stopRecording();
                MediaLibrary.saveToLibraryAsync(video.uri);
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: '50%',
                borderColor: 'white',
                height: 50,
                width: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 25,
                  borderColor: recording ? 'blue' : 'red',
                  height: 40,
                  width: 40,
                  backgroundColor: recording ? 'blue' : 'red',
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
