import { useQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text } from 'react-native';
import DashboardError from '../../components/DashboardError';
import LoadingOverlayComponent from '../../components/LoadingOverlayComponent';
import { QUERY_RECIPE } from '../../components/queries/recipeQuery';
import { Container, Label } from '../../styles/components';

const Show: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { id } = route.params
    const { loading, error, data, refetch } = useQuery(QUERY_RECIPE, {
        variables: {
            id
        }
    });

    const reload = useCallback(() => {
        refetch()
    }, [])

    const recipe = useMemo(() => {
        if(data) {
            navigation.setOptions({
                title: data.recipe.name
            })
            return data.recipe
        };
        return null
    }, [data])

    if (loading) return <LoadingOverlayComponent />;
    
    if(error || !recipe) return <DashboardError refetch={reload} />;

    return (
        <Container>
            <Label>{recipe.description}</Label>
            <Label>{__DEV__ && JSON.stringify(error)}</Label>
        </Container>
    );
}

export default Show;