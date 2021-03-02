import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import email from 'react-native-email';

export default class SendButton extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="Send Mail" onPress={this.handleEmail} />
      </View>
    );
  }

  handleEmail = () => {
    const { toWhom, message, from } = this.props;
    email(toWhom, {
      subject: 'view your AR message',
      body: 'make sure it works',
    }).catch(console.error);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
