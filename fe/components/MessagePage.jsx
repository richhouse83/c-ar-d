import React, { Component } from 'react'
import { TextInput, View, TouchableOpacity, SafeAreaView, StyleSheet, Text, } from 'react-native';



export default class MessagePage extends Component {
  state = {
    toWhom: '',
    message:'',
    from: '',
  }
  render() {
    console.log(this.state.from)
    return (
      <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here"
        onChangeText={(event) => {this.setState({toWhom:event})}}
        defaultValue={this.state.toWhom}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here"
        onChangeText={(event) => {this.setState({message:event})}}
        defaultValue={this.state.message}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here"
        onChangeText={(event) => {this.setState({from:event})}}
        defaultValue={this.state.from}
      />
      <SafeAreaView style={createBtnStyle}>
          <TouchableOpacity
            title=""
            onPress={() => this.props.navigation.navigate('Camera', {...this.state})}
          >
            <Text style={styles.text}>Create C-AR-D</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </View>

    )

  }
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  width: 300,
  position: 'absolute',
  top: 300,
  borderRadius: 50,
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
