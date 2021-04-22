import React, { useRef } from 'react';
import { View } from 'react-native';
import ItemOptions from '../../components/pantry/ItemOptions';
import { ItemContainer, ItemTab, ItemTabLabel } from '../../components/styles/pantry';
import TooltipComponent from '../../components/utils/TooltipComponent';
import { ItemInterface } from '../../config/realmConfig/schemas/Item';

// import { Container } from './styles';

interface ItemPantryInterface {
    data: ItemInterface;
    uuidPantry: string;
}

const ItemPantry: React.FC<ItemPantryInterface> = ({ data, uuidPantry }) => {
    const itemRef = useRef()

    function handleCloseToolTip() {
        itemRef.current.toggleTooltip()
    }

    return (
        <TooltipComponent content={<ItemOptions item={data} uuidPantry={uuidPantry} close={handleCloseToolTip} />} ref={itemRef}>
            <ItemContainer
                onLongPress={() => {
                    itemRef.current.toggleTooltip()
                }}
            >
                <ItemTab>
                    <ItemTabLabel>
                        {data.provision ? data.provision.name : 'PROVIMENTO INVÄLIDO'}
                    </ItemTabLabel>
                </ItemTab>

            </ItemContainer>
        </TooltipComponent>
    );
}

export default ItemPantry;