import React, { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { Pantry } from '../../config/waterMelonDBConfig/schemas/Pantry';
import { deletePantry } from '../../services/local/realm/PantryLocalService';
import { LocalDataContext } from '../context/LocalDataProvider';
import { ColContainer, ButtonOptions as Button, ButtonOptionsLabel as ButtonLabel } from '../styles/components';

interface PantryOptionsInterface {
    handleEditPantry(pantry: PantryInterface, index: number): void
    pantry: PantryInterface;
    index: number
}

const PantryOptions: React.FC<PantryOptionsInterface> = ({ handleEditPantry, pantry, index }) => {
    const { refreshPantries } = useContext(LocalDataContext)

    const handleDeletePantry = useCallback(() => {
        Alert.alert(
            "Tem certeza que deseja deletar estar despensa?",
            'A exclusão desta despensa implica na deleção de todos os itens vinculados a ela',
            [
                {
                    text: "Deletar",
                    onPress: () => {
                        deletePantry(pantry.uuid),
                            refreshPantries()
                    }
                },
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelar"),
                    style: "cancel"
                }
            ]
        )
    }, [pantry])

    return (
        <ColContainer>
            <Button onPress={() => handleEditPantry(pantry, index)}>
                <ButtonLabel>Editar</ButtonLabel>
            </Button>
            <Button onPress={handleDeletePantry}>
                <ButtonLabel>Excluir</ButtonLabel>
            </Button>
        </ColContainer>
    );
}

export default PantryOptions;