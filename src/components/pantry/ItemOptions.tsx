import React, { useCallback, useContext } from 'react';
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import { BottomSheetItemContext } from '../context/BottomSheetItemProvider';
import { ColContainer, ButtonOptions as Button, ButtonOptionsLabel as ButtonLabel } from '../styles/components';

interface ItemOptionsInterface {
    item: ItemInterface;
    uuidPantry: string;
    close(): void
}

const ItemOptions: React.FC<ItemOptionsInterface> = ({ item, uuidPantry, close }) => {

    const { handleOpen } = useContext(BottomSheetItemContext)

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
            <Button>
                <ButtonLabel>Excluir</ButtonLabel>
            </Button>
        </ColContainer>
    );
}

export default ItemOptions;