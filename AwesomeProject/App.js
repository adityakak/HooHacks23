import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { Button } from 'react-native';

import { View, Text, StyleSheet } from 'react-native';


export default function App() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/akash.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const imageToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to convert image to base64'));
      reader.readAsDataURL(blob);
    });
  };



  const uploadImage = async () => {

    // Get the base64 string
    base64  = await imageToBase64(require('./assets/room.png'));
    console.log(base64);
      // Make a POST request to Flask server

      const endpoint = "http://172.25.185.145:5000/";
      
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: base64
        })
      })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
      })
      .catch(error => {
        // Handle errors
      });

      console.log("daddy")
      
  }

  
  



  return (
    <View style={styles.container}>
    <Button title="Send Data" onPress={uploadImage} />
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
