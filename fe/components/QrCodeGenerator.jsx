import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import { RNS3 } from 'react-native-upload-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import { SelfBuildingSquareSpinner } from 'react-native-epic-spinners';
import { AWS_ACCESS_ID, AWS_SECRET_ID } from '../passkeys';

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
  upload: {
    width: 300,
    alignItems: 'center',
    backgroundColor: '#e9e998',
    marginBottom: 30,
    height: 100,
  },
  loader: {
    flex: 1,
  },
  uploadText: {
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
    marginTop: 20,
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
  const [uploaded, setUploaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { toWhom, from, message, videoUri } = route.params;

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
        setErrorMsg('Upload failed, please try again');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error);
    }
  };

  useEffect(() => {
    if (!uploaded) {
      uploadToS3(videoUri);
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
            size={320}
            quietZone={300}
            backgroundColor="transparent"
          />
        </ViewShot>
      </View>
    </View>
  );
}
