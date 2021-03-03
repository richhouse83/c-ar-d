import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export default class SendButton extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#DEA5A4',
          height: '7%',
          width: '40%',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '15%',
        }}
      >
        <Button title="Send Mail" onPress={this.handleEmail} />
      </View>
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
      <br style="margin-top:10%;align-self:center;justify-self:center;"> ${from} <br>has sent you the following message</br><br>
      <p style="padding-top:10%;background-color:#DEA5A4;width:80%;border-radius:50;">${message}</p>
      <p style="padding-top:10%;">to view your message, scan the qr code and follow the instructions, or <a href=${browserLink}>click here</a>.</p>
      </div> 
      
      `,
      isHtml: true,
      attachments: ['file://' + hiroUri],
    });
  };
}
