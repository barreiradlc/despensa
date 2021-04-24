import React, { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import { deleteItemPantry } from '../../services/local/realm/PantryLocalService';
import { BottomSheetItemContext } from '../context/BottomSheetItemProvider';
import { LocalDataContext } from '../context/LocalDataProvider';
import { ColContainer, ButtonOptions as Button, ButtonOptionsLabel as ButtonLabel } from '../styles/components';

interface ItemOptionsInterface {
    item: ItemInterface;
    uuidPantry: string;
    close(): void
}

const ItemOptions: React.FC<ItemOptionsInterface> = ({ item, uuidPantry, close }) => {
    const { handleOpen } = useContext(BottomSheetItemContext)
    const { refreshPantries } = useContext(LocalDataContext)

    const handleDeleteItemPantry = useCallback(() => {
        Alert.alert(
            "Tem certeza que deseja deletar este item?",
            '',
            [
                {
                    text: "Deletar",
                    onPress: () => {
                        deleteItemPantry(String(item.uuid)),
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
    }, [item])

    const handleOpenBottomSheet = useCallback(() => {
        console.log(uuidPantry)
        console.log(item)
        close()
        handleOpen(uuidPantry, item)
    }, [item, uuidPantry])

    return (
        <ColContainer>
            <Button onPress={handleOpenBottomSheet}>
                <ButtonLabel>Editar</ButtonLabel>
            </Button>
            <Button onPress={handleDeleteItemPantry}>
                <ButtonLabel>Excluir</ButtonLabel>
            </Button>
        </ColContainer>
    );
}

export default ItemOptions;