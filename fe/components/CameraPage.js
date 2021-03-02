import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Video, AVPlaybackStatus } from 'expo-av';

import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import styles from './styles';
import CameraToolbar from './CameraToolbar';
import { Col, Row, Grid } from 'react-native-easy-grid';

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
              scan={this.props.route.params}
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
            </View>
          </View>
        )}
      </>
    );
  }

  // async uploadToS3(video) {
  //   console.log('attempting to upload...');
  //   const fileName = uuidv4();
  //   const file = {
  //     uri: this.state.previewVideo,
  //     name: `${fileName}.mov`,
  //     type: 'video/mov',
  //   };
  //   const options = {
  //     keyPrefix: 'upload/',
  //     bucket: 'card-eu-west',
  //     region: 'eu-west-1',
  //     accessKey: AWS_ACCESS_ID,
  //     secretKey: AWS_SECRET_ID,
  //     successActionStatus: 201,
  //   };
  //   this.props.navigation.navigate('QRcode', {
  //     ...this.props.route.params,
  //     fileName,
  //   });
  //   try {
  //     const response = await RNS3.put(file, options);
  //     if (response.status === 201) {
  //       console.log('Success: ', response.body);
  //       /**
  //        * {
  //        *   postResponse: {
  //        *     bucket: "your-bucket",
  //        *     etag : "9f620878e06d28774406017480a59fd4",
  //        *     key: "uploads/image.png",
  //        *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
  //        *   }
  //        * }
  //        */
  //     } else {
  //       console.log('Failed to upload image to S3: ', response);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
    } else {
      video = this.camera.stopRecording();
      console.log(video.uri);
      this.setState({
        recording: false,
        recorded: true,
        previewVideo: video.uri,
      });
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
        flashMode: Camera.Constants.FlashMode.torch,
      });
    } else if (flashMode === Camera.Constants.FlashMode.torch) {
      this.setState({
        flashMode: Camera.Constants.FlashMode.off,
      });
    }
  };
}
