import React, { useCallback } from 'react';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { ColContainer, ButtonOptions as Button, ButtonOptionsLabel as ButtonLabel } from '../styles/components';

interface PantryOptionsInterface{
    pantry: PantryInterface
}

const PantryOptions: React.FC<PantryOptionsInterface> = ({ pantry }) => {

    const handleEditPantry = useCallback(() => {

    }, [])

  return (
    <ColContainer>
        <Button>
            <ButtonLabel>Editar</ButtonLabel>
        </Button>
        <Button>
            <ButtonLabel>Excluir</ButtonLabel>
        </Button>
    </ColContainer>
    );
}

export default PantryOptions;