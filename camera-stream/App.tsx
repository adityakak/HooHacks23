import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av';
import { LogBox } from 'react-native';

let camera: Camera
// var photoNumber: any
// const imageFilepath: string = "scannedPhoto"

export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')
  const [photoNumber, setPhotoNumber] = React.useState(0)
  const [depth, setDepth] = React.useState(0)
  const [waitingResponse, setWaitingResponse] = React.useState(false)
  const [audio, setAudio] = useState<Audio.Sound>();
  const [frequency, setFrequency] = React.useState(String);

  const soundObject = new Audio.Sound();

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  LogBox.ignoreLogs(['Warning: ...']);

  async function playSound() { 
      
    if(soundObject._loaded){
      await soundObject.unloadAsync();
    }
   

    if (frequency === "400") {
      await soundObject.loadAsync(require('./assets/400.mp3'));
    } else if (frequency === "425") {
      await soundObject.loadAsync(require('./assets/425.mp3'));
    } else if (frequency === "450") {
      await soundObject.loadAsync(require('./assets/450.mp3'));
    } else if (frequency === "475") {
      await soundObject.loadAsync(require('./assets/475.mp3'));
    } else if (frequency === "500") {
      await soundObject.loadAsync(require('./assets/500.mp3'));
    } else if (frequency === "525") {
      await soundObject.loadAsync(require('./assets/525.mp3'));
    } else if (frequency === "550") {
      await soundObject.loadAsync(require('./assets/550.mp3'));
    } else if (frequency === "575") {
      await soundObject.loadAsync(require('./assets/575.mp3'));
    } else if (frequency === "600") {
      await soundObject.loadAsync(require('./assets/600.mp3'));
    } else if (frequency === "625") {
      await soundObject.loadAsync(require('./assets/625.mp3'));
    } else if (frequency === "650") {
      await soundObject.loadAsync(require('./assets/650.mp3'));
    } else if (frequency === "675") {
      await soundObject.loadAsync(require('./assets/675.mp3'));
    } else if (frequency === "700") {
      await soundObject.loadAsync(require('./assets/700.mp3'));
    } else if (frequency === "725") {
      await soundObject.loadAsync(require('./assets/725.mp3'));
    } else if (frequency === "750") {
      await soundObject.loadAsync(require('./assets/750.mp3'));
    } else if (frequency === "775") {
      await soundObject.loadAsync(require('./assets/775.mp3'));
    } else if (frequency === "800") {
      await soundObject.loadAsync(require('./assets/800.mp3'));
    } else if (frequency === "825") {
      await soundObject.loadAsync(require('./assets/825.mp3'));
    } else if (frequency === "850") {
      await soundObject.loadAsync(require('./assets/850.mp3'));
    } else if (frequency === "875") {
      await soundObject.loadAsync(require('./assets/875.mp3'));
    } else if (frequency === "900") {
      await soundObject.loadAsync(require('./assets/900.mp3'));
    } else if (frequency === "925") {
      await soundObject.loadAsync(require('./assets/925.mp3'));
    } else if (frequency === "950") {
      await soundObject.loadAsync(require('./assets/950.mp3'));
    } else if (frequency === "975") {
      await soundObject.loadAsync(require('./assets/975.mp3'));
    } else if (frequency === "1000") {
      await soundObject.loadAsync(require('./assets/1000.mp3'));
    } else if (frequency === "1025") {
      await soundObject.loadAsync(require('./assets/1025.mp3'));
    } else if (frequency === "1050") {
      await soundObject.loadAsync(require('./assets/1050.mp3'));
    } else if (frequency === "1075") {
      await soundObject.loadAsync(require('./assets/1075.mp3'));
    } else if (frequency === "1100") {
      await soundObject.loadAsync(require('./assets/1100.mp3'));
    } else if (frequency === "1125") {
      await soundObject.loadAsync(require('./assets/1125.mp3'));
    } else if (frequency === "1150") {
      await soundObject.loadAsync(require('./assets/1150.mp3'));
    } else if (frequency === "1175") {
      await soundObject.loadAsync(require('./assets/1175.mp3'));
    } else if (frequency === "1200") {
      await soundObject.loadAsync(require('./assets/1200.mp3'));
    } else if (frequency === "1225") {
      await soundObject.loadAsync(require('./assets/1225.mp3'));
    } else if (frequency === "1250") {
      await soundObject.loadAsync(require('./assets/1250.mp3'));
    } else if (frequency === "1275") {
      await soundObject.loadAsync(require('./assets/1275.mp3'));
    } else if (frequency === "1300") {
      await soundObject.loadAsync(require('./assets/1300.mp3'));
    } else if (frequency === "1325") {
      await soundObject.loadAsync(require('./assets/1325.mp3'));
    } else if (frequency === "1350") {
      await soundObject.loadAsync(require('./assets/1350.mp3'));
    } else if (frequency === "1375") {
      await soundObject.loadAsync(require('./assets/1375.mp3'));
    } else if (frequency === "1400") {
      await soundObject.loadAsync(require('./assets/1400.mp3'));
    }


    if(soundObject._loaded){
      await soundObject.playAsync();
    }
      

  }
  
  const __takePictureAndSend = async () => {
    const options = { quality: 1, base64: true, skipProcessing: true };
    const photo: any = await camera.takePictureAsync(options);
    setPhotoNumber(photoNumber + 1)
    console.log("Incrementing photo number: ", photoNumber);
    // scannedPhoto = photo
    // console.log("Photo: ", photo)
    // console.log("typeof photo:", typeof (photo))
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
    // console.log("Photo details: ", photo.base64)
    setWaitingResponse(true)

    

    await fetch('http://172.25.157.53:5000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
        photo: photo.base64,
        testNumber: photoNumber
      }),
    }).then(response => response.json())
      .then(data => {
        console.log("The response was: ", data)
        console.log("Result: ", data['result'])
        setDepth(data['result'])
        setFrequency(data['frequency'])
        setWaitingResponse(false)
      }).catch(error => {
        // handle the error
        console.log("We are getting an error")
        console.error('Error:', error);
        setWaitingResponse(false)
      });
  }
  const __savePhoto = () => { }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  useEffect(() => {
    if (waitingResponse === false) {
      
      console.log("use effect sending response")
      setWaitingResponse(true)
      __takePictureAndSend() // sets waitingResponse to false when it's done
      playSound();
    } else {
      console.log("use effect waiting response")
    }

    

  })

  // return <View><Text>Hello there</Text></View>
  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          <Camera
            type={cameraType}
            flashMode={flashMode}
            style={{ flex: 1 }}
            ref={(r) => {
              camera = r
            }}
          >
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: '5%',
                  top: '10%',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flexDirection: 'row',
                  flex: 1,
                  width: '100%',
                  padding: 20,
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    alignSelf: 'center',
                    flex: 1,
                    alignItems: 'center'
                  }}
                >
                  <Text style={{ fontSize: 30, backgroundColor: '#fff' }}>Receiving number: {depth}</Text>
                  <Text style={{ fontSize: 30, backgroundColor: '#fff' }}>Sending number: {photoNumber}</Text>
                  <TouchableOpacity
                    // onPress={() => console.log("Button pressed here")}
                    onPress={__takePictureAndSend}
                    style={{
                      width: 70,
                      height: 70,
                      bottom: 0,
                      borderRadius: 50,
                      backgroundColor: '#fff'
                    }}
                  />

                  
                  
                </View>
              </View>
            </View>
          </Camera>

        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 350,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 400
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({ photo, retakePicture, savePhoto }: any) => {
  // console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{ uri: photo && photo.uri }} // REFER TO THIS TO GRAB IMAGE
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 30
                }}
              >
                Re-take
              </Text>

        
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}