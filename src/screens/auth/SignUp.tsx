import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, ContainerInput, FormContainer, InputEnd as Input, InputProps, LogoImage } from "../../components/styles/form"
import { useMutation } from '@apollo/client';
// import { LOGIN_USER } from '../components/mutations/loginMutation';
// import { LoadingOverlayContext } from '../context/LoadingOverlayContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SIGNUP_USER } from '../components/mutations/signUpMutation';
// import { cor2 } from '../constants/CORES';
import { RectButton } from 'react-native-gesture-handler'


// import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/Feather';
import { cor2 } from '../../constants/CORES';
import { SIGNUP_USER } from '../../components/gql/mutations/signUpMutation';
import { LoadingOverlayContext } from '../../components/context/LoadingProvider';
import { toastWithGravity } from '../../utils/toastUtils';

const logo = '../../assets/logo.png'

export interface SignUpDTO {
    name: string;
    email: string;
    username: string;
    password: string;
    password_confirm?: string;
}

const SignUp: React.FC = () => {
    const [hidePassword, setHidePassword] = useState(true)
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
        const { name, email, username, password, password_confirm } = signUpData

        if (password !== password_confirm) {
            return toastWithGravity("A senha e a confirmação não batem")
        }

        if (name && username && email && password) {
            Keyboard.dismiss()
            signUp({
                variables: {
                    signUpData: {
                        name,
                        email,
                        username,
                        password
                    }
                }
            });
        } else {
            toastWithGravity("Preencha com suas credenciais para continuar")
        }
    }

    useEffect(() => {
        if (__DEV__) {
            setSignUpData({
                "name": "Barreiro",
                "email": "lerigou123@gmail.com",
                "username": "gustin",
                "password": "123123",
                "password_confirm": "123123"
            })
        }
    }, [])

    useEffect(() => {
        if (error) {
            const emailRegistered = error.message.includes('email')
            const usernameRegistered = error.message.includes('username')

            if (emailRegistered && usernameRegistered) {
                return Alert.alert('Erro', 'Usuário e email previamente já cadastrados, por favor tente novamente')
            }
            toastWithGravity(`${emailRegistered ? 'Email' : 'Usuário'} já cadastrado, por favor tente novamente`)
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
            await AsyncStorage.setItem('@despensaUserData', JSON.stringify(signUp))
            navigation.dispatch(
                StackActions.replace('Home')
            );
        } catch (e) {
            throw new Error("Error Saving token")
        }
    }
    function handleToogleHidePassword() {
        setHidePassword(!hidePassword)
    }

    return (
        <Container>

            <FormContainer>
                <LogoImage source={require(logo)} />

                <ContainerInput>
                    <Input
                        {...InputProps}
                        value={signUpData.name}
                        placeholder='Nome'
                        onChange={(e: any) => handleChange(e, 'name')}
                        autoCapitalize='none'
                    />
                </ContainerInput>

                <ContainerInput>
                    <Input
                        {...InputProps}
                        value={signUpData.email}
                        placeholder='E-mail'
                        onChange={(e: any) => handleChange(e, 'email')}
                        autoCapitalize='none'
                    />
                </ContainerInput>

                <ContainerInput>
                    <Input
                        {...InputProps}
                        value={signUpData.username}
                        placeholder='Usuário'
                        onChange={(e: any) => handleChange(e, 'username')}
                        autoCapitalize='none'
                    />
                </ContainerInput>

                <ContainerInput>
                    <Input
                        {...InputProps}
                        value={signUpData.password}
                        placeholder='Senha'
                        secureTextEntry={hidePassword}
                        onChange={(e: any) => handleChange(e, 'password')}
                        autoCapitalize='none'
                    />

                    <RectButton onPress={handleToogleHidePassword}>
                        <Icon size={25} name={hidePassword ? 'eye' : 'eye-off'} color={cor2} />
                    </RectButton>
                </ContainerInput>

                <ContainerInput>
                    <Input
                        {...InputProps}
                        value={signUpData.password_confirm}
                        placeholder='Confirmar senha'
                        secureTextEntry={hidePassword}
                        onChange={(e: any) => handleChange(e, 'password_confirm')}
                        autoCapitalize='none'
                    />
                    <RectButton onPress={handleToogleHidePassword}>
                        <Icon size={25} name={hidePassword ? 'eye' : 'eye-off'} color={cor2} />
                    </RectButton>
                </ContainerInput>

                <Button onPress={handleSignUp}>
                    <ButtonLabel>Cadastrar</ButtonLabel>
                </Button>
                <Button invert onPress={handleGoLogin}>
                    <ButtonLabel invert>Já é cadastrado? Login</ButtonLabel>
                </Button>
            </FormContainer>
        </Container>
    );
}

export default SignUp;