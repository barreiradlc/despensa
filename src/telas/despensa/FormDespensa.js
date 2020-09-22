import React, { useState } from 'react'
import { FormInputTextArea, FormInputReadOnly, Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainerScroll, Camera, FormIconContainer, FormInput, FormLabel, FormTouchableItem, FormTouchableIcon, Google, FormButtonCamera } from '../../components/styled/Form'
import { UserItem, HeaderTouchable, MenuItem, Container, Float, FloatTitle, FloatTouchable, Plus, ImageBg } from '../../components/styled/Geral';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'

import * as LocalStorage from '../../services/LocalStorage'
import * as Utils from '../../components/utils/Utils'
import { Alert } from 'react-native'
const logo = '../../assets/placeholder-receita/563569-PL2J9K-126.png'

function FormDespensa({ route, navigation }) {

    const { edit, despensa } = route.params;
    let capa = logo
    if (despensa){
        console.log('new')
        capa = despensa.capa ? `data:image/gif;base64,${despensa.capa}` : logo        
    }
    const capaLogo = capa === logo ? false : true

    navigation.setOptions({
        title: `${edit ? 'Editar' : 'Nova'} despensa`
    })

    const INITIAL_VALUES = {
        uuid: despensa && despensa.uuid,
        nome: despensa && despensa.nome,
        descricao: despensa && despensa.descricao,
        capa: despensa && despensa.capa,
    }

    const [focus, setFocus] = useState(true);
    const [values, setValues] = useState(INITIAL_VALUES)

    function handleInput(event, attr) {
        setValues({ ...values, [attr]: event.nativeEvent.text })
    }

    async function handleDeleteDespensa() {
        LocalStorage.removeDespensa(values)
            .then((res) => {
                Utils.toast(`${res.nome} removido(a) com sucesso`)
                route.params.reload()
                navigation.navigate('Home', { editDespensas: true })

            })
            .catch((err) => {
                Utils.sweetalert('Houve um erro ao editar este item')
                console.log(err)
            })
    }

    async function handleSearch() {
        navigation.navigate('SearchUser', {
            despensa
        })

    }

    async function handleDelete() {
        Alert.alert(
            'Atenção',
            'Deseja mesmo remover esta despensa?',
            [

                {
                    text: 'NÂO',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'SIM', onPress: () => handleDeleteDespensa() },
            ],
            { cancelable: false },
        );
    }



    async function handleGoToCamera() {
        navigation.navigate('Camera', {
            uuid: values.uuid
        })
    }

    async function handleSubmit() {
        if (edit) {
            alter()
        } else {
            create()
        }
    }

    function alter() {
        LocalStorage.editDespensa(values)
            .then((res) => {
                Utils.toast(`${res.nome} editado(a)`)
                route.params.reload()
                navigation.navigate('Estoque', { editEstoque: true })
            })
            .catch((err) => {
                Utils.sweetalert('Houve um erro ao editar esta despensa')
                console.log(err)
            })
    }

    function create(more) {
        setFocus(false)
        LocalStorage.saveDespensa(values, true)
            .then((res) => {
                // Utils.sweetalert(`${res.provimento.nome} registrado`, 'success', 'Sucesso')
                Utils.toast(`${res.nome} registrado(a)`)
                console.debug(res)
                return true
            })
            .catch((err) => {
                Utils.sweetalert('Houve um erro ao registrar esta despensa')
                console.log(err)
                return false
            })
        console.debug({ route })

        route.params.reload()
        navigation.navigate('Home', { editDespensas: true })
    }

    return (
        <FormContainerScroll>
            
            <ImageBg pop source={capaLogo ? require(logo) : { uri: capa } } imageStyle={{ borderRadius: 10, opacity: 0.6, backgroundColor: "#4e1017", marginBottom: 25 }}>

                <FormButtonCamera onPress={handleGoToCamera} >
                    <>
                        <FormButtonLabel active>Editar capa</FormButtonLabel>
                        <Camera />
                    </>
                </FormButtonCamera>
            </ImageBg>

            <FormInput
                onChange={(event) => { handleInput(event, 'nome') }}
                autoFocus={focus}
                value={values.nome}
                placeholder='Nome'
                returnKeyType="next"
            />

            <FormInputTextArea
                onChange={(event) => { handleInput(event, 'descricao') }}
                placeholder='Descricao'
                value={values.descricao}
                returnKeyType='none'

            />

            <FormButtonGroup>
                <FormButton onPress={handleSubmit} active>
                    <FormButtonLabel active>{edit ? 'Editar' : 'Gravar'}</FormButtonLabel>
                </FormButton>
                {__DEV__ && edit &&
                    <FormButton onPress={handleSubmit} >
                        <FormButtonLabel >limpar Itens</FormButtonLabel>
                    </FormButton>
                }
            </FormButtonGroup>

            {edit && despensa.id &&
                <FormButtonGroup>
                    <FormButton onPress={handleSearch} >
                        <FormButtonLabel >Convidar usuário</FormButtonLabel>
                    </FormButton>
                </FormButtonGroup>
            }

            {edit &&
                <FormButtonGroup>
                    <FormButton onPress={handleDelete} >
                        <FormButtonLabel >Excluir despensa</FormButtonLabel>
                    </FormButton>
                </FormButtonGroup>
            }

        </FormContainerScroll>
    )
}

export default FormDespensa