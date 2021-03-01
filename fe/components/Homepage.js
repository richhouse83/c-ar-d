import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function Homepage({ navigation, route }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.container}>
        <Text style={styles.title}>C-AR-D</Text>
        <SafeAreaView style={createBtnStyle}>
          <TouchableOpacity
            title="!"
            onPress={() => navigation.navigate('MessagePage')}
          >
            <Text style={styles.text}>Create C-AR-D</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={scanBtnStyle}>
          <TouchableOpacity
            title="Scan a C-AR-D"
            onPress={() => navigation.navigate('Camera')}
          >
            <Text style={styles.text}>Scan a C-AR-D</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  width: 300,
  position: 'absolute',
  top: 300,
  borderRadius: 50,
};
const scanBtnStyle = {
  backgroundColor: '#DEA5A4',
  width: 300,
  position: 'absolute',
  top: 380,
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
