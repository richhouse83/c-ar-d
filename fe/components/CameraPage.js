import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Video } from 'expo-av';

import { Camera } from 'expo-camera';

import styles from './styles';
import CameraToolbar from './CameraToolbar';

import * as ScreenOrientation from 'expo-screen-orientation';

export default class CameraPage extends React.Component {
  state = {
    video: null,
    previewVideo: '',
    hasCameraPermission: null,
    recorded: false,
    recording: false,
    cameraType: Camera.Constants.Type.front,
    flashMode: Camera.Constants.FlashMode.off,
    preview: '',
  };
  async componentDidMount() {
    if (!this.props.route.params) {
      this.setState({ cameraType: Camera.Constants.Type.back });
    }
    /*     await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE,
    ); */
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA,
    );

    if (status === 'granted') {
      this.setState({ hasCameraPermission: status });
    }
  }

  render() {
    console.log(this.state.previewVideo);
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Access to camera has been denied.</Text>;
    }

    const isRecordingMode = this.props.route.params;

    return (
      <>
        {!this.state.recorded ? (
          <>
            <View>
              <Camera
                style={styles.preview}
                flashMode={this.state.flashMode}
                type={this.state.cameraType}
                ref={(ref) => (this.camera = ref)}
                onBarCodeScanned={async (data) => {
                  if (
                    data.data.startsWith(
                      'https://richhouse83.github.io/c-ar-d-viewer/',
                    ) &&
                    !isRecordingMode
                  ) {
                    console.log(isRecordingMode);
                    await Linking.openURL(data.data);
                  }
                }}
              />
            </View>
            <CameraToolbar
              scan={isRecordingMode}
              {...this.state}
              handleFlashMode={this.handleFlashMode}
              handleRecording={this.handleRecording}
              handleType={this.handleType}
            />
          </>
        ) : (
          <View style={styles.preview}>
            <Video
              style={{ width: '100%', height: '85%' }}
              source={{
                uri: this.state.previewVideo,
              }}
              resizeMode="cover"
              isLooping={this.state.preview === 'liked' ? false : true}
              shouldPlay={true}
            />
            <View style={styles.toolbarContainer}>
              <TouchableOpacity
                style={styles.retake}
                title="no"
                onPress={() => {
                  this.setState({ recorded: false });
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    textAlign: 'center',
                    color: 'white',
                    alignSelf: 'center',

                    marginTop: '25%',
                  }}
                >
                  Retake
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.useVideo}
                title="yes"
                onPress={() => {
                  this.props.navigation.navigate('QRcode', {
                    ...this.props.route.params,
                    videoUri: this.state.previewVideo,
                  });
                  this.setState({ preview: 'liked' });
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 30,
                    textAlign: 'center',

                    marginTop: '25%',
                  }}
                >
                  Use Video
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }

  handleRecording = async () => {
    const { recording, preview } = this.state;

    let video = {};

    if (recording === false) {
      this.setState({ recording: true });
      video = await this.camera.recordAsync({
        maxDuration: 5,
      });
      this.setState({
        recording: false,
        recorded: true,
        previewVideo: video.uri,
      });

      console.log(video.uri);
    } else if (recording === true) {
      video = this.camera.stopRecording();

      this.setState({
        recording: false,
        recorded: true,
        previewVideo: video.uri,
      });
    }
  };
  handleType = () => {
    const { cameraType } = this.state;
    if (cameraType === Camera.Constants.Type.back) {
      this.setState({
        cameraType: Camera.Constants.Type.front,
      });
    } else if (cameraType === Camera.Constants.Type.front) {
      this.setState({
        cameraType: Camera.Constants.Type.back,
      });
    }
  };
  handleFlashMode = () => {
    const { flashMode } = this.state;
    if (flashMode === Camera.Constants.FlashMode.off) {
      this.setState({
        flashMode: Camera.Constants.FlashMode.torch,
      });
    } else if (flashMode === Camera.Constants.FlashMode.torch) {
      this.setState({
        flashMode: Camera.Constants.FlashMode.off,
      });
    }
  };
}
