import { StackActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { cor2, cor4 } from '../../constants/CORES';
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

const quoteBackground = '../../assets/board-near-ingredients-for-pasta.jpg'

interface DashboardErrorInterface{
    refetch(): void
}

const DashboardError: React.FC<DashboardErrorInterface> = ({ refetch }) => {
    const navigation = useNavigation()

    function handleGoOffline() {
        navigation.dispatch(
            StackActions.replace('DashBoard',)
        );     
    }

    return (
        <ImageBackground
            style={{ flex: 1 }}            
            imageStyle={{
                opacity: 0.3
            }}
            source={require(quoteBackground)}
        >

        <Container>
            <Icon name="cloud-off" color={cor2} size={34} />
            <ErrorTitle>Ocorreu um erro ao{`\n`} buscar seus dados</ErrorTitle>

            <ErrorTouchableContainer>
                <ErrorTouchable onPress={refetch}>
                    <ErrorLabel>Tentar novamente </ErrorLabel>
                </ErrorTouchable>

                <ErrorTouchable onPress={handleGoOffline}>
                    <ErrorLabel>Continuar offline</ErrorLabel>
                </ErrorTouchable>
            </ErrorTouchableContainer>
        </Container>        
        </ImageBackground>
    );
}

export default DashboardError;