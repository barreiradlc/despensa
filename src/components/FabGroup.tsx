import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { Portal, FAB } from 'react-native-paper';
import { cor1, cor2 } from '../styles/components';
import https from "https"
// import { Container } from './styles';

const FabGroup: React.FC = ({visible = false}) => {
    const route = useRoute()
    const navigation = useNavigation()

    const [state, setState] = React.useState({ open: false, visibleFab: visible });

    const onStateChange = ({ open }) => setState({ open });
    const onVisibleStateChange = ({ visibleFab }) => setState({ visibleFab });

    const { open, visibleFab } = state;

    useEffect(() => {    
        return onVisibleStateChange({visibleFab :false})
    },[])

    return (
        
            <FAB.Group
                // visible={visibleFab}
                visible
                style={{
                    marginBottom: 50
                }}
                open={open}
                color='#fff'
                fabStyle={{ backgroundColor: cor1 }}
                icon={open ? 'close' : 'plus'}
                actions={[
                    // { icon: 'plus', onPress: () => console.log("ALOU") },
                    {
                        icon: 'fridge',
                        label: 'Adicionar despensa',
                        onPress: () => navigation.navigate('FormPantry', {}),
                    },
                    {
                        icon: 'format-list-bulleted',
                        label: 'Adicionar lista de compras',                        
                        onPress: () => navigation.navigate('FormShoppingList', {}),
                    },
                    {
                        icon: 'food',
                        label: 'Adicionar Receita',
                        onPress: () => navigation.navigate('FormRecipe'),
                    },
                ]}
                onStateChange={onStateChange}
                onPress={() => {
                    if (open) {
                        // do something if the speed dial is open
                    }
                }}
            />        
    );
}

export default FabGroup;