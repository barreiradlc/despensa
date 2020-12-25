import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { ItemListContext } from '../../context/ItemListContext';
import { ItemInterface } from '../../services/local/PantryLocalService';
import { CardContainer, Label, Title, TooltipEditContainer, TooltipEditRowContainer } from '../../styles/components';
import ItemQuantity from './ItemQuantity';

// interface CardItemInterface{
//     item: ItemInterface
// }

const CardItem: React.FC = ({ items: itemsProps }) => {
    // const [items, setItems] = useState<ItemInterface[]>(itemsProps || [] as ItemInterface[])
    const { items, setItemsList } = useContext(ItemListContext)
    const navigation = useNavigation()

    useEffect(() => {
        setItemsList(itemsProps)
    }, [])

    function handleNavigateShow() {
        // navigation.navigate('ShowDespensa', {
        //     items: item.items
        // })
    }

    function EditOptions({item}) {

        return (
            <TooltipEditRowContainer>
                <TooltipEditContainer>
                    <ItemQuantity item={item} />
                    <Title></Title>
                    <Title>Editar</Title>
                    <Title></Title>
                    <Title>Deletar</Title>
                </TooltipEditContainer>
            </TooltipEditRowContainer>
        )

    }

    return (
        <>
            {items?.map((item: ItemInterface) => 
                <CardContainer onPress={handleNavigateShow} key={item.id} >            
                    <Tooltip
                        closeOnlyOnBackdropPress
                        popover={<EditOptions item={item} />}
                        backgroundColor="transparent"
                        overlayColor="rgba(250, 250, 250, 0.9)"
                        >
                        <Title>{item.provision.name}</Title>
                        <Label>{item.quantity} unidade{item.quantity !== 1 && 's'} {item.expiresAt && item.expiresAt} </Label>
                    </Tooltip>                    
                </CardContainer>
            )}
        </>
    );
}

export default CardItem;