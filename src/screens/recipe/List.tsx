import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import CardRecipe from '../../components/CardRecipe';
import FabGroup from '../../components/FabGroup';
import { RecipeContext } from '../../context/RecipeContext';
import { ContainerScroll } from '../../styles/components';
import { ButtonLabel } from '../../styles/form';

interface RecipeInterface {
    id: string;
    name: string;
    description: string;
}

const List: React.FC = () => {
    const { recipes, handleInfiniteScrollRecipe, loading } = useContext(RecipeContext)

    // const navigation = useNavigation()
    // useEffect(() => {
    //     navigation.setOptions({
    //         title: `${recipes.length}`
    //     })
    // }, [recipes])

    return (
        <ContainerScroll
            onScroll={(e) => {
                let paddingToBottom = 10;
                paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                    handleInfiniteScrollRecipe()
                }
            }}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {recipes?.map((recipe: RecipeInterface) =>
                <CardRecipe recipe={recipe} key={recipe.id} />
            )}

        <FabGroup />
        
        </ContainerScroll>
    );
}

export default List;