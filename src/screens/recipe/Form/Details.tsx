import React, { useContext, useRef, useState } from 'react'
import { Text, View } from 'react-native';
import { RecipeFormContext } from '../../../context/RecipeFormContext';
import { Container, Input } from '../../../styles/form';

function Details() {
    const { recipe, setRecipe } = useContext(RecipeFormContext)

    const nameRef = useRef()
    const descriptionRef = useRef()

    function handleChange(event: any, attr: string) {
        setRecipe({ ...recipe, [attr]: event.nativeEvent.text })
    }

    return (
        <Container>
            <Input
                    ref={nameRef}
                    placeholder='Nome'
                    value={recipe.name}
                    onChange={(e: any) => handleChange(e, 'name')}                    
                />
                <Input
                    multiline
                    numberOfLines={4}
                    textAlignVertical='top'
                    ref={descriptionRef}
                    placeholder='Descrição'
                    value={recipe.description}
                    onChange={(e: any) => handleChange(e, 'description')}
                    // autoCapitalize
                />
        </Container>
    );
}

export default Details