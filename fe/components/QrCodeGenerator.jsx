import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
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
  images: {
    width: '90%',
    alignItems: 'center',
  },
  hiro: {
    position: 'absolute',
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  upload: {
    marginTop: '15%',
    width: '90%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#e9e998',
    marginBottom: '1%',
    borderRadius: 10,
  },
  messages: {
    width: '90%',
    backgroundColor: '#feffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '2%',
    paddingLeft: '2%',
    backgroundColor: '#f0ebef',
    height: '100%',
    width: '100%',
  },

  confirm: {
    backgroundColor: '#80CEE1',
    height: '100%',
    width: '45%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  edit: {
    backgroundColor: '#C1292E',
    height: '100%',
    width: '45%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    height: '10%',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    <ScrollView contentContainerStyle={styles.container}>
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
          {errorMsg}
        </Text>
      </View>
      <View style={styles.messages}>
        <Text style={styles.text}>Your message reads</Text>
        <Text style={styles.text}>{toWhom}</Text>
        <Text style={styles.text}>{message}</Text>
        <Text style={styles.text}>{from}</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.edit}
          title="no"
          onPress={() => {
            navigation.navigate('MessagePage');
          }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.confirm}
          title="yes"
          onPress={() => {
            navigation.navigate('PNGQR', {
              toWhom,
              from,
              message,
              hiroUri,
            });
          }}
        >
          <Text>send</Text>
        </TouchableOpacity>
      </View>

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
          value={`https://richhouse83.github.io/c-ar-d-viewer/?video=${fileName}.mp4`}
          size={400}
          quietZone={530}
          backgroundColor="transparent"
        />
      </ViewShot>
    </ScrollView>
  );
}
