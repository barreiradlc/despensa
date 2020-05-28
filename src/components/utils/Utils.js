import SweetAlert from 'react-native-sweet-alert';
import { ToastAndroid, View, Text, ActivityIndicator } from 'react-native'
import { v3 as uuidv3 } from 'uuid';

export function uuid(){
  let encode = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  return uuidv3(encode + new Date().getTime(), uuidv3.URL)
}

export function LoadingOverlay(){
    return (
          <View>
              <Text>Aguarde</Text>
              <ActivityIndicator />
          </View>
      )
}

 export function toast(mensagem){
    ToastAndroid.showWithGravityAndOffset(
      mensagem || "A wild toast appeared!",
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
      25,
      50
    );
  };

  export function sweetalert(message, type, title){
    SweetAlert.showAlertWithOptions({
        title: title || 'Algo de errado \n não está certo',
        subTitle: message,
        type: type || 'error' ,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#dedede',
        otherButtonTitle: 'Cancel',
        otherButtonColor: '#dedede',
        style: type || 'error',
        cancellable: true
      },

    callback =>  callback);
  }

  export function sweetalertDelete(message, type, title){
    SweetAlert.showAlertWithOptions({
      title: '',
      subTitle: '',
      confirmButtonTitle: 'OK',
      confirmButtonColor: '#000',
      otherButtonTitle: 'Cancel',
      otherButtonColor: '#dedede',
      style: 'warning',
      cancellable: false
    },
      callback => console.log('callback'));
  }

  