import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';

import { Text } from 'react-native'
import { useMutation, useQuery } from '@apollo/react-hooks';

import CardErros from "../components/CardErros";

import { FormContainerScroll, Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainer, FormIconContainer, FormInput, FormLabel, FormTouchable, FormTouchableIcon, Google } from '../components/styled/Form'
import { LoadingOverlay } from '../components/utils/Components'
import { uri } from '../components/apollo'
import * as Utils from '../components/utils/Utils'
import * as LocalStorage from '../services/LocalStorage'
import realm from '../config/realm'

const logo = '../assets/logo.png'

const AUTH = gql`
    mutation setCredentials($attributes: CredentialsInput!) {
        signIn(attributes: $attributes) {
            token
            user {
                id
                fullName
                email
            }
        }
    }
`

function Login({ navigation }) {

    const [despensas, setDespensas] = useState(false)
    const [aguarde, setAguarde] = useState(false)
    const [cadastro, setCadastro] = useState(false)
    const [errors, setErrors] = useState(false)

    const [user, setUser] = useState({
        email: '',
        username: '',
        password: ''
    })

    useEffect(() => {
        LocalStorage.getDespensas()
            .then(( d ) => {
                setDespensas(d)
            })

        if(__DEV__){
            setUser({
                // JOHN
                // "email": "john.doe@example.com",
                // "username": "John",
                // "password": "Doe123123"

                // JANE
                "email": "jane.doe@example.com",
                "username": "Jane",
                "password": "Doe123123"
            })
        }

        navigation.setOptions({
            headerShown: false
        });

    }, [])

    const [auth, { data, error, loading }] = useMutation(AUTH);

    useEffect(() => {
        if (error) {
            setAguarde(false)
            Utils.sweetalert('Erro de conexão')
            console.debug(error)
        }
    }, [error])

    useEffect(() => {
        if (data && !error) {

            if (data.signIn) {
                if (data.signIn.token) {
                    handleWelcome()
                } else {
                    Utils.sweetalert('Usuário inválido')
                    // Utils.toast('Usuário inválido')
                }
            }
            setAguarde(false)
        } else {
            console.log('noths')
        }
    }, [data])  
    
    async function  handleWelcome(){
        let token = await data.signIn.token
        console.log(`JWT:  ${token}`)
        await AsyncStorage.setItem('@token', token)
        navigation.replace('Home')
    }

    function handleDismissErrors(){
        setErrors()
    }

    function handleLogin() {
        const credentials = {
            password: user.password,
            username: user.username,
        }

        if (user.password && user.username) {
            setAguarde(true)
            auth({ variables: { attributes: credentials } });
        } else {
            alert('Preencha seus dados para continuar')
        }
    }

    function register(credentials) {
        return fetch(`${uri}/users`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then( res => res.json())
    }

    function handleRegister() {
        setAguarde(true)
        const credentials = {
            username: user.username,
            email: user.email,
            password: user.password
        }
        register(credentials)
            .then((res) => {
                if(res.errors){
                    setErrors(res.errors)
                } else {
                    handleLogin()
                }
                console.log({ register: res })
                setAguarde(false)
            })
            .catch((err) => {
                setAguarde(false)
                Utils.sweetalert('Erro de conexão')
                console.debug({err})
            })
            // setAguarde(false)
    }

    function handleSetUser(event, attr) {
        setUser({ ...user, [attr]: event.nativeEvent.text })
    }


    // if(error){
    //     setAguarde(false)
    // }

    return (
        <FormContainerScroll>
            <FormContainer>

            {aguarde &&
                <LoadingOverlay />
            }

            <FormAsset source={require(logo)} />

            {cadastro &&
                <FormInput
                    onChange={(event) => { handleSetUser(event, 'email') }}
                    autoFocus
                    value={user.email}
                    placeholder='Email'
                    returnKeyType="next"
                />
            }

            <FormInput
                onChange={(event) => { handleSetUser(event, 'username') }}
                // autoFocus
                value={user.username}
                placeholder='Usuário'
                returnKeyType="next"
            />

            <FormInput
                onChange={(event) => { handleSetUser(event, 'password') }}
                placeholder='Senha'
                value={user.password}
                secureTextEntry
            />

            {cadastro ?
                <FormButton onPress={handleRegister} active={true}>
                    <FormButtonLabel active={true}>Cadastro</FormButtonLabel>
                </FormButton>
                :
                <FormButtonGroup>

                    <FormButton onPress={handleLogin} active={true}>
                        <FormButtonLabel active={true}>Login</FormButtonLabel>
                    </FormButton>

                    <FormButton onPress={() => setCadastro(true)}>
                        <FormButtonLabel>Cadastro</FormButtonLabel>
                    </FormButton>

                </FormButtonGroup>
            }

            {errors && 
                <CardErros erros={errors} dismiss={handleDismissErrors} />
            }

            {cadastro &&
                <FormTouchable onPress={() => setCadastro(false)}>
                    <Text>
                        Já sou cadastrado
                    </Text>
                </FormTouchable>
            }

            {__DEV__ &&
            <>
            
            
            {__DEV__ && 
                <FormIconContainer>
                    <FormTouchableIcon style={{ backgroundColor: '#4184c8' }}>
                        
                        <Facebook />

                    </FormTouchableIcon>

                    <FormTouchableIcon style={{ backgroundColor: '#c84141' }}>

                        <Google />

                    </FormTouchableIcon>
                </FormIconContainer>
            }
            </>
            }

            {__DEV__ && 
                <Text>
                    {JSON.stringify(despensas)}
                </Text>
            }


        </FormContainer>
        </FormContainerScroll>
    );
}


export default Login