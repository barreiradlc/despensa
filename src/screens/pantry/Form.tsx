import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, InputEnd as Input, LogoImage, FormContainer, FormItemContainer, ContainerInput } from "../../styles/form"
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deletePantry, getItem, getPantry, getProvision, handlePantryQueue, ItemInterface, PantryInterface, ProvisionInterface, pushPantry } from '../../services/local/PantryLocalService';
import { PROVISIONS } from '../../components/queries/provisionListQuery';
import { CardContainer, CardContainerProvision, ContainerScroll, Label, Title } from '../../styles/components';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Divider } from 'react-native-elements';

const Form: React.FC = () => {
    const provisionOfflineRef = useRef()
    const provisionRef = useRef()
    const quantidadeRef = useRef()
    const nameRef = useRef()
    const descriptionRef = useRef()

    const [edit, setEdit] = useState(false)
    const [pantryData, setPantryData] = useState<PantryInterface>({} as PantryInterface)
    const navigation = useNavigation()
    const route = useRoute()

    const { pantry } = route.params

    function handleChange(event: any, attr: string) {
        setPantryData({ ...pantryData, [attr]: event.nativeEvent.text })
    }

    useEffect(() => {
        if (pantry) {
            navigation.setOptions({
                title: "Editar Despensa",

            })

            setPantryData({
                id: pantry.id,
                uuid: pantry.uuid,
                name: pantry.name,
                description: pantry.description,
            })

            setEdit(true)
        } else {
            navigation.setOptions({
                title: "Nova Despensa"
            })
        }

        nameRef.current.focus()
    }, [pantry])

    async function handleDeletePantryConfirmed() {
        deletePantry(pantryData.uuid)   
        navigation.dispatch(
            StackActions.replace('DashBoard')
        );
        return ToastAndroid.show("Despensa deletada com sucesso!", 500)
    }

    async function handleDeletePantry() {
        Alert.alert(
            'Deseja realmente deletar despensa?', 
            "Esta ação deletará sua despensa e TODOS os itens que nela estão armazenados",
            [
                {
                    text: 'Não',
                    onPress: () => console.log('canceled')
                },
                {
                    text: 'Sim',
                    onPress: () => handleDeletePantryConfirmed()
                }
            ]
        )
    }

    async function handleSavePantry() {
        getPantry(pantryData, true)
        
        if(edit){
        //     return navigation.navigate('ShowDespensa', {
        //         pantry: pantryData,
        //         items: pantryData.items
        //     })
            navigation.goBack()
        }

        
        navigation.goBack()
    }

    useEffect(() => {

    }, [])

    
    async function handleSaveLoginData() {

    }


    return (
        <Container>

            <FormContainer>

                <ContainerInput>
                    <Input
                        ref={nameRef}
                        placeholder='Nome'
                        value={pantryData.name}
                        onChange={(e: any) => handleChange(e, 'name')}                    
                    />                    
                </ContainerInput>

                <ContainerInput>
                    <Input
                        ref={quantidadeRef}
                        placeholder='Descrição'
                        value={pantryData.description}
                        onChange={(e: any) => handleChange(e, 'description')}
                        // autoCapitalize
                    />
                </ContainerInput>

                <Button onPress={handleSavePantry}>
                    <ButtonLabel>Salvar</ButtonLabel>
                </Button>

                {edit && 
                    <Button invert onPress={handleDeletePantry}>
                        <ButtonLabel invert>Deletar</ButtonLabel>
                    </Button>
                }

            </FormContainer>

        </Container>
    );
}

export default Form;