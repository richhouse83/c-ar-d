import React, { Component } from 'react';
import {
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class MessagePage extends Component {
  state = {
    toWhom: '',
    message: '',
    from: '',
  };
  componentDidMount() {
    this.userInstructions();
  }

  reset = () => {
    this.setState({ toWhom: '', message: '', from: '' });
  };
  userInstructions = () => {
    Alert.alert(
      'Create a c-AR-d',
      'Fill in all the fields, and press the record video button',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };
  render() {
    const { toWhom, message, from } = this.state;
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: '10%',
          height: '100%',
          backgroundColor: '#f0ebef',
        }}
        behavior="height"
      >
        <TextInput
          style={{
            textAlign: 'center',
            fontSize: 30,
            marginTop: '5%',
            height: '8%',
            backgroundColor: '#d2eff1',
            borderRadius: 10,
          }}
          placeholder="Dear..."
          onChangeText={(event) => {
            this.setState({ toWhom: event });
          }}
          defaultValue={toWhom}
        />
        <TextInput
          style={{
            textAlign: 'center',

            fontSize: 30,
            height: '40%',
            marginTop: '20%',
            backgroundColor: '#feffff',
            borderRadius: 10,
          }}
          placeholder="Your message"
          onChangeText={(event) => {
            this.setState({ message: event });
          }}
          defaultValue={message}
        />
        <TextInput
          style={{
            textAlign: 'center',

            marginTop: '20%',
            fontSize: 30,
            backgroundColor: '#EAE8FF',
            borderRadius: 10,
          }}
          placeholder="From..."
          onChangeText={(event) => {
            this.setState({ from: event });
          }}
          defaultValue={from}
        />
        <SafeAreaView style={createBtnStyle}>
          <TouchableOpacity
            disabled={!toWhom || !message || !from}
            title=""
            onPress={() =>
              this.props.navigation.navigate('Camera', {
                ...this.state,
                reset: this.reset,
              })
            }
          >
            <Text style={styles.text}>
              {!toWhom || !message || !from
                ? 'Fill in all fields'
                : 'Record Video Message'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  height: '15%',
  width: '100%',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20%',
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },

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
