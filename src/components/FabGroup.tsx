import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { Portal, FAB } from 'react-native-paper';
import { cor1, cor2 } from '../styles/components';
import https from "https"
// import { Container } from './styles';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

console.log(process.env)


const httpsAgent = {
    
    rejectUnauthorized: false,
};

const FabGroup: React.FC = ({visible = false}) => {
    const route = useRoute()
    const navigation = useNavigation()

    const [state, setState] = React.useState({ open: false, visibleFab: visible });

    const onStateChange = ({ open }) => setState({ open });
    const onVisibleStateChange = ({ visibleFab }) => setState({ visibleFab });

    const { open, visibleFab } = state;

    useEffect(() => {
    //     setVisible(true)

    // onVisibleStateChange({visibleFab :true})
    //     return setVisible(false)
    return onVisibleStateChange({visibleFab :false})
    },[])

    const send = useCallback(() => {
        try {
            fetch('https://192.168.0.117:4000', {
                method: 'GET',
                agent: httpsAgent,
            })
            .then(res => res.json())
            .then(res2 => console.log({res2}))
            .catch(e2 => console.log({e2}))
        } catch (error) {
            throw new Error(`Error sendind print request: ${JSON.stringify(error)}`);   
        }
        // .finally((c2) => alert(JSON.stringify(c2)))
      },[])

    return (

        
            <FAB.Group
                // visible={visibleFab}
                visible
                
                open={open}
                color={cor2}
                fabStyle={{ backgroundColor: cor1 }}
                icon={open ? 'close' : 'plus'}
                actions={[
                    { icon: 'plus', onPress: () => send() },
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