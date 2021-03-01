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
      <View style={{ padding: 40, height: '100%', backgroundColor: '#f0ebef' }}>
        <TextInput
          style={{
            textAlign: 'center',
            fontSize: 30,
            marginTop: 30,
            height: 70,
            backgroundColor: '#d2eff1',
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
            height: 300,
            marginTop: 30,
            backgroundColor: '#feffff',
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
            height: 70,
            marginTop: 30,
            fontSize: 30,
            backgroundColor: '#EAE8FF',
            borderStyle: 'solid',
            borderRadius: 10,
            borderWidth: 2,
          }}
          placeholder="From..."
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
            <Text style={styles.text}>Record Video Message </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    );
  }
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  height: 120,
  width: 300,
  borderRadius: 50,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 50,
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
