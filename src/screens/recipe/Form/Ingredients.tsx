import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Divider } from "react-native-elements";

import { PROVISIONS } from "../../../components/queries/provisionListQuery";
import IngredientItem from "../../../components/recipe/IngredientItem";
import { IngredientInterface, RecipeFormContext } from "../../../context/RecipeFormContext";
import { RowContainer } from "../../../styles/components";
import { Button, ButtonLabel, Container, ContainerScroll, FormContainerBottomSheet, Input, TouchableItem, TouchableItemLabel } from "../../../styles/form";

function Ingredients() {
    const [itemIndex, setItemIndex] = useState(-1)
    const [ingredients, setIngredients] = useState([])

    const { recipe, setRecipe } = useContext(RecipeFormContext)

    const [query, setQuery] = useState('')
    const [selectProvision, setSelectProvision] = useState(false)

    const { loading, error, data, refetch } = useQuery(PROVISIONS, {
        variables: {
            queryListInput: {
                query,
                take: 3
            }
        },
    });

    function handleChange(event: any, attr: string) {
        setRecipe({ ...recipe, [attr]: event.nativeEvent.text })
    }

    const showResults = useMemo(() => {
        console.log(!!query.length && selectProvision)

        if (!!query.length && selectProvision) {
            return false
        }
        return true
    }, [])

    const provisions = useMemo(() => {
        if (data) {
            return data.provisions
        }
        return []
    }, [data])

    function handleGetHeight() {
        console.log('Provisions')
        console.log(!!provisions.length)

        if (!!provisions.length && !!query.length) {
            return 120 * provisions.length
        }
        return 45
    }

    function handleAddIngredient() {
        const { ingredients } = recipe
        
        ingredients.unshift({
            uuid: uuidv4(),
            unit: 'UNIDADE',
            quantity: 1
        })
        
        setRecipe({ ...recipe, ingredients })
    }
    
    function handleChangeIngredient(ingredient:IngredientInterface) {
        const { ingredients } = recipe

        const newIngredientsList: IngredientInterface[] = ingredients.map(( prevIngredient: IngredientInterface ) => {
            if(prevIngredient.uuid === ingredient.uuid){
                return ingredient
            }
            return prevIngredient
        })

        console.log("newIngredientsList")
        console.log(JSON.stringify(newIngredientsList))
        
        setRecipe({ ...recipe, ingredients: newIngredientsList})
    }

    return (
        <Container
            keyboardShouldPersistTaps='handled'
        >
            <Button onPress={handleAddIngredient}>
                <ButtonLabel>Adicionar</ButtonLabel>
            </Button>

            <ContainerScroll>
                {recipe?.ingredients.map((ingredient, i) =>
                    <IngredientItem item={ingredient} handleChangeIngredient={handleChangeIngredient} />
                )}
            </ContainerScroll>

        </Container >
    );
}

export default Ingredients