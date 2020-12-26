import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, Input, LogoImage, FormContainer, FormItemContainer } from "../../styles/form"
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem, getPantry, getProvision, handlePantryQueue, ItemInterface, PantryInterface, ProvisionInterface, pushPantry } from '../../services/local/PantryLocalService';
import { PROVISIONS } from '../../components/queries/provisionListQuery';
import { CardContainer, CardContainerProvision, ContainerScroll, Label, Title } from '../../styles/components';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Divider } from 'react-native-elements';

const Form: React.FC = () => {
    const provisionOfflineRef = useRef()
    const provisionRef = useRef()
    const quantidadeRef = useRef()
    const [edit, setEdit] = useState(false)
    const [pantryData, setPantryData] = useState<PantryInterface>({} as PantryInterface)
    const navigation = useNavigation()
    const route = useRoute()

    const { pantry } = route.params

    function handleChange(event: any, attr: string) {
        setPantryData({ ...pantryData, [attr]: event.nativeEvent.text.trim().toLowerCase() })
    }

    useEffect(() => {
        if (pantry) {
            navigation.setOptions({
                title: "Editar Despensa"
            })

            setEdit(true)
        } else {
            navigation.setOptions({
                title: "Nova Despensa"
            })
        }
    }, [pantry])

    async function handleSavePantry() {
        getPantry(pantryData)

        navigation.goBack()

    }

    useEffect(() => {

    }, [])

    
    async function handleSaveLoginData() {

    }


    return (
        <Container>

            <FormItemContainer>

                <Input
                    ref={quantidadeRef}
                    placeholder='Nome'
                    value={pantryData.quantity}
                    onChange={(e: any) => handleChange(e, 'name')}
                    autoCapitalize='none'
                />
                <Input
                    ref={quantidadeRef}
                    placeholder='Descrição'
                    value={pantryData.quantity}
                    onChange={(e: any) => handleChange(e, 'description')}
                    autoCapitalize='none'
                />
                <Button onPress={handleSavePantry}>
                    <ButtonLabel>Salvar</ButtonLabel>
                </Button>

            </FormItemContainer>

        </Container>
    );
}

export default Form;