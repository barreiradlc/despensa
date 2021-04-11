import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { cor4 } from '../../constants/CORES';
import {
    Container,
    TopContainer,
    LogoImage,
    LoadingLabel,
    LoadingLabelContainer,
} from "../styles/components"

import getInitialLabel from '../../utils/labelUtils';

const quoteBackground = '../../assets/board-near-ingredients-for-pasta.jpg'

interface LoadingData {
    label: string
}

const LoadingComponent: React.FC = () => {
    const [label, setLabel] = useState('')

    useEffect(() => {
        const labelFetched = getInitialLabel()
        setLabel(labelFetched)
    }, [])

    if (!label) return null;

    return (
        <ImageBackground
            style={{ flex: 1 }}            
            imageStyle={{
                opacity: 0.3
            }}
            source={require(quoteBackground)}
        >
            <Container>

                <LoadingLabelContainer>
                    <Icon name="quote-left" color={cor4} size={26} />
                    <LoadingLabel>{`${label}`}</LoadingLabel>
                </LoadingLabelContainer>

                {/* <TopContainer>
                    <ActivityIndicator size='large' color={cor4} />
                </TopContainer> */}

            </Container>
        </ImageBackground>
    );
}

export default LoadingComponent;