import React from 'react';
import { View } from 'react-native';
import { ItemContainer, ItemTab, ItemTabLabel } from '../../components/styles/pantry';

// import { Container } from './styles';

const ItemPantry: React.FC = () => {
    return (
        <ItemContainer
            onLongPress={() => {
                console.log("LONG PRESS")
            }}
        >
            <ItemTab>
                <ItemTabLabel>
                    ITEM TAL
                </ItemTabLabel>
            </ItemTab>

        </ItemContainer>
    );
}

export default ItemPantry;