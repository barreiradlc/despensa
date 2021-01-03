import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';
import React, { useContext, useMemo, useState } from "react";
import { Text, View } from "react-native";
import { PROVISIONS } from "../../../components/queries/provisionListQuery";
import IngredientItem from "../../../components/recipe/IngredientItem";
import StepItem from "../../../components/recipe/StepItem";
import { RecipeFormContext, StepInterface } from "../../../context/RecipeFormContext";
import { Button, ButtonLabel, Container, ContainerScroll } from "../../../styles/form";

function Steps() {    
    const { recipe, setRecipe } = useContext(RecipeFormContext)

    const [query, setQuery] = useState('')
    const [selectProvision, setSelectProvision] = useState(false)

    function handleAddIngredient() {
        const { steps } = recipe

        steps.unshift({
            uuid: uuidv4(),
            order: steps.length,
            description: ''
        })

        setRecipe({ ...recipe, steps })
    }

    function handleChangeStep(step:StepInterface) {
        const { steps } = recipe

        const newStepsList: StepInterface[] = steps.map(( prevStep: StepInterface ) => {
            if(prevStep.uuid === step.uuid){
                return step
            }
            return prevStep
        })

        setRecipe({ ...recipe, steps: newStepsList})
    }

    return (
        <Container
            keyboardShouldPersistTaps='handled'
        >
            <Button onPress={handleAddIngredient}>
                <ButtonLabel>Adicionar</ButtonLabel>
            </Button>

            <ContainerScroll>
                {recipe?.steps.map((step, i) =>
                    <StepItem item={step} handleChangeStep={handleChangeStep} index={i} />
                )}
            </ContainerScroll>

        </Container >
    );
}

export default Steps