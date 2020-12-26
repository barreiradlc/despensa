import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
// import { Tooltip, Button } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';

import { ItemListContext } from '../../context/ItemListContext';
import { ItemInterface } from '../../services/local/PantryLocalService';
import { CardContainer, Label, Title, TooltipEditContainer, TooltipEditRowContainer } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';
import ItemActions from './ItemActions';
import ItemQuantity from './ItemQuantity';

// interface CardItemInterface{
//     item: ItemInterface
// }

const CardItem: React.FC = ({ pantry }) => {
    const [toggle, setToggle] = useState<string>('')
    const { items, setItemsList, populateItemsList, pantryUuid } = useContext(ItemListContext)
    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleReload()
        });
        return unsubscribe;
    }, [])

    function handleReload() {
        populateItemsList(pantry.uuid)
    }

    function EditOptions({ item }) {

        return (
            <TooltipEditRowContainer>
                <TooltipEditContainer>
                    <ItemQuantity item={item} />
                    <ItemActions item={item} setToggle={setToggle} />
                </TooltipEditContainer>
            </TooltipEditRowContainer>
        )

    }

    

    return (
        <>
            {items?.map((item: ItemInterface, index: number) =>
                <Tooltip
                    backgroundColor="rgba(250, 250, 250, 0.9)"
                    contentStyle={{ width: '100%', elevation: 25, height: 120 }}
                    onClose={() => setToggle('')}
                    // isVisible={false}
                    isVisible={item.uuid === toggle}
                    content={<EditOptions item={item} />}
                    placement={!!index ? 'top' : 'bottom'}
                >
                    <CardContainer
                        onPress={() => setToggle(item?.uuid)}  >
                        <Title>{item.provision.name}</Title>
                        <Label>{item.quantity} unidade{item.quantity !== 1 && 's'} {item.expiresAt && item.expiresAt} </Label>
                    </CardContainer>
                </Tooltip>
            )}

            <Button onPress={() => navigation.navigate('FormItem', { populateItemsList, pantryUuid: pantry.uuid })}>
                <ButtonLabel>Novo item</ButtonLabel>
            </Button>
        </>
    );
}

export default CardItem;