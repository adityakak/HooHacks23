import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('./assets/test1.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text lala/>
      <Text lala/>
      <Text lala/>
      <Text lala/>
      <Text lala/>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
  // return  <Button title="Play Sound" onPress={playSound} />

  // return playSound;
}

const styles = StyleSheet.create({ container: { justifyContent: 'center' } });