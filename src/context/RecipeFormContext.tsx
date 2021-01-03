import { useMutation } from '@apollo/client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext } from "react";
import { CREATE_RECIPE_MUTATION } from '../components/mutations/CREATE_RECIPE_MUTATION';
import realm from '../config/realmConfig/realm';
import { getPantry, getPantryByUuid, ItemInterface, minusQuantity, moreQuantity } from '../services/local/PantryLocalService';

export interface ProvisionInterface{
    id: string;
    name: string;    
}

export interface IngredientInterface{
    uuid: string;
    quantity?: number;
    unit?: string;
    provision: ProvisionInterface
}

export interface StepInterface{
    id: string;
    uuid: string;
    description: string;
    order?: number;    
}

export interface RecipeInterface{
    name?: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
    ingredients: IngredientInterface[]
    steps: StepInterface[]
}

interface RecipeFormContextData {
    recipe: RecipeInterface;
    setRecipe: any;
    loading: boolean;
    sendRecipe(): any;
}

export const RecipeFormContext = createContext<RecipeFormContextData>({} as RecipeFormContextData)

const mockValue =  {"name":"Omelete temperada","description":"Receita de uma deliciosa omelete temperada","steps":[{"uuid":"19f53638-d84d-4b9f-9be7-3010cfab2c4f","order":1,"description":"Unte a frigideira"},{"uuid":"721c6912-aa96-4997-a432-5a5765bffe21","order":0,"description":"Enquente em fogo leve"}],"ingredients":[{"uuid":"4a4021b7-659b-46a1-8e90-16519c1998a8","unit":"UNIDADE","quantity":1,"provision":{"id":"5fe83cb4a64c717ea06dcb65","name":"margarina"}},{"uuid":"30581201-b650-4933-8786-e37f4cd1956e","unit":"UNIDADE","quantity":1,"provision":{"id":"5fe8abe0f5fc5b1ceb073498","name":"ovo"}}]}

export const RecipeFormProvider: React.FC = ({ children }) => {
    const [recipe, setRecipe] = useState(__DEV__ && mockValue)
    const [createRecipe, { data, error, loading }] = useMutation(CREATE_RECIPE_MUTATION);        

    const sendRecipe = useCallback(() => {
        console.log('recipe')
        console.log(JSON.stringify(recipe))
        createRecipe({
            variables: {
                recipe
            }
        })
    }, [recipe])
    
    useEffect(() => {
        console.log(JSON.stringify(data))
    }, [data])

    useEffect(() => {
        console.debug({error})
        console.debug(error)
    }, [error])

    return (
        <RecipeFormContext.Provider value={{ recipe, setRecipe, sendRecipe, loading }}>
            {children}
        </RecipeFormContext.Provider>
    );
}