import React, { useContext } from 'react';
import { View } from 'react-native';
import CardRecipe from '../../components/CardRecipe';
import { RecipeContext } from '../../context/RecipeContext';
import { ContainerScroll } from '../../styles/components';
import { ButtonLabel } from '../../styles/form';

interface RecipeInterface{
    id: string;
    name: string;
    description: string;
}

const List: React.FC = () => {
    const { recipes, handleInfiniteScrollRecipe } = useContext(RecipeContext)

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

        </ContainerScroll>
    );
}

export default List;

