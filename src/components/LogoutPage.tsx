import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import {
    Container,
    TopContainer,
    LogoImage,
    LoadingLabel,
    LoadingLabelContainer,
    cor2,
    ErrorTouchable,
    ErrorLabel,
    ErrorTitle,
    ErrorTouchableContainer
} from "../styles/components"

const logo = '../assets/logo.png'

const LogoutPage: React.FC = () => {
    const navigation = useNavigation()

    async function handleLogout() {
        try {
            await AsyncStorage.removeItem('@despensaJWT')
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
                <ErrorTouchable onPress={handleLogout}>
                    <ErrorLabel>Sim</ErrorLabel>
                </ErrorTouchable>

                <ErrorTouchable onPress={handleGoBack}>
                    <ErrorLabel>Não</ErrorLabel>
                </ErrorTouchable>

            </ErrorTouchableContainer>
        </Container>        
    );
}

export default LogoutPage;