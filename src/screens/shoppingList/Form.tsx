import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, Input, LogoImage, FormContainer, FormItemContainer } from "../../styles/form"
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deletePantry, getItem, getPantries, getPantry, getProvision, handlePantryQueue, ItemInterface, manageShoppingList, PantryInterface, ProvisionInterface, pushPantry } from '../../services/local/PantryLocalService';
import { PROVISIONS } from '../../components/queries/provisionListQuery';
import { CardContainer, CardContainerProvision, ContainerScroll, Label, Title } from '../../styles/components';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Divider } from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

interface ShoppingListInterface{
    uuid?: string;
    pantryUuid: string;
    done?: boolean;
    name: string;
}

const Form: React.FC = () => {    
    const nameRef = useRef()    

    const [edit, setEdit] = useState(false)
    const [pantriesList, setPantriesList] = useState<PantryInterface[]>([] as PantryInterface[])
    const [shoppingList, setShoppingList] = useState<ShoppingListInterface>({} as ShoppingListInterface)
    const [pantryData, setPantryData] = useState<PantryInterface>({} as PantryInterface)
    const navigation = useNavigation()
    const route = useRoute()

    const { list } = route.params

    function handleChange(event: any, attr: string) {
        setShoppingList({ ...shoppingList, [attr]: event.nativeEvent.text })
    }

    useEffect(() => {
        if (list) {
            console.log(list.uuid)
            console.log(list.name)
            console.log(list.pantryUuid)

            navigation.setOptions({
                title: "Editar Lista de compras"
            })
            setShoppingList({
                uuid: list.uuid,
                name: list.name,
                pantryUuid: list.pantryUuid,
            })
            setEdit(true)
        } else {
            navigation.setOptions({
                title: "Nova Lista de compras"
            })
        }
        populatePantriesList()
        nameRef.current.focus()
    }, [list])
    
    async function populatePantriesList(){
        const pantries = await getPantries()
        setPantriesList(pantries)
        if(shoppingList.pantryUuid){
            setShoppingList({ ...shoppingList, pantryUuid: pantries[0].uuid })
        }
    }

    async function handleDeleteShoppingListConfirmed() {
        deleteShoppingList(shoppingList.uuid)
        navigation.dispatch(
            StackActions.replace('DashBoard')
        );
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
        if(!shoppingList.name){
            return ToastAndroid.show("Dê um nome a sua lista de compras para continuar!", 500)
        }        
        
        await manageShoppingList(shoppingList)    
        navigation.goBack()
    }

    return (
        <Container>

            <FormItemContainer>
                <Picker
                    selectedValue={shoppingList.pantryUuid}
                    // style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        setShoppingList({ ...shoppingList, pantryUuid : itemValue })
                    }>
                    
                    {pantriesList.map(( pantryItem ) => 
                        !pantryItem.deletedAt && <Picker.Item label={pantryItem.name} value={pantryItem.uuid} />
                    )}
                    
                </Picker>

                <Input
                    ref={nameRef}
                    placeholder='Nome'
                    value={shoppingList.name}
                    onChange={(e: any) => handleChange(e, 'name')}                    
                />
                
                <Button  onPress={handleSaveShoppingList}>
                    <ButtonLabel>Salvar</ButtonLabel>
                </Button>

                {edit && 
                    <Button invert onPress={handleDeleteShoppingList}>
                        <ButtonLabel>Deletar</ButtonLabel>
                    </Button>
                }

            </FormItemContainer>

        </Container>
    );
}

export default Form;