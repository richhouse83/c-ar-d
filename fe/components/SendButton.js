import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import Input from './PNGQR';

export default class SendButton extends React.Component {
  render() {
    return (
      <View>
        <Button title="Send Mail" onPress={this.handleEmail} />
      </View>
    );
  }

  handleEmail = () => {
    const { hiroUri, email, toWhom, message, from } = this.props;
    console.log(this.props);

    MailComposer.composeAsync({
      subject: 'Your AR Birthday cARd',
      recipients: [email],
      body: `<div style="text-align: center;"><b>dear ${toWhom}</b>
      <b> ${from}has sent you the following message</b>
      <p>${message}</p>
      <p>to view your message, scan the qr code and follow the instructions</p>
      </div>
      
      `,
      isHtml: true,
      attachments: ['file://' + hiroUri],
    });
  };
}
