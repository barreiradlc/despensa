import React, { useEffect, useState, useRef } from 'react'
import gql from 'graphql-tag';
import AsyncStorage from '@react-native-community/async-storage';

import { Text } from 'react-native'
import { useMutation, useQuery } from '@apollo/react-hooks';

import CardErros from "../components/CardErros";

import { FormAssetContainer, FormContainerScroll, Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainer, FormIconContainer, FormInput, FormLabel, FormTouchable, FormTouchableIcon, Google } from '../components/styled/Form'
import { LoadingOverlay } from '../components/utils/Components'
import * as Utils from '../components/utils/Utils'
import { uri } from '../components/apollo'
import * as LocalStorage from '../services/LocalStorage'
import realm from '../config/realm'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

function Perfil({ navigation }) {

    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();
    const ref_input4 = useRef();
    const ref_input5 = useRef();


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
            .then((d) => {
                setDespensas(d)
            })

        if (__DEV__) {
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
            title: 'Editar Perfil'
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

    async function handleWelcome() {
        let token = await data.signIn.token
        console.log(`JWT:  ${token}`)
        await AsyncStorage.setItem('@token', token)
        navigation.replace('Home')
    }

    function handleDismissErrors() {
        setErrors()
    }

    function handleLogin() {
        const credentials = {
            password: user.password,
            email: user.email,
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
            .then(res => res.json())
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
                if (res.errors) {
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
                console.debug({ err })
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

            {aguarde &&
                <LoadingOverlay />
            }

            <Icon name='chef-hat' color='#4e1017' size={120} style={{ alignSelf: 'center', paddingBottom: 35 }} />
            {/* <FormAsset source={require(logo)}  /> */}

            <FormInput
                autoFocus
                onChange={(event) => { handleSetUser(event, 'username') }}
                // autoFocus
                value={user.firstName}
                placeholder='Nome'
                returnKeyType="next"
                ref={ref_input1}
                onSubmitEditing={() => ref_input2.current.focus()}
            />

            <FormInput
                onChange={(event) => { handleSetUser(event, 'username') }}
                // autoFocus
                value={user.lastName}
                placeholder='Sobrenome'
                returnKeyType="next"
                ref={ref_input2}
                onSubmitEditing={() => ref_input3.current.focus()}
            />

            <FormInput
                onChange={(event) => { handleSetUser(event, 'email') }}
                value={user.email}
                placeholder='Email'
                returnKeyType="next"
                ref={ref_input3}
                onSubmitEditing={() => ref_input4.current.focus()}
            />

            <FormInput
                onChange={(event) => { handleSetUser(event, 'username') }}
                // autoFocus
                value={user.username}
                placeholder='Usuário'
                returnKeyType='done'
                ref={ref_input4}
            />

            <FormButton onPress={handleLogin} active={true}>
                <FormButtonLabel active={true}>Editar</FormButtonLabel>
            </FormButton>

            {errors &&
                <CardErros erros={errors} dismiss={handleDismissErrors} />
            }


        </FormContainerScroll>
    );
}


export default Perfil