import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
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

const DashboardError: React.FC = ({ refetch }: any) => {
    const navigation = useNavigation()

    function handleGoOffline() {
        navigation.dispatch(
                StackActions.replace('DashBoard',)
            );     
    }

    return (
        <Container>

            <ErrorTitle>Ocorreu um erro ao buscar seus dados</ErrorTitle>

            <ErrorTouchableContainer>
                <ErrorTouchable onPress={refetch}>
                    <ErrorLabel>Tentar novamente </ErrorLabel>
                </ErrorTouchable>

                <ErrorTouchable onPress={handleGoOffline}>
                    <ErrorLabel>Continuar offline</ErrorLabel>
                </ErrorTouchable>
            </ErrorTouchableContainer>
        </Container>        
    );
}

export default DashboardError;