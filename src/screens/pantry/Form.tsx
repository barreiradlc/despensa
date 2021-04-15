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
import { createLocalPantry, CreatePantryDTO } from '../../services/local/realm/PantryLocalService';

function Form({ close }) {
    const [pantryData, setPantryData] = useState<CreatePantryDTO>({} as CreatePantryDTO)

    function handleChange(event: any, attr: string) {
        setPantryData({ ...pantryData, [attr]: event.nativeEvent.text.trim().toLowerCase() })
    }

    async function handleSavePantry() {
        console.log('CREATE')

        if(!pantryData.name){
            toastWithGravity("É necessário dar um nome à sua despensa")
        }
        
        await createLocalPantry({
            ...pantryData,
            queue: true
        })     


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
            <ButtonLabel invert>Nova Despensa</ButtonLabel>
            <ContainerInput >
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
                <ButtonLabel>Cadastrar</ButtonLabel>
            </Button>

            <Button invert onPress={handleSavePantry}>
                <ButtonLabel invert>Deletar</ButtonLabel>
            </Button>
        </FormContainerAutoComplete>
        // </Container>
    );
}

export default Form;