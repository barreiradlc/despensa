import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import realm from '../config/realmConfig/realm';
import ApolloClient from '../services/ApolloClient';
import {
    Container,
    TopContainer,
    LogoImage,
    LoadingLabel,
    LoadingLabelContainer,
    ErrorTouchable,
    ErrorLabel,
    ErrorTitle,
    ErrorTouchableContainer
} from "../styles/components"
import { Button, ButtonLabel } from "../styles/form"

const logo = '../assets/logo.png'

const LogoutPage: React.FC = () => {
    const navigation = useNavigation()

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem('@despensaJWT')
            realm.write(() => realm.deleteAll() )
            ApolloClient.clearStore()
            navigation.dispatch(
                StackActions.replace('Login')
            );            
        } catch (error) {
            throw new Error("Erro ao deslogar");
            
        }
    }

    function handleGoBack() {
        navigation.goBack()
    }

    useEffect(() => {
        navigation.setOptions({
            title: "Sair"
        })
    })

    return (
        <Container>

            <ErrorTitle>Deseja realmente sair?</ErrorTitle>

            <ErrorTouchableContainer>
                
                <Button invert onPress={handleLogout}>
                    <ButtonLabel invert>Sim</ButtonLabel>
                </Button>

                <Button invert onPress={handleGoBack}>
                    <ButtonLabel invert>Não</ButtonLabel>
                </Button>

            </ErrorTouchableContainer>
        </Container>        
    );
}

export default LogoutPage;