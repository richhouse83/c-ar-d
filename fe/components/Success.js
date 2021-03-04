import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Success() {
  return (
    <View
      style={{
        height: '100%',
        marginTop: '15%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '2%',
        paddingLeft: '2%',
        backgroundColor: '#f0ebef',
        paddingBottom: 50,
        width: '100%',
      }}
    >
      <Text>You have successfully sent your card !</Text>
      <TouchableOpacity
        style={styles.edit}
        disabled={uploaded ? true : false}
        title="no"
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.text}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}
