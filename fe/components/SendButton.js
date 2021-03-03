import React from 'react';
import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default class SendButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: '#80CEE1',
          height: '100%',
          width: '45%',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Send Mail"
        onPress={this.handleEmail}
      >
        <Text style={{ fontSize: 30 }}>Send</Text>
      </TouchableOpacity>
    );
  }

  handleEmail = () => {
    const { hiroUri, email, toWhom, message, from, browserLink } = this.props;
    console.log(this.props);

    MailComposer.composeAsync({
      subject: 'Your AR Birthday cARd',
      recipients: [email],
      body: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align: center;background-color:#d2eff1;padding-top:10%">
      <b style="padding-top:10%;font-size:36px;">Dear ${toWhom}</b><br>
      <b>${from}</b>
      <p style="margin-top:2%;align-self:center;justify-self:center;">has sent you the following message</p><br>
      <p style="margin:2%;padding:10%;background-color:#DEA5A4;width:80%;border-radius:50px;">${message}</p>
      <p style="padding:10%;">to view your message, scan the qr code and follow the instructions, or <a href=${browserLink}>click here</a>.</p>
      </div> 
      
      `,
      isHtml: true,
      attachments: ['file://' + hiroUri],
    });
  };
}
