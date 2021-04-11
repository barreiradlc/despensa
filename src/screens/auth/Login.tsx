import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Button, ButtonLabel, Container,  FormContainer, Input, LogoImage, ContainerInput } from "../../components/styles/form"
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../components/gql/mutations/loginMutation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { cor2 } from '../../constants/CORES';
import { LoadingOverlayContext } from '../../components/context/LoadingProvider';

import Toast from 'react-native-simple-toast';
import { toastWithGravity } from '../../utils/toastUtils';

const logo = '../../assets/logo.png'

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
        console.log('SignUp')
        navigation.navigate('SignUp')
    }

    function handleLogin() {
        const { username, password } = loginData
        
        if (username && password) {
            Keyboard.dismiss()
            
            login({ 
                variables: { 
                    loginData 
                }
            });

        } else {
            toastWithGravity("Preencha com suas credenciais para continuar", 500, Toast.CENTER)
        }
    }

    useEffect(() => {
        if(__DEV__){
            setLoginData({
                "username": "lerigou@gmail.com",
                "password": "123123"
            })
        }
    }, [])

    useEffect(() => {
        if (error) {            
            toastWithGravity('Credenciais inválidas, por favor tente novamente', 500, Toast.CENTER)
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

        console.log("signIn")
        console.log(signIn.token)

        try {
            await AsyncStorage.setItem('@despensaUserData', JSON.stringify(signIn))
            // await AsyncStorage.setItem('@despensaJWT', JSON.stringify(signIn.token))
            navigation.dispatch(
                StackActions.replace('Home')
            );
        } catch (e) {
            throw new Error("Error Saving token")
        }
    }

    return (
        <Container>

            <FormContainer>
                <LogoImage source={require(logo)} />

                <ContainerInput >
                    <Icon size={25} name="user" color={cor2} />
                    <Input
                        placeholder='Usuário'
                        value={loginData.username}
                        onChange={(e: any) => handleChange(e, 'username')}
                        autoCapitalize='none'
                        />
                </ContainerInput>
                
                <ContainerInput>
                    <Icon size={25} name="lock" color={cor2} />
                    <Input
                        placeholder='Senha'
                        value={loginData.password}
                        secureTextEntry
                        onChange={(e: any) => handleChange(e, 'password')}
                        autoCapitalize='none'
                    />
                </ContainerInput>

                <Button onPress={handleLogin}>
                    <ButtonLabel>Login</ButtonLabel>
                </Button>
                <Button invert onPress={handleGoToSignUp}>
                    <ButtonLabel invert>Ainda não é cadastrado? Cadastrar-me</ButtonLabel>
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