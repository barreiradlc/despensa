import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardDespensa';
import CardShoppingList from '../../components/CardShoppingList';
import FabGroup from '../../components/FabGroup';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import { getPantries, getShoppingList, getShoppingsList, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';

interface ShoppingListInterface{
    uuid?: string;
    pantryUuid: string;
    done: boolean;
    name: string;
}

const Show: React.FC = () => {
    const refreshRef = useRef()
    const navigation = useNavigation()    
    const route = useRoute()    
    const [ shoppingList, setShoppingList ] = useState<ShoppingListInterface>({} as ShoppingListInterface)
    const [ loading, setLoading ] = useState(true)

    const { shoppingList: shoppingListProps } = route.params

    useEffect(() => {
        reloadData()
    },[])
    
    async function reloadData() {        
        const data = await getShoppingList(shoppingListProps.uuid)
        setShoppingList(data)
        setLoading(false)
    }

    function HeaderLeft() {
        return (
            <Button invert onPress={() => refreshRef.current.reload() }>
                <Icon name="more-vertical" size={21} color="#555" />
            </Button>
        )
    }

    useEffect(() => {
        setLoading(true)        
        navigation.setOptions({            
            headerRight: () => <HeaderLeft />
        })

        // const unsubscribe = navigation.addListener('focus', () => {
        //     refreshRef.current.reload()
        //     reloadData()
        // });      
        // return unsubscribe;
    }, [])

  return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {/* {shoppingLists?.map(( shoppingList: ShoppingListInterface ) => 
                <CardShoppingList shoppingList={shoppingList} />
            )} */}

            <Button onPress={() => navigation.navigate('FormPantry', {}) }>
                <ButtonLabel>Adicionar Item</ButtonLabel>
            </Button>

            <LoadingSyncComponent ref={refreshRef} />

            <FabGroup visible={true} />

        </ContainerScroll>      
  );
}

export default Show;