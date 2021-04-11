import Toast from 'react-native-simple-toast';

export function toastWithGravity( message = 'Teste toast', timeout = 500, position = Toast.CENTER ){
    return Toast.showWithGravity(message, timeout, position)
}
