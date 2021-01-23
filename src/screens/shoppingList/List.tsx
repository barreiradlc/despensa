import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardPantry';
import CardShoppingList from '../../components/CardShoppingList';
import FabGroup from '../../components/FabGroup';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import { getPantries, getShoppingsList, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';


interface ShoppingListInterface{
    uuid?: string;
    pantryUuid: string;
    done: boolean;
    name: string;
}


const List: React.FC = () => {
    const refreshRef = useRef()
    const navigation = useNavigation()    
    const [ shoppingLists, setShoppingLists ] = useState<ShoppingListInterface[]>([] as ShoppingListInterface[])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        reloadData()
    },[])
    
    async function reloadData() {        
        const data = await getShoppingsList()
        console.log({data})
        setShoppingLists(data)
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

        const unsubscribe = navigation.addListener('focus', () => {            
            reloadData()
        });      
        return unsubscribe;
    }, [])

  return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {shoppingLists?.map(( shoppingList: ShoppingListInterface ) => 
                <CardShoppingList key={shoppingList.uuid} shoppingList={shoppingList} />
            )}

            {/* <Button onPress={() => navigation.navigate('FormPantry', {}) }>
                <ButtonLabel>Nova despensa</ButtonLabel>
            </Button> */}

            <LoadingSyncComponent ref={refreshRef} />

            {/* <FabGroup visible={true} /> */}

        </ContainerScroll>      
  );
}

export default List;