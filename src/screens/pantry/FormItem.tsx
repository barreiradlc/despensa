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
import { CreateItemDTO, createLocalPantry, CreatePantryDTO, editLocalPantry } from '../../services/local/realm/PantryLocalService';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { ItemInterface } from '../../config/realmConfig/schemas/Item';
import { RectButton } from 'react-native-gesture-handler';

interface FormItemDataInterface {
    item: ItemInterface
    uuidPantry: string
}

interface FormInterface {
    close(): void;
    data: FormItemDataInterface
}

function FormItem({ close, data }: FormInterface) {
    const [itemData, setItemData] = useState<CreateItemDTO>({} as CreateItemDTO)
    const [query, setQuery] = useState<string>('')
    const [edit, setEdit] = useState<boolean>(false)

    function handleChange(event: any, attr: string) {
        setItemData({ ...itemData, [attr]: event.nativeEvent.text })
    }

    useEffect(() => {
        console.log({ data })
    }, [data])

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

    // async function handleSavePantry() {

    //     if (!itemData.name) {
    //         toastWithGravity("É necessário dar um nome à sua despensa")
    //     }

    //     Keyboard.dismiss()

    //     if (edit) {
    //         console.log('EDIT')
    //         await editLocalPantry({
    //             ...itemData,
    //             queue: true
    //         })
    //     } else {
    //         console.log('CREATE')
    //         await createLocalPantry({
    //             ...itemData,
    //             queue: true
    //         })
    //     }

    //     handleCloseBottomSheet()
    // }
    // function handleCloseBottomSheet() {
    //     close()
    //     itemData({} as CreatePantryDTO)
    // }

    // function handleDeletePantry() {
    //     console.log('Delete')
    //     // navigation.navigate('SignUp')
    //     // createLocalPantry(itemData)
    // }

    const handleChangeQuantity = useCallback((action: 'more' | 'less') => {

        console.log(action)

    }, [data])

    return (
        <FormContainerAutoComplete>

            {/* <ProvisionFetchComponent /> */}

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
                    value={itemData.quantity || String('1')}
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

            <Button onPress={() => console.log("alou")}>
                <ButtonLabel>{edit ? "Editar" : "Cadastrar"}</ButtonLabel>
            </Button>

            <Button invert onPress={() => console.log("alou")}>
                <ButtonLabel invert>{edit ? "Deletar" : "Cancelar"}</ButtonLabel>
            </Button>
        </FormContainerAutoComplete>
    );
}

export default FormItem;