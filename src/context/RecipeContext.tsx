import { useQuery } from '@apollo/client';
import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from "react";
import { QUERY_RECIPES } from '../components/queries/recipesQuery';


import realm from '../config/realmConfig/realm';
import { getPantry, getPantryByUuid, ItemInterface, minusQuantity, moreQuantity } from '../services/local/PantryLocalService';

interface RecipeContextData {
    recipes: any[];
    loading: boolean;
    error: any;
    reload(): any;
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
                take: 10,
                skip: 0,
            }
        },
        fetchPolicy: 'cache-first'
        // fetchPolicy: "cache-and-network"
    });

    const recipes = useMemo(() => {
        if(data){
            return data.recipes
        }
        return []
    }, [data]);
    
    const handleInfiniteScrollRecipe = useCallback(() => {        
        if((!recipes && !loading) || recipes.length % 10 !== 0) return;

        const { page, haveMore } = pageInfo        
        
        if(haveMore){
            console.log({pageInfo})

            fetchMore({
                variables: {
                    queryList: {
                        skip: page * 10,
                        take: 10
                    }
                }                
            })
            setPageInfo({
                ...pageInfo,
                // haveMore,
                page: page + 1,                        
            })
        }
    }, [pageInfo])

    const reload = useCallback(() => {
        refetch()
    }, [data])

    return (
        <RecipeContext.Provider value={{ recipes, handleInfiniteScrollRecipe, loading, error, reload }}>
            {children}
        </RecipeContext.Provider>
    );
}
