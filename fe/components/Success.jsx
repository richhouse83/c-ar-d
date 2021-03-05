import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Success({ navigation, route }) {
  return (
    <View
      style={{
        height: '100%',
        marginTop: '15%',

        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: '2%',
        paddingLeft: '2%',
        backgroundColor: '#f0ebef',
        paddingBottom: 50,
        width: '100%',
      }}
    >
      <Text style={{ fontSize: 25 }}>Successfully sent your C-AR-D!</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#d2eff1',
          marginTop: '10%',
          height: '15%',
          width: '70%',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="no"
        onPress={() => {
          navigation.navigate('MessagePage', { resetPage: true });
        }}
      >
        <Text style={{ fontSize: 25 }}>Send another C-AR-D!</Text>
      </TouchableOpacity>
    </View>
  );
}
