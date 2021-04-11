import React from 'react';
import { ActivityIndicator } from 'react-native';
import { cor2 } from '../../constants/CORES';
import {
    ContainerOverlay,
    TopContainer,
    LoadingLabel,
    LoadingLabelContainer,
} from "../styles/components"

interface LoadingData {
    label: string
}

const LoadingOverlayComponent: React.FC<LoadingData> = ({ label }) => {    
    return (
        <ContainerOverlay>
            <TopContainer>
                <ActivityIndicator size='large' color={cor2} />
            </TopContainer>

            <LoadingLabelContainer>
                <LoadingLabel>{`${label}`}</LoadingLabel>
            </LoadingLabelContainer>

        </ContainerOverlay>
    );
}

export default LoadingOverlayComponent;