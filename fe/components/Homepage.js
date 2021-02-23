import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Text>C-AR-D</Text>
      <Button title="send-button" onPress={() => console.log('clicked send')} />
      <Button
        title="receive-button"
        onPress={() => console.log('clicked receive')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
