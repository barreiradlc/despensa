import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container,  FormContainer, Input, LogoImage } from "../styles/form"
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../components/mutations/loginMutation';
import { LoadingOverlayContext } from '../context/LoadingOverlayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logo = '../assets/logo.png'


export interface LoginDTO{
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginDTO>({} as LoginDTO)
    const [login, { data, error, loading }] = useMutation(LOGIN_USER);
    const { toggleOverlay } = useContext(LoadingOverlayContext)

    const navigation = useNavigation()

    function handleChange(event: any, attr: string) {
        setLoginData({ ...loginData, [attr]: event.nativeEvent.text.trim().toLowerCase() })
    }

    function handleGoToSignUp() {
        navigation.navigate('SignUp')
    }

    function handleLogin() {
        const { username, password } = loginData
        
        if (username && password) {
            Keyboard.dismiss()
            login({ variables: { loginData } });
        } else {
            ToastAndroid.show("Preencha com suas credenciais para continuar", 500)
        }
    }

    useEffect(() => {
        if(__DEV__){
            setLoginData({
                username: "lerigou@gmail.com",
                password: "123123"
            })
        }
    }, [])

    useEffect(() => {
        if (error) {
            Alert.alert('Erro', 'credenciais inválidas, por favor tente novamente')
        }
    }, [error])
    
    useEffect(() => {
        toggleOverlay(loading)
    }, [loading])
    
    useEffect(() => {
        if (data) {
            handleSaveLoginData()
        }
    }, [data])
    
    async function handleSaveLoginData() {        
        const { signIn } = data

        try {
            await AsyncStorage.setItem('@despensaJWT', JSON.stringify(signIn))
            navigation.dispatch(
                StackActions.replace('Home')
            );
        } catch (e) {
            throw new Error("Error Saving token")
            // saving error
        }
    }

    console.log(loginData)

    return (
        <Container>

            <FormContainer>
                <LogoImage source={require(logo)} />
                <Input
                    placeholder='Usuário'
                    onChange={(e: any) => handleChange(e, 'username')}
                    autoCapitalize='none'
                    />
                <Input
                    placeholder='Senha'
                    secureTextEntry
                    onChange={(e: any) => handleChange(e, 'password')}
                    autoCapitalize='none'
                />
                <Button onPress={handleLogin}>
                    <ButtonLabel>Login</ButtonLabel>
                </Button>
                <Button invert onPress={handleGoToSignUp}>
                    <ButtonLabel>Ainda não é cadastrado? Cadastrar-me</ButtonLabel>
                </Button>                
            </FormContainer>

            {/* <TouchableOpacity                
                onPress={() => handleLogin(loginData)}
            >
                <Text>Login</Text>
            </TouchableOpacity> */}
        </Container>
    );
}

export default Login;