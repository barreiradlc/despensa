'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import * as LocalStorage from '../services/LocalStorage'
import { Camera } from '../components/styled/Form'

export default function ExampleApp() {
   async function takePicture () {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      
      const { uuid } = this.props.route.params 
      const { navigation } = this.props
      
      
      console.log('data');
      // console.log(data);

      LocalStorage.updateImageDespensa(uuid, data)
          .then(( res ) => {
              console.log('foi')
              navigation.goBack()
            }).catch(( e ) => {
              console.log('num foi')
              console.warn(e)
          })

    }
  };

    return (
      <View style={styles.container}>
        <RNCamera
          // ref={ref => {
          //   this.camera = ref;
          // }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={(e) => takePicture(e)} style={styles.capture}>
            <Camera />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#c93b4a',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

AppRegistry.registerComponent('App', () => ExampleApp);