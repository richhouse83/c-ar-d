/* eslint-disable object-curly-newline */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import { RNS3 } from 'react-native-upload-aws-s3';
import { v4 as uuidv4 } from 'uuid';
import { SelfBuildingSquareSpinner } from 'react-native-epic-spinners';
import { AWS_ACCESS_ID, AWS_SECRET_ID } from '../passkeys';
import SendButton from './SendButton';

const styles = StyleSheet.create({
  images: {
    width: '90%',
    height: 400,
    alignItems: 'center',
  },
  hiro: {
    position: 'absolute',
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  uploadText: {
    margin: 20,
  },
  upload: {
    width: '90%',

    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#e9e998',
    borderRadius: 10,
  },
  messages: {
    width: '90%',
    backgroundColor: '#feffff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 30,
  },
  messageText: {
    padding: 20,
  },
  container: {
    height: '130%',
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '2%',
    paddingLeft: '2%',
    backgroundColor: '#f0ebef',
    paddingBottom: 50,
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
  const [sendEmail, setSendEmail] = useState('');
  const { toWhom, from, message, videoUri } = route.params;
  const fileName = uuidv4();
  const browserLink = `https://richhouse83.github.io/c-ar-d-viewer/?video=${fileName}.mp4&message=Happy%20Birthday%20${toWhom}%21`;

  const onImageLoad = () => {
    viewShotRef.current.capture().then((imguri) => {
      setHiroUri(imguri);
    });
  };

  const uploadToS3 = async (video) => {
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
        setUploaded(true);
      } else {
        setErrorMsg('Upload failed, please try again');
      }
    } catch (error) {
      setErrorMsg(error);
    }
  };

  useEffect(() => {
    if (!uploaded) {
      // setTimeout(() => {
      //   setUploaded(true);
      // }, 3000);
      uploadToS3(videoUri);
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
        <Text style={[styles.text, styles.messageText]}>
          Your message reads:
        </Text>
        <Text style={[styles.text, styles.messageText]}>
          Dear
          {toWhom}
        </Text>
        <Text style={[styles.text, styles.messageText]}>{message}</Text>
        <Text style={[styles.text, styles.messageText]}>{from}</Text>
      </View>
      <TextInput
        style={{
          textAlign: 'center',
          fontSize: 30,
          backgroundColor: '#d2eff1',
          height: '7%',
          width: '90%',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5%',
          marginTop: '5%',
        }}
        placeholder="recipient email"
        onChangeText={(text) => {
          setSendEmail(text);
        }}
      />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.edit}
          disabled={!!uploaded}
          title="no"
          onPress={() => {
            navigation.navigate('MessagePage');
          }}
        >
          <Text style={styles.text}>Edit</Text>
        </TouchableOpacity>
        <SendButton
          email={sendEmail}
          browserLink={browserLink}
          hiroUri={hiroUri}
          {...route.params}
        />
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
          value={`https://richhouse83.github.io/c-ar-d-viewer/?video=${fileName}.mp4&message=Happy%20Birthday%20${toWhom}%21`}
          size={326}
          quietZone={350}
          backgroundColor="transparent"
        />
      </ViewShot>
    </ScrollView>
  );
}
