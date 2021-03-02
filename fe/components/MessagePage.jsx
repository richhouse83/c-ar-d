import React, { Component } from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';

export default class MessagePage extends Component {
  state = {
    toWhom: '',
    message: '',
    from: '',
  };
  render() {
    console.log(this.state.from);
    return (
      <View style={{ padding: '10%', height: '100%', backgroundColor: '#ADACB5' }}>
        <TextInput
          style={{
            textAlign: 'center',
            fontSize: 30,
            marginTop: '5%',
            height: '8%',
            backgroundColor: '#EAE8FF',
            borderStyle: 'solid',
            borderRadius: 10,
            borderWidth: 2,
          }}
          placeholder="Dear..."
          onChangeText={(event) => {
            this.setState({ toWhom: event });
          }}
          defaultValue={this.state.toWhom}
        />
        <TextInput
          style={{
            textAlign: 'center',
            wordWrap: 'normal',
            fontSize: 30,
            height: '40%',
            marginTop: '20%',
            backgroundColor: '#EAE8FF',
            borderStyle: 'solid',
            borderRadius: 10,
            borderWidth: 2,
          }}
          placeholder="Your message"
          onChangeText={(event) => {
            this.setState({ message: event });
          }}
          defaultValue={this.state.message}
        />
        <TextInput
          style={{
            textAlign: 'center',
            height: '8%',
            marginTop: '20%',
            fontSize: 30,
            backgroundColor: '#EAE8FF',
            borderStyle: 'solid',
            borderRadius: 10,
            borderWidth: 2,
          }}
          placeholder="From ..."
          onChangeText={(event) => {
            this.setState({ from: event });
          }}
          defaultValue={this.state.from}
        />
        <SafeAreaView style={createBtnStyle}>
          <TouchableOpacity
            title=""
            onPress={() =>
              this.props.navigation.navigate('Camera', { ...this.state })
            }
          >
            <Text style={styles.text}>Record AR Video</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  height: '15%',
  width: '100%',
  borderRadius: 50,
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
