import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardDespensa';
import CardShoppingList from '../../components/CardShoppingList';
import FabGroup from '../../components/FabGroup';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import { getPantries, getShoppingList, getShoppingsList, PantryInterface, ShoppingItemInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerEnd, ContainerScroll, Label, TooltipEditContainer, TooltipEditRowContainer } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';
import BottomSheet, { useBottomSheet, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Form from '../../components/bottomSheet/Form';
import CardShoppingItem from '../../components/CardShoppingItem';
import Tooltip from 'react-native-walkthrough-tooltip';
import ItemQuantity from '../../components/shoppingList/ItemQuantity';
import ItemActions from '../../components/shoppingList/ItemActions';

interface ShoppingListInterface {
    uuid?: string;
    pantryUuid: string;
    done: boolean;
    name: string;
}

const Show: React.FC = () => {
    const bottomSheet = useBottomSheet()
    const refreshRef = useRef()
    const toggleRef = useRef()
    const navigation = useNavigation()
    const route = useRoute()
    const [shoppingListCheckout, setShoppingListCheckout] = useState<ShoppingItemInterface[]>([] as ShoppingItemInterface[])
    const [shoppingList, setShoppingList] = useState<ShoppingListInterface>({} as ShoppingListInterface)
    const [loading, setLoading] = useState(true)
    const [toggle, setToggle] = useState('')
    const [index, setIndex] = useState(-1)

    const bottomSheetRef = useRef<BottomSheet>(null);
    const { shoppingList: shoppingListProps } = route.params

    async function reloadData() {
        const data = await getShoppingList(shoppingListProps.uuid)
        setLoading(false)
        navigation.setOptions({
            title: data.name,
            headerRight: () => <HeaderLeft />
        })
        setIndex(-1)
        
        
        Keyboard.dismiss()
        // bottomSheetRef.current?.close()
        
        setShoppingList(data)
        const itemsDone = data?.items.filter((item: ShoppingItemInterface) => item.done)
        setShoppingListCheckout(itemsDone)

        console.log("RELOADED")
    }

    useEffect(() => {
        setLoading(true)
        bottomSheetRef.current?.close()
        reloadData()
        
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {            
            reloadData()
        });      
        return unsubscribe;        
    }, [])

    // ref

    // variables
    const snapPoints = useMemo(() => ['30%', '85%'], []);

    // callbacks
    const handleSheetChanges = useCallback((i: number) => {
        console.log('handleSheetChanges', i);
        setIndex(i)
        if (i === -1 || i === 0) {
            toggleRef.current.toggle()
            return bottomSheetRef.current?.close()
        }
    }, []);

    function handleEditShoppingList() {
        console.debug('shoppingList')
        console.debug(shoppingListProps)

        navigation.navigate('FormShoppingList', {
            list: shoppingListProps
        })
    }

    function HeaderLeft() {
        return (
            <Button invert onPress={handleEditShoppingList}>
                <Icon name="more-vertical" size={21} color="#555" />
            </Button>
        )
    }

    const handleToggleBottomSheet = useCallback((e: any) => {
        console.log({ index })
        if (index === -1 || index === 0) {
            toggleRef.current.toggle()
            return bottomSheetRef.current?.expand()
        } else {
            toggleRef.current.toggle()
            return bottomSheetRef.current?.close()
        }
    }, [])

    const handleCloseBottomSheet = useCallback((e: any) => {
        console.log({ bottomSheet })

        bottomSheetRef.current?.close()
        reloadData()
    }, [])

    function handleManageItems(item: ShoppingItemInterface) {

        const checkout = shoppingListCheckout.filter(prevItem => prevItem.uuid !== item.uuid)
        console.log(item)
        console.log(checkout.length === shoppingListCheckout.length)

        if (checkout.length === shoppingListCheckout.length) {
            if (item.done) {

                console.log('push')
                console.log([...shoppingListCheckout, item])

                setShoppingListCheckout([...shoppingListCheckout, item])
            }
        } else {
            setShoppingListCheckout(checkout)
        }
    }

    function EditOptions({ item }) {

        return (
            <TooltipEditRowContainer>
                <TooltipEditContainer>
                    <ItemQuantity item={item} reloadData={reloadData} />
                    <ItemActions item={item} setToggle={setToggle} />
                </TooltipEditContainer>
            </TooltipEditRowContainer>
        )
    }

    function handleToggleToolTip( uuid:string ) {
        if(toggle === uuid){
            return setToggle('')
        }
        return setToggle(uuid)
    }

    return (
        <>
            <ContainerScroll
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {shoppingList.items?.map((shoppingItem: ShoppingItemInterface, index: number) =>
                    <Tooltip
                        backgroundColor="rgba(250, 250, 250, 0.9)"
                        contentStyle={{ width: '100%', elevation: 25, height: 120 }}
                        onClose={() => setToggle('')}
                        // isVisible={false}
                        isVisible={shoppingItem.uuid === toggle}
                        content={<EditOptions item={shoppingItem} />}
                        placement={!!index ? 'top' : 'bottom'}
                    >
                        <CardShoppingItem key={shoppingItem.uuid} handleManageItems={handleManageItems} shoppingItem={shoppingItem} toolTip={handleToggleToolTip} />
                    </Tooltip>
                )}

            </ContainerScroll>

            {index <= 0 &&
                <>
                    {!!shoppingListCheckout.length &&
                        <ContainerEnd style={{ elevation: 0 }}>
                            <Button onPress={handleToggleBottomSheet}>
                                <ButtonLabel>Finalizar compra de {shoppingListCheckout.length} ite{shoppingListCheckout.length > 1 ? 'ns' : 'm'} </ButtonLabel>
                            </Button>
                        </ContainerEnd>
                    }

                    <ContainerEnd style={{ elevation: 0 }}>
                        <Button onPress={handleToggleBottomSheet}>
                            <ButtonLabel>Adicionar Item</ButtonLabel>
                        </Button>
                    </ContainerEnd>
                </>
            }

            <BottomSheet
                ref={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >

                <Form shoppingList={shoppingList} close={handleCloseBottomSheet} ref={toggleRef} index={index} />

            </BottomSheet>

        </>
    );
}

export default Show;