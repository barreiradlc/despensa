import React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerOverlay,
    TopContainer,
    LogoImage,
    LoadingLabel, 
    LoadingLabelContainer,
    cor2} from "../styles/components"

const logo = '../assets/logo.png'

interface LoadingData {
    label: string
}

const LoadingOverlayComponent: React.FC = ({ label }: LoadingData) => {
  return (
    <ContainerOverlay>
        <TopContainer>            
            <ActivityIndicator size={60} color={cor2}/>
        </TopContainer>

        <LoadingLabelContainer>            
            <LoadingLabel>{`${label}`}</LoadingLabel>            
        </LoadingLabelContainer>

    </ContainerOverlay>
  );
}

export default LoadingOverlayComponent;