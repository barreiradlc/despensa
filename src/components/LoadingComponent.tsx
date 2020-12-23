import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Container,
    TopContainer,
    LogoImage,
    LoadingLabel,
    LoadingLabelContainer,
    cor2
} from "../styles/components"
import getInitialLabel from '../utils/initialLabel';


const logo = '../assets/logo.png'

interface LoadingData {
    label: string
}

const LoadingComponent: React.FC = () => {
    const [label, setLabel] = useState()

    useEffect(() => {
        const labelFetched = getInitialLabel()
        setLabel(labelFetched)
    }, [])

    if (!label) return null;

    return (
        <Container>
            <TopContainer>
                <LogoImage source={require(logo)} />
                <ActivityIndicator size={60} color={cor2} />
            </TopContainer>

            <LoadingLabelContainer>
                <Icon name="quote-left" />
                <LoadingLabel>{`${label}`}</LoadingLabel>
                <Icon name="quote-right" />
            </LoadingLabelContainer>

        </Container>
    );
}

export default LoadingComponent;