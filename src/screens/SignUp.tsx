import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, Form, Input, LogoImage } from "../styles/form"
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../components/mutations/loginMutation';
import { LoadingOverlayContext } from '../context/LoadingOverlayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGNUP_USER } from '../components/mutations/signUpMutation';

const logo = '../assets/logo.png'


export interface SignUpDTO{
    name: string;
    email: string;
    username: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [signUpData, setSignUpData] = useState<SignUpDTO>({} as SignUpDTO)
    const [signUp, { data, error, loading }] = useMutation(SIGNUP_USER);
    const { toggleOverlay } = useContext(LoadingOverlayContext)

    const navigation = useNavigation()

    function handleChange(event: any, attr: string) {
        setSignUpData({ ...signUpData, [attr]: event.nativeEvent.text.trim().toLowerCase() })
    }

    function handleGoLogin() {
        navigation.navigate('Login')
    }

    function handleSignUp() {
        const { name, email, username, password } = signUpData
        
        console.log(signUpData)

        if (name && username && email && password) {
            Keyboard.dismiss()
            signUp({ variables: { signUpData } });
        } else {
            ToastAndroid.show("Preencha com suas credenciais para continuar", 500)
        }
    }

    useEffect(() => {
        if(__DEV__){
            setSignUpData({
                "name": "Barreiro",
                "email": "lerigou1qqq121223@gmail.com",
                "username": "gusti1nAasasasAAA",
                "password": "123123"
            })
        }
    }, [])

    useEffect(() => {
        if (error) {            
            const emailRegistered = error.message.includes('email')
            const usernameRegistered = error.message.includes('username')
            
            if(emailRegistered && usernameRegistered){
                return Alert.alert('Erro', 'Usuário e email previamente já cadastrados, por favor tente novamente')
            }

            Alert.alert('Erro', `${emailRegistered ? 'Email' : 'Usuário'} já cadastrado, por favor tente novamente`)
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
        const { signUp } = data

        try {
            await AsyncStorage.setItem('@despensaJWT', JSON.stringify(signUp))
            navigation.dispatch(
                StackActions.replace('Home')
            );
        } catch (e) {
            // saving error
            throw new Error("Error Saving token")
        }
    }

    return (
        <Container>

            <Form>
                <LogoImage source={require(logo)} />
                <Input
                    placeholder='Nome'
                    onChange={(e: any) => handleChange(e, 'name')}
                    autoCapitalize='none'
                    />
                <Input
                    placeholder='E-mail'
                    onChange={(e: any) => handleChange(e, 'email')}
                    autoCapitalize='none'
                    />
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
                <Button onPress={handleSignUp}>
                    <ButtonLabel>Cadastrar</ButtonLabel>
                </Button>                
                <Button onPress={handleGoLogin}>
                    <ButtonLabel>Já é cadastrado? Login</ButtonLabel>
                </Button>                
            </Form>
        </Container>
    );
}

export default SignUp;