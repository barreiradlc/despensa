import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Alert, Keyboard, ToastAndroid, TouchableOpacity, View } from 'react-native';

import { Button, ButtonLabel, Container, Input, LogoImage, FormContainer, FormItemContainer, TouchableItem, TouchableItemLabel, FormContainerBottomSheet, ContainerInput, ButtonAdd } from "../../styles/form"
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem, getProvision, getShoppingItem, handlePantryQueue, ItemInterface, ProvisionInterface, pushPantry, pushShoppingList, ShoppingItemInterface, ShoppingListInterface } from '../../services/local/PantryLocalService';
import { PROVISIONS } from '../../components/queries/provisionListQuery';
import { CardContainer, CardContainerProvision, ContainerScroll, Label, Title } from '../../styles/components';
// import Tooltip from 'react-native-walkthrough-tooltip';
import { Divider } from 'react-native-elements';
import Autocomplete, { AutocompleteProps } from "react-native-autocomplete-input";
import KeyBoardListener from '../listeners/KeyBoardListener';

import { Tooltip, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { cor3, cor5 } from '../../constants/CORES';

interface FormShoppingListProps {
    shoppingList: ShoppingListInterface;
    close(): void;
    // index: number;
}

interface InputInterface{
    focus(): void;
}


// export interface ModalShowFormElement {
// 	show(id?: string): void
// }


function FormShoppingItem({ close, shoppingList }: FormShoppingListProps, ref: ((instance: unknown) => void) | React.RefObject<unknown> | null | undefined) {
    const tooltpRef = useRef()
    const provisionOfflineRef = useRef()
    const provisionRef = useRef()
    const quantidadeRef = useRef<InputInterface>()
    const [query, setQuery] = useState('')
    const [selectProvision, setSelectProvision] = useState(false)
    const [queryProvision, setQueryProvision] = useState(false)
    const [focus, setFocus] = useState(false)
    const [provisionId, setProvisionId] = useState<String>()
    const [edit, setEdit] = useState(false)
    const { loading, error, data, refetch } = useQuery(PROVISIONS, {
        variables: {
            queryListInput: {
                query,
                take: 3
            }
        },
    });
    const [itemData, setItemData] = useState<ShoppingItemInterface>({
        quantity: 1
    } as ShoppingItemInterface)
    const navigation = useNavigation()
    // const route = useRoute()

    // const { populateItemsList, pantryUuid, item } = route.params

    useEffect(() => {
        setQuery('')
    }, [shoppingList])

    // useEffect(() => {
    //     console.log({focus})
    //     console.log({index})

    //     setFocus(index > 0)
    // }, [index])

    async function handleProvisionChange() {
        console.log(query)
        const provision = await getProvision({ name: query })

        console.log('provision')
        console.log({ provision })

        setItemData({ ...itemData, provision: provision })
    }

    function handleChange(event: any, attr: string) {
        setItemData({ ...itemData, [attr]: event.nativeEvent.text.trim().toLowerCase() })
    }

    function handleSetProvision(provision: ProvisionInterface) {
        console.log(provision)
        setQuery('')
        setQueryProvision(false)
        setItemData({ ...itemData, 'provision': provision })
        getProvision(provision)

        quantidadeRef.current.focus()
    }

    useImperativeHandle(ref, () => ({
        toggle: () => {
            setTimeout(() => {
                provisionOfflineRef.current.focus()
            }, 150)

            // provisionRef.current?.focus()
        },
        toggleEdit: (shoppingItem: ShoppingItemInterface) => {

            setEdit(true)
            setItemData({
                uuid: shoppingItem.uuid,
                quantity: shoppingItem.quantity || 1,
                provision: shoppingItem.provision
            })
            setQuery(shoppingItem.provision.name)

            setTimeout(() => {
                provisionOfflineRef.current.focus()
            }, 150)
            // provisionRef.current?.focus()
        }
    }), [shoppingList])

    function handleChangeProvision(event: any) {
        provisionRef.current?.focus()
        setQuery(event.nativeEvent.text.trim().toLowerCase())
    }

    function handleGoToSignUp() {
        navigation.navigate('SignUp')
    }

    function handleToggleProvision() {

    }

    // useEffect(() => {
    //     console.log({ item })

    //     if (item) {
    //         setItemData({
    //             ...item,
    //             quantity: String(item.quantity)
    //         })

    //         setQuery(item.provision.name)

    //         setEdit(true)
    //     }
    // }, [item])

    useEffect(() => {
        // provisionRef.current?.focus()
    }, [query])

    async function handleSaveItem() {
        getProvision({ name: query, id: provisionId })
            .then((provision) => {

                if (!provision) {
                    return handleSaveItem()
                }

                if (!provision.name) {
                    return ToastAndroid.show("Não é possível salvar um item sem seu nome", 500)
                }

                getShoppingItem(itemData, provision)
                    .then((item) => {

                        console.debug("item")
                        console.debug(item)
                        console.debug(edit)
                        console.debug(shoppingList)

                        // return handleSaveItem()

                        if (!edit) {
                            pushShoppingList(shoppingList, item)
                        }

                        console.debug({ shoppingList })

                        Keyboard.dismiss()
                        close()
                    })
            })

    }

    function queryProvisions() {
        setQueryProvision(true)
        setTimeout(() => {
            provisionRef.current.focus()
        }, 1500)
        // console.log(provisionRef)
    }

    const provisions = useMemo(() => {
        if (data) {
            return data.provisions
        }
        return []
    }, [data])

    const showResults = useMemo(() => {
        // console.log(`index ${index}`)

        if (!!query.length && selectProvision) {
            return false
        }
        return true
    }, [query, selectProvision])

    async function handleSaveLoginData() {

    }

    function hideKeyBoard() {
        console.log("HIDE")
        setSelectProvision(false)
    }

    function handleSelectQuery(provision: ProvisionInterface) {
        console.log({ provision })
        setProvisionId(provision.id)
        setQuery(provision.name)
        setSelectProvision(true)
        quantidadeRef.current.focus()
    }

    function handleGetHeight() {
        console.log('Provisions')
        console.log(!!provisions.length)

        if (!!provisions.length && !!query.length) {
            return 120 * provisions.length
        }
        return 45
    }

    function QueryInput() {
        return (
            <Input
                ref={provisionOfflineRef}
                placeholder='Item'
                value={query}
                onChangeText={(e: any) => { setQuery(e), setSelectProvision(true) }}
                autoCapitalize='none'
            />
        )
    }

    function ToolTipContainer(){
        return(
            <>
                {provisions.map(( item ) => 
                    <TouchableItem
                        key={item.id}
                        invert
                        onPress={() => handleSelectQuery(item)}
                    >
                        <TouchableItemLabel >{item.name}</TouchableItemLabel>
                    </TouchableItem>
                )}
            </>
        )
    }

    return (
        <>
        <ButtonAdd
            // onGestureEvent={handleClose}
            onPress={close}
            style={{
                zIndex: 23232,
                elevation: 4,
                margin: 5,
                bottom: 5,
                alignSelf: 'center',
                borderRadius: 45,
                backgroundColor: cor3
            }}
        >
            <Icon name='x' size={34} color={cor5} />
        </ButtonAdd>
        <Container
            style={{
                paddingTop: 25,
                flex: 1
            }}
        >
            <KeyBoardListener hide={hideKeyBoard} show={() => console.log("SHOW")} />
            
                <FormContainer
                    
                >

                {(!!query.length && !selectProvision) &&
                    <ToolTipContainer />            
                }

                <ContainerInput>
                    <Input
                        ref={provisionOfflineRef}
                        placeholder='Item'
                        value={query}
                        onChangeText={(e: any) => { setQuery(e), setSelectProvision(false) }}
                        autoCapitalize='none'
                        />
                {/* </ContainerInput>

                <ContainerInput> */}
                    <Input
                        style={{ right : 60 }}
                        ref={quantidadeRef}
                        placeholder='Qtd.'
                        value={String(itemData.quantity)}
                        onChange={(e: any) => handleChange(e, 'quantity')}
                        autoCapitalize='none'
                        />
                </ContainerInput>

                    <Button onPress={handleSaveItem}>
                        <ButtonLabel>Salvar</ButtonLabel>
                    </Button>
                </FormContainer>

                {/* </Tooltip> */}
            {/* </FormContainerBottomSheet> */}
        </Container>
        </>
    );
}

export default forwardRef(FormShoppingItem);