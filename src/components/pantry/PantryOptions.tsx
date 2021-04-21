import React, { useCallback } from 'react';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { Pantry } from '../../config/waterMelonDBConfig/schemas/Pantry';
import { ColContainer, ButtonOptions as Button, ButtonOptionsLabel as ButtonLabel } from '../styles/components';

interface PantryOptionsInterface {
    handleEditPantry(pantry: PantryInterface, index: number): void
    pantry: PantryInterface;
    index: number
}

const PantryOptions: React.FC<PantryOptionsInterface> = ({ handleEditPantry, pantry, index }) => {

    return (
        <ColContainer>
            <Button onPress={() => handleEditPantry(pantry, index)}>
                <ButtonLabel>Editar</ButtonLabel>
            </Button>
            <Button>
                <ButtonLabel>Excluir</ButtonLabel>
            </Button>
        </ColContainer>
    );
}

export default PantryOptions;