import { useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import LoadingOverlayComponent from '../../components/LoadingOverlayComponent';
import { QUERY_RECIPE } from '../../components/queries/recipeQuery';
import { Container, Label } from '../../styles/components';

const Show: React.FC = () => {
    
    const route = useRoute()
    const { id } = route.params
    const { loading, error, data, refetch } = useQuery(QUERY_RECIPE, { variables: id });



    if(loading) {
        return <LoadingOverlayComponent />
    }    

    return (
        <Container>
            <Label>{JSON.stringify(data)}</Label>
            <Label>{JSON.stringify(error)}</Label>
        </Container>
    );
}

export default Show;