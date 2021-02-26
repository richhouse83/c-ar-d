import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { RNS3 } from 'react-native-upload-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import { AWS_ACCESS_ID, AWS_SECRET_ID } from '../passkeys';
import { Video, AVPlaybackStatus } from 'expo-av';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import styles from './styles';
import CameraToolbar from './CameraToolbar';

export default class CameraPage extends React.Component {
  state = {
    video: null,
    previewVideo: '',
    hasCameraPermission: null,
    recorded: false,
    recording: false,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off,
    preview: '',
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
        {!this.state.recorded ? (
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
        ) : (
          <SafeAreaView style={styles.preview}>
            <Video
              style={{ width: 300, height: 500 }}
              source={{
                uri: this.state.previewVideo,
              }}
              resizeMode="cover"
              isLooping={true}
              shouldPlay={true}
            />
            <View style={styles.toolbarContainer}>
              <Text style={styles.prevtext}> do you like it ?</Text>
              <TouchableOpacity
                style={styles.prevtext}
                title="yes"
                onPress={() => {
                  this.uploadToS3(this.state.previewVideo);
                  this.setState({ preview: 'liked' });
                }}
              >
                <Text>yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.prevtext}
                title="no"
                onPress={() => {
                  this.setState({ recorded: false });
                }}
              >
                <Text>no</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </>
    );
  }

  async uploadToS3(video) {
    console.log('attempting to upload...');
    const fileName = `${uuidv4()}.mov`;
    const file = {
      uri: this.state.previewVideo,
      name: fileName,
      type: 'video/mov',
    };
    const options = {
      keyPrefix: 'upload/',
      bucket: 'card-eu-west',
      region: 'eu-west-1',
      accessKey: AWS_ACCESS_ID,
      secretKey: AWS_SECRET_ID,
      successActionStatus: 201,
    };
    try {
      const response = await RNS3.put(file, options);
      if (response.status === 201) {
        console.log('Success: ', response.body);
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      } else {
        console.log('Failed to upload image to S3: ', response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleRecording = async () => {
    const { recording, preview } = this.state;

    let video = {};

    if (recording === false) {
      this.setState({ recording: true });
      video = await this.camera.recordAsync({
        maxDuration: 5,
      });
      console.log(video.uri);
      this.setState({
        recording: false,
        recorded: true,
        previewVideo: video.uri,
      });
      if (preview === 'liked') {
        MediaLibrary.saveToLibraryAsync(video.uri);
      }
    } else {
      this.camera.stopRecording();
      console.log(video.uri);
      this.setState({
        recording: false,
        recorded: true,
        previewVideo: video.uri,
      });
      if (preview === 'liked') {
        MediaLibrary.saveToLibraryAsync(video.uri);
      }
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
