import React, { useState, useRef } from 'react'
import { FormInputReadOnly,Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainerScroll, FormIconContainer, FormInput, FormLabel, FormTouchableDate, FormTouchableIcon, Google } from '../../components/styled/Form'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as LocalStorage from '../../services/LocalStorage'
import * as Utils from '../../components/utils/Utils'
import moment from 'moment'
import 'moment/min/moment-with-locales'

require('moment/locale/cs.js');
require('moment/locale/es.js');
require('moment/locale/fr.js');
require('moment/locale/nl.js');
require('moment/locale/pt-br');

moment.locale('pt-br');

function NovoItem({route, navigation}) {

    const ref_input = useRef();
    const ref_input_qtd = useRef();
    const ref_input_val = useRef();

    const { despensaUuid, edit, item } = route.params;
    
    navigation.setOptions({ title: `${edit ? 'Editar' : 'Novo'} item` })
 
    const INITIAL_VALUES = {
        uuid: edit && item.uuid,
        nome: edit ? item.provimento.nome : '',
        quantidade: edit ? String(item.quantidade) : '',
        validade: item.validade ? item.validade : null
    }

    const [focus, setFocus] = useState(true);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState()
    const [values, setValues] = useState(INITIAL_VALUES)

    function handleInput(event, attr) {
        setValues({ ...values, [attr]: event.nativeEvent.text })
    }

    function onChangeDate(attr, event) {
        console.debug(attr, event)
        setShow(false)
        setValues({ ...values, validade: event })
    }

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    function handleSubmitMore() {
        console.log('handleSubmitmore')
        create(true)
    }

    async function handleSubmit() {
        if(edit){
            alter()
        } else {
            create()
        }
    }

    function alter(){
        LocalStorage.editItem(values, despensaUuid)
            .then(( res ) => {
                console.log(res)
                Utils.toast(`${res.itemLocal.provimento.nome} editado(a)`)
                navigation.navigate('Estoque', { despensa: res.despensaLocal, editEstoque: true })
            })
            .catch((err) => {
                Utils.sweetalert('Houve um erro ao editar este item')
                console.log(err)
            })
            // navigation.goBack()
            // 
            // navigation.goBack()
    }

    function create(more){
        setFocus(false)
        LocalStorage.newItem(values, despensaUuid)
            .then((res) => {
                // Utils.sweetalert(`${res.provimento.nome} registrado`, 'success', 'Sucesso')
                Utils.toast(`${res.attrs.provimento.nome} registrado(a)`)
                console.debug(res)
                if(more){
                    setValues(INITIAL_VALUES)
                    ref_input.current.focus()
                } else {
                    console.log('no more')
                     navigation.navigate('Estoque', {editEstoque: true, despensa: res.despensaLocal})                    
                }
                return true
            })
            .catch((err) => {
                Utils.sweetalert('Houve um erro ao registrar este item')
                console.log(err)
                return false
            })
    }

    return (
        <FormContainerScroll>

            <FormInput
                onChange={(event) => { handleInput(event, 'nome') }}
                autoFocus={focus}
                value={values.nome}
                placeholder='Nome'
                returnKeyType="next"
                ref={ref_input}
                onSubmitEditing={() => { ref_input_qtd.current.focus() } }
                />

            <FormInput
                onChange={(event) => { handleInput(event, 'quantidade') }}
                placeholder='Quantidade'
                value={values.quantidade}
                keyboardType='number-pad'
                ref={ref_input_qtd}
                onSubmitEditing={() => setShow(true) }
            />

            <FormTouchableDate onPress={() => setShow(true)}>
                {values.validade ?
                    <FormInputReadOnly>{moment(values.validade).format('l')}</FormInputReadOnly>
                    :
                    <FormInputReadOnly placeholder>Data de validade</FormInputReadOnly>
                }
            </FormTouchableDate>

            {show &&
                <DateTimePicker
                    testID="dateTimePicker"

                    timeZoneOffsetInMinutes={0}
                    value={values.validade || new Date()}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                />
            }

            <FormButtonGroup>

                <FormButton onPress={handleSubmit} active={true}>
                    <FormButtonLabel active={true}>{edit ? 'Editar' : 'Gravar'}</FormButtonLabel>
                </FormButton>

                {!edit && 
                    <FormButton onPress={handleSubmitMore}>
                        <FormButtonLabel>Gravar +</FormButtonLabel>
                    </FormButton>
                }

            </FormButtonGroup>

        </FormContainerScroll>
    )
}

export default NovoItem