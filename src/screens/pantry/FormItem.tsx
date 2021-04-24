import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { Button, ButtonLabel, Container, FormContainer, Input, LogoImage, ContainerInput, FormContainerAutoComplete, InputMultiline } from "../../components/styles/form"
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../components/gql/mutations/loginMutation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { cor2 } from '../../constants/CORES';
import { LoadingOverlayContext } from '../../components/context/LoadingProvider';

import Toast from 'react-native-simple-toast';
import { toastWithGravity } from '../../utils/toastUtils';
import { CreateItemDTO, createLocalItem, createLocalPantry, CreatePantryDTO, deleteItemPantry, editLocalPantry, getLocalProvision, updateLocalItem } from '../../services/local/realm/PantryLocalService';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import { RectButton } from 'react-native-gesture-handler';
import { ProvisionInterface } from '../../config/realmConfig/schemas/Provision';
import { LocalDataContext } from '../../components/context/LocalDataProvider';

interface FormItemDataInterface {
    item: ItemInterface
    uuidPantry: string
}

interface FormInterface {
    close(): void;
    data: FormItemDataInterface
}

function FormItem({ close, data }: FormInterface) {
    const { refreshPantries } = useContext(LocalDataContext)
    const [itemData, setItemData] = useState<CreateItemDTO>({} as CreateItemDTO)
    const [provisionData, setProvisionData] = useState<ProvisionInterface>()
    const [query, setQuery] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)

    function handleChange(event: any, attr: string) {
        setItemData({ ...itemData, [attr]: event.nativeEvent.text })
    }

    useEffect(() => {
        console.log("BOTTOM SHEET")
        console.log(data)
        console.log(data.item.uuid)


        if (!!data.item.uuid) {
            const { item } = data

            setEdit(true)
            setItemData({
                provision: item.provision,
                uuid: item.uuid,
                _id: item._id,
                quantity: 1,
                queue: true
            })

            setQuery(item.provision.name)
        } else {
            setEdit(false)
            setItemData({ quantity: 1 } as CreateItemDTO)
            setQuery('')
        }
    }, [data.item])

    useEffect(() => {

        console.log("{ itemData }")
        console.log({ itemData })

    }, [itemData])

    // useEffect(() => {

    //     setEdit(!!data.uuid)

    //     if (data) {
    //         itemData({
    //             name: data.name,
    //             description: data.description,
    //             queue: data.queue,
    //             uuid: data.uuid
    //         })
    //     }
    // }, [data])

    // useEffect(() => {
    //     console.log({ itemData })
    // }, [])

    async function handleSaveItem() {

        const pantry = data.uuidPantry

        if (!query) {
            toastWithGravity("É necessário dar um nome à seu item")
        }
        Keyboard.dismiss()

        const provision = provisionData || await getLocalProvision({ name: query })

        if (!provision) return handleSaveItem()

        const item = {
            ...itemData,
            provision,
            queue: true
        }

        if (edit) {
            console.log('EDIT')
            console.log(item.uuid)
            console.log(item)
            console.log({ itemData })

            await updateLocalItem({ ...item, queue: true })
        } else {
            console.log('CREATE')
            await createLocalItem({ ...item, queue: true }, pantry)
        }

        handleCloseBottomSheet()
    }
    function handleCloseBottomSheet() {
        close()
        setItemData({} as CreateItemDTO)
        setQuery('')
        refreshPantries()
    }

    function handleDeletePantry() {
        console.log('Delete')
        // navigation.navigate('SignUp')
        // createLocalPantry(itemData)
    }

    const handleChangeQuantity = useCallback((action: 'more' | 'less') => {

        console.log(action)

    }, [data])

    const handleDeleteItemPantry = useCallback(() => {
        Alert.alert(
            "Tem certeza que deseja deletar este item?",
            '',
            [
                {
                    text: "Deletar",
                    onPress: () => {
                        deleteItemPantry(String(itemData.uuid)),
                            handleCloseBottomSheet()
                    }
                },
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancelar"),
                    style: "cancel"
                }
            ]
        )
    }, [itemData])

    return (
        <FormContainerAutoComplete>

            {/* <ProvisionFetchComponent /> */}
            <ButtonLabel invert>{edit ? "Editar item" : "Novo Item"}</ButtonLabel>

            <ContainerInput>
                <Input
                    noIconStart
                    placeholder='Nome'
                    value={query}
                    onChange={(e: any) => {
                        const { text } = e.nativeEvent
                        setQuery(text.toLowerCase())
                        // handleChange(e, 'name')
                    }}
                />
            </ContainerInput>

            <ContainerInput>
                <Input
                    noIconStart
                    placeholder='Quantidade'
                    value={`${itemData.quantity}`}
                    onChange={(e: any) => handleChange(e, 'quantity')}
                />

                {/* TODO, QTD BUTTONS */}
                {/* <RectButton onPress={() => handleChangeQuantity('less')}>
                    <Icon size={25} name={'minus'} color={cor2} />
                </RectButton>
                <RectButton onPress={() => handleChangeQuantity('more')}>
                    <Icon size={25} name={'plus'} color={cor2} />
                </RectButton> */}
            </ContainerInput>

            <Button onPress={handleSaveItem}>
                <ButtonLabel>{edit ? "Editar" : "Cadastrar"}</ButtonLabel>
            </Button>

            <Button invert onPress={handleDeleteItemPantry}>
                <ButtonLabel invert>{edit ? "Deletar" : "Cancelar"}</ButtonLabel>
            </Button>
        </FormContainerAutoComplete>
    );
}

export default FormItem;