import React from 'react';
import { View, Text } from 'react-native';
import * as Permissions from 'expo-permissions';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import styles from './styles';
import CameraToolbar from './CameraToolbar';

export default class CameraPage extends React.Component {
  camera = null;

  state = {
    hasCameraPermission: null,
    recording: false,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
  };
  async componentDidMount() {
    const { status, permissions } = await Permissions.askAsync(
      Permissions.CAMERA,
    );

    if (status === 'granted') {
      this.setState({ hasCameraPermission: status });
    }
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Access to camera has been denied.</Text>;
    }

    return (
      <>
        <View>
          <Camera
            style={styles.preview}
            flashMode={this.state.flashMode}
            type={this.state.cameraType}
            ref={(ref) => (this.camera = ref)}
          />
        </View>
        <CameraToolbar
          {...this.state}
          handleFlashMode={this.handleFlashMode}
          handleRecording={this.handleRecording}
          handleType={this.handleType}
        />
      </>
    );
  }
  handleRecording = async () => {
    const { recording } = this.state;
    let video = {};
    if (recording === false) {
      this.setState({ recording: true });
      video = await this.camera.recordAsync({
        maxDuration: 5,
      });
      console.log(video.uri);
      this.setState({ recording: false });
      MediaLibrary.saveToLibraryAsync(video.uri);
    } else {
      this.setState({ recording: false });
      this.camera.stopRecording();
    }
  };
  handleType = () => {
    const { cameraType } = this.state;
    if (cameraType === Camera.Constants.Type.front) {
      this.setState({
        cameraType: Camera.Constants.Type.back,
      });
    } else if (cameraType === Camera.Constants.Type.back) {
      this.setState({
        cameraType: Camera.Constants.Type.front,
      });
    }
  };
  handleFlashMode = () => {
    const { flashMode } = this.state;
    if (flashMode === Camera.Constants.FlashMode.off) {
      this.setState({
        flashMode: Camera.Constants.FlashMode.on,
      });
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      this.setState({
        flashMode: Camera.Constants.FlashMode.off,
      });
    }
  };
}
