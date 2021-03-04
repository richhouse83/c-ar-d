import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';

export default function Homepage({ navigation, route }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/background.jpg')}
    >
      <View style={styles.container}>
        <Image
          style={styles.logoMain}
          source={require('../components/Logo.png')}
        />
        <SafeAreaView style={createBtnStyle}>
          <TouchableOpacity
            title="!"
            onPress={() =>
              navigation.navigate('MessagePage', { resetPage: false })
            }
          >
            <Text style={styles.text}>Create a C-AR-D ✏️</Text>
          </TouchableOpacity>
        </SafeAreaView>
        <SafeAreaView style={scanBtnStyle}>
          <TouchableOpacity
            title="Scan a C-AR-D"
            onPress={() => navigation.navigate('Camera')}
          >
            <Text style={styles.text}>Scan a C-AR-D 📷</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
const createBtnStyle = {
  backgroundColor: '#80CEE1',
  height: 100,
  width: 300,
  position: 'absolute',
  top: 150,
  borderRadius: 40,
  justifyContent: 'center',
};
const scanBtnStyle = {
  backgroundColor: '#DEA5A4',
  height: 100,
  width: 300,
  position: 'absolute',
  top: 300,
  borderRadius: 40,
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'flex-end' },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Arial',
  },
  logoMain: {
    resizeMode: 'contain',
    height: '12%',
    top: '25%',
    left: '-1.3%',
  },
});
