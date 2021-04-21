import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
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
import { createLocalPantry, CreatePantryDTO, editLocalPantry } from '../../services/local/realm/PantryLocalService';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';

interface FormInterface {
    close(): void;
    data: PantryInterface
}

function Form({ close, data }: FormInterface) {
    const [pantryData, setPantryData] = useState<CreatePantryDTO>({} as CreatePantryDTO)
    const [edit, setEdit] = useState<boolean>(false)


    function handleChange(event: any, attr: string) {
        setPantryData({ ...pantryData, [attr]: event.nativeEvent.text })
    }

    useEffect(() => {

        setEdit(!!data.uuid)

        if (data) {
            setPantryData({
                name: data.name,
                description: data.description,
                queue: data.queue,
                uuid: data.uuid
            })
        }
    }, [data])

    useEffect(() => {
        console.log({ pantryData })
    }, [])

    async function handleSavePantry() {

        if (!pantryData.name) {
            toastWithGravity("É necessário dar um nome à sua despensa")
        }

        Keyboard.dismiss()

        if (edit) {
            console.log('EDIT')
            await editLocalPantry({
                ...pantryData,
                queue: true
            })
        } else {
            console.log('CREATE')
            await createLocalPantry({
                ...pantryData,
                queue: true
            })
        }

        handleCloseBottomSheet()
    }
    function handleCloseBottomSheet() {
        close()
        setPantryData({} as CreatePantryDTO)
    }

    function handleDeletePantry() {
        console.log('Delete')
        // navigation.navigate('SignUp')
        // createLocalPantry(pantryData)
    }

    return (
        <FormContainerAutoComplete>
            <ButtonLabel invert>
                {edit ? 'Editar Despensa' : 'Nova Despensa'}
            </ButtonLabel>
            <ContainerInput>
                <Input
                    noIconStart
                    placeholder='Nome'
                    value={pantryData.name}
                    onChange={(e: any) => handleChange(e, 'name')}
                />
            </ContainerInput>

            <ContainerInput>
                <InputMultiline
                    multiline
                    noIconStart
                    placeholder='Descrição'
                    value={pantryData.description}
                    onChange={(e: any) => handleChange(e, 'description')}
                />
            </ContainerInput>

            <Button onPress={handleSavePantry}>
                <ButtonLabel>{edit ? "Editar" : "Cadastrar"}</ButtonLabel>
            </Button>

            <Button invert onPress={handleDeletePantry}>
                <ButtonLabel invert>Deletar</ButtonLabel>
            </Button>
        </FormContainerAutoComplete>
    );
}

export default Form;