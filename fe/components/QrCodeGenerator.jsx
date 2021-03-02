import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Image,
  TouchableOpacity,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import { RNS3 } from 'react-native-upload-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import { SelfBuildingSquareSpinner } from 'react-native-epic-spinners';
import { AWS_ACCESS_ID, AWS_SECRET_ID } from '../passkeys';

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },
  images: {
    height: '46%',
    alignItems: 'center',
  },
  hiro: {
    position: 'absolute',
    // resizeMode: 'contain',
    top: '12%',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  upload: {
    marginTop: '15%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e9e998',
    marginBottom: '8%',
    height: '2%',
  },
  loader: {
    flex: 1,
  },
  uploadText: {
    flex: 1,
  },

  container: {
    paddingRight: '2%',
    paddingLeft: '2%',
    backgroundColor: '#EAE8FF',
    height: '100%',
    width: '100%',
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
  toolbarContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default function QrCodeGenerator({ navigation, route }) {
  const viewShotRef = useRef(null);
  const [hiroUri, setHiroUri] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    toWhom, from, message, videoUri,
  } = route.params;

  const fileName = uuidv4();

  const onImageLoad = () => {
    viewShotRef.current.capture().then((imguri) => {
      setHiroUri(imguri);
    });
  };

  const uploadToS3 = async (video) => {
    console.log('attempting to upload...');
    const file = {
      uri: video,
      name: `${fileName}.mov`,
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
        setUploaded(true);
      } else {
        console.log('Failed to upload image to S3: ', response);
        setErrorMsg('Upload failed, please try again');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
    }
  };

  useEffect(() => {
    if (!uploaded) {
      setTimeout(() => {
        setUploaded(true);
      }, 3000);
      // uploadToS3(videoUri);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upload}>
        {!uploaded && (
          <SelfBuildingSquareSpinner
            style={styles.loader}
            color="black"
            size={10}
          />
        )}

        <Text style={styles.uploadText}>
          {uploaded ? 'Upload Successful!' : 'Uploading video....'}
        </Text>
        <Text
          style={{
            padding: 60,
            fontSize: 30,
            textAlign: 'center',
          }}
        >
          {toWhom}
        </Text>
      </View>
      <View>
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
            size={335}
            quietZone={300}
            backgroundColor="transparent"
          />
        </ViewShot>
        <Text style={{ paddingTop: '5%', fontSize: 30, textAlign: 'center' }}>
          {message}
        </Text>
        <Text style={{ paddingTop: '5%', fontSize: 30, textAlign: 'center' }}>
          From:
          {from}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.useVideo}
            title="yes"
            onPress={() => {
              navigation.navigate('SendButton');
            }}
          >
            <Text
              style={{
                color: 'black',
                alignSelf: 'center',
                fontSize: 15,
                textAlign: 'center',

                marginTop: '25%',
              }}
            >
              send
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
                fontSize: 15,
                textAlign: 'center',
                color: 'black',
                alignSelf: 'center',

                marginTop: '25%',
              }}
            >
              Reset everything
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
