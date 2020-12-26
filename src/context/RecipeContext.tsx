import { useQuery } from '@apollo/client';
import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from "react";
import { QUERY_RECIPES } from '../components/queries/recipeQuery';
import realm from '../config/realmConfig/realm';
import { getPantry, getPantryByUuid, ItemInterface, minusQuantity, moreQuantity } from '../services/local/PantryLocalService';

interface RecipeContextData {
    recipes: any[];
    handleInfiniteScrollRecipe(): void[];
}

interface PageInfoInteface {
    haveMore: boolean;
    page: number;    
}

const INITIAL_PAGE_INFO = {
    haveMore: true,
    page: 1
}

export const RecipeContext = createContext<RecipeContextData>({} as RecipeContextData)

export const RecipeProvider: React.FC = ({ children }) => {
    const [ pageInfo, setPageInfo ] = useState(INITIAL_PAGE_INFO as PageInfoInteface)
    const { loading, error, data, refetch, fetchMore } = useQuery(QUERY_RECIPES, {
        variables: {
            queryList: {
                take: 10
            }
        }
    });

    const handleInfiniteScrollRecipe = useCallback(() => {
        const { page, haveMore } = pageInfo

        if(haveMore){
            fetchMore({
                variables: {
                    skip: 10 * page
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    console.log("DATA")
                    console.log(prev)
                    console.log(fetchMoreResult)
                    console.log("DATA")

                    // return Object.assign({}, prev, {
                    //     recipes: [
                    //         ...prev.recipes,
                    //         ...fetchMoreResult.recipes
                    //     ]                        
                    // });

                    // return [
                    //     ...prev.recipes,
                    //     ...fetchMoreResult.recipes
                    // ];                        

                }
            })
        }
    }, [pageInfo])

    const recipes = useMemo(() => {
        if(data){
            return data.recipes
        }
        return []
    }, [data]);

    return (
        <RecipeContext.Provider value={{ recipes, handleInfiniteScrollRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
}
