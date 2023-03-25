import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import SoundPlayer from 'react-native-sound-player'


export default function App() {
  return (
    <View style={styles.container}>
      <Text>ASDFCJASDLFKCJALDKSJFCASDF</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
