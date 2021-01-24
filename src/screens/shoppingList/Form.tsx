import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, BottomSheetContainer, Input, FormItemContainer, ContainerInput, ButtonAdd } from "../../styles/form"
import { deleteShoppingList, getPantries, manageShoppingList, PantryInterface } from '../../services/local/PantryLocalService';
import { Picker } from '@react-native-picker/picker';
import { RectButton } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import { cor3, cor5 } from '../../constants/CORES';

interface ShoppingListInterface {
    uuid?: string;
    pantryUuid: string;
    done?: boolean;
    name: string;
}

const Form: React.FC = ({ list, toggleBottomSheet }) => {
    const nameRef = useRef()

    const [edit, setEdit] = useState(false)
    const [pantriesList, setPantriesList] = useState<PantryInterface[]>([] as PantryInterface[])
    const [shoppingList, setShoppingList] = useState<ShoppingListInterface>({} as ShoppingListInterface)
    const navigation = useNavigation()
    // const route = useRoute()

    // const { list } = route.params

    function handleChange(event: any, attr: string) {
        setShoppingList({ ...shoppingList, [attr]: event.nativeEvent.text })
    }

    useEffect(() => {
        if (list) {
            console.log(list.uuid)
            console.log(list.name)
            console.log(list.pantryUuid)

            // navigation.setOptions({
            //     title: "Editar Lista de compras"
            // })

            setShoppingList({
                uuid: list.uuid,
                name: list.name,
                pantryUuid: list.pantryUuid,
            })

            setEdit(true)
        } else {
            // navigation.setOptions({
            //     title: "Nova Lista de compras"
            // })
        }
        populatePantriesList()
        // nameRef.current.focus()
    }, [list])

    useEffect(() => {
        setTimeout(() => {
            nameRef.current.focus()
        }, 500)
    }, [])

    async function populatePantriesList() {
        const pantries = await getPantries()
        setPantriesList(pantries)
        if (shoppingList.pantryUuid) {
            setShoppingList({ ...shoppingList, pantryUuid: pantries[0].uuid })
        }
    }

    async function handleDeleteShoppingListConfirmed() {
        deleteShoppingList(String(shoppingList.uuid))
        // navigation.goBack()
        // navigation.goBack()
        return ToastAndroid.show("Lista de compras deletada com sucesso!", 500)
    }

    async function handleDeleteShoppingList() {
        Alert.alert(
            'Deseja realmente deletar lista de compras?',
            "Esta ação deletará sua lista de compras e invalidará TODOS os itens que nela estão registrados",
            [
                {
                    text: 'Não',
                    onPress: () => console.log('canceled')
                },
                {
                    text: 'Sim',
                    onPress: () => handleDeleteShoppingListConfirmed()
                }
            ]
        )
    }

    async function handleSaveShoppingList() {
        if (!shoppingList.name) {
            return ToastAndroid.show("Dê um nome a sua lista de compras para continuar!", 500)
        }

        await manageShoppingList(shoppingList)
        // navigation.goBack()
        handleClose()
    }

    const handleClose = useCallback(() => {
        console.log("ALOU")
        toggleBottomSheet(false)
    }, [])

    return (
        <>
        <ButtonAdd
            // onGestureEvent={handleClose}
            onPress={handleClose}
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
        <BottomSheetContainer>

            <FormItemContainer>
                <Picker
                    style={{ elevation: 2 }}
                    selectedValue={shoppingList.pantryUuid}
                    // style={{height: 50, width: 100}}
                    onValueChange={(itemValue) =>
                        setShoppingList({ ...shoppingList, pantryUuid: itemValue })
                    }>

                    {pantriesList.filter(p => !p.deletedAt).map((pantryItem) =>
                         <Picker.Item key={pantryItem.uuid} label={pantryItem.name} value={pantryItem.uuid} />
                    )}

                </Picker>

                <ContainerInput>
                    <Input
                        noIconStart
                        ref={nameRef}
                        placeholder='Nome'
                        value={shoppingList.name}
                        onChange={(e: any) => handleChange(e, 'name')}
                        />
                </ContainerInput>

                <Button onPress={handleSaveShoppingList}>
                    <ButtonLabel>Salvar</ButtonLabel>
                </Button>

                {edit &&
                    <Button invert onPress={handleDeleteShoppingList}>
                        <ButtonLabel>Deletar</ButtonLabel>
                    </Button>
                }

            </FormItemContainer>

        </BottomSheetContainer>
        </>
    );
}

export default Form;