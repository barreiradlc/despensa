import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardPantry';
import CardShoppingList from '../../components/CardShoppingList';
import FabGroup from '../../components/FabGroup';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import ItemsAccordion from '../../components/shoppingList/ItemsAccordion';
import { getPantries, getShoppingsList, handleShoppingListsCheckout, PantryInterface } from '../../services/local/PantryLocalService';
import { getShoppingFinished } from '../../services/local/ShoppingListLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { ButtonAdd as Button, ButtonLabelAdd as ButtonLabel, FormContainer } from '../../styles/form';
import Form from './Form';


interface ShoppingListInterface {
    uuid?: string;
    pantryUuid: string;
    done: boolean;
    name: string;
}

const List: React.FC = () => {
    const refreshRef = useRef();
    const navigation = useNavigation();
    const [shoppingLists, setShoppingLists] = useState<ShoppingListInterface[]>([] as ShoppingListInterface[]);
    const [loading, setLoading] = useState(true);
    const [showFinish, setShowFinish] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        reloadData()
        getFinishedShopping()
    }, [])

    async function reloadData() {
        const data = await getShoppingsList()
        console.log({ data })
        setShoppingLists(data)
        setLoading(false)
    }

    function HeaderLeft() {
        return (
            <Button invert onPress={() => refreshRef.current.reload()}>
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

    const toggleBottomSheet = useCallback((value: boolean) => {
        console.log("value")
        console.log(value)
        
        setIsVisible(value)
    }, [])

    const handleFinishShopping = useCallback( async() => {
        handleShoppingListsCheckout()
            .then( _ => {
                reloadData()
                getFinishedShopping()
            })
    }, [shoppingLists])

    const getFinishedShopping = useCallback( async() => {
        const value = await getShoppingFinished()
        console.log("getShoppingFinished()")
        console.log(!!value)

        setShowFinish(!!value)
    }, [shoppingLists])

    return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {shoppingLists?.map((shoppingList: ShoppingListInterface) =>
                <ItemsAccordion key={shoppingList.uuid} shoppingList={shoppingList} getFinishedShopping={getFinishedShopping} />
            )}

            <FormContainer
                style={{
                    justifyContent: 'flex-end'
                }}
            >
                {/* <Button onPress={() => navigation.navigate('FormShoppingList')}> */}
                {showFinish && 
                    <Button onPress={handleFinishShopping}>
                        <ButtonLabel>Finalizar compras</ButtonLabel>
                    </Button>
                }

                <Button onPress={() => toggleBottomSheet(true)}>
                    <ButtonLabel>Adicionar lista de compras</ButtonLabel>
                </Button>
            </FormContainer>

            <BottomSheet   
                modalProps={{
                    
                }}
                isVisible={isVisible}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
                >       

                <Form toggleBottomSheet={toggleBottomSheet} />
                      
            </BottomSheet>

            <LoadingSyncComponent ref={refreshRef} />

            {/* <FabGroup visible={true} /> */}

        </ContainerScroll>
    );
}

export default List;