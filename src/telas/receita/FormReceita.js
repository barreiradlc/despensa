import React, { useState, useEffect } from 'react'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as LocalStorage from '../../services/LocalStorage'
import * as Utils from '../../components/utils/Utils'
import { Alert } from 'react-native'

import FormPasso from '../../components/receitas/FormPasso'
import FormInnerIngrediente from '../../components/receitas/FormInnerIngrediente'
import InnerIngrediente from '../../components/receitas/InnerIngrediente'
import { AddReceita, SafeContainer } from '../../components/styled/Geral'
import { InnerText, RowInnerAdd, FormInputTextArea, FormInputReadOnly, Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainerScroll, FormIconContainer, FormInput, FormLabel, FormTouchableAdd, FormTouchableIcon, Google, CardInnerTitle, CardInner, Wrap } from '../../components/styled/Form'
import { LoadingOverlay } from '../../components/utils/Components'
import { useMutation, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD = gql`
mutation addReceita($receita: ReceitaInput!) {
    addReceitaMutation(receita: $receita) {
      receitum {
        id
        createdAt
        descricao
        nome
        updatedAt
        ingredientes {
          id
          provimento {
            nome
          }
        }
        passos {
          descricao
          posicao
        }
      }
    }
}  
`

const EDIT = gql`
mutation updateReceita($id: ID!, $receita: ReceitaInput!){
  updateReceitaMutation(id: $id, receita: $receita){
      receitum {
        id
        createdAt
        descricao
        nome
        updatedAt
        ingredientes {
          id
          provimento {
            nome
          }
        }
        passos {
          descricao
          posicao
        }
      }
    }
}  
`


function FormReceita({ route, navigation }) {

    const [add, { data, error, loading }] = useMutation(edit ? EDIT : ADD);
    // const [update, { data: EditData, error: editError }] = useMutation(EDIT);

    const { edit, receita, id } = route.params;

    navigation.setOptions({ title: `${edit ? 'Editar' : 'Nova'} receita` })

    const passo = {
        posicao: 1,
        descricao: ''
    }

    useEffect(() => {
        if (data) {
            navigation.navigate('Receitas')
            Utils.sweetalert(`Receita ${edit ? 'editada' : 'cadastrada'}\n\n com sucesso`, 'success', 'Sucesso')
        }
    }, [data])

    
    // const INITIAL_VALUES = {
        //     "ingredientes":[{"quantidade":1,"provimento":{"nome":"Ovo"}},{"quantidade":1,"provimento":{"nome":"Arroz "}}],"nome":"Hein","descricao":"Jogo","passos":[{"posicao":1,"descricao":"Passo 6em de bom more levava "},{"posicao":2,"descricao":"Buffon foi o seu dia meu amor e ja ate trabalhou 6anos no seu cabelo "}]
        // }
        
        const INITIAL_VALUES = {
            id: receita && receita.id,
            uuid: receita && receita.uuid,
            nome: receita && receita.nome,
            descricao: receita && receita.descricao,
            ingredientes: receita && receita.ingredientes,
            passos: receita ? receita.passos : [passo]
        }
        
        const [focus, setFocus] = useState(true);
        const [load, setLoad] = useState(true);
        
        const [addIgrediente, setAddIngrediente] = useState(false);
        const [values, setValues] = useState(INITIAL_VALUES)
        
        useEffect(() => {
            setLoad(false)
        }, [])

        function handleInput(event, attr) {
            setValues({ ...values, [attr]: event.nativeEvent.text })
        }
        
        function toggleIngrediente() {
        setAddIngrediente(!addIgrediente)
    }

    function handleUpdateIngrediente(value) {

    }

    function handleDeleteIngrediente(value) {
        let newList
        if(!value.id){

        }
        newList = values.ingredientes.filter(receita => receita.provimento.nome !== value.provimento.nome)
        console.debug(value)
        console.debug(JSON.stringify(newList))
        setValues({ ...values, ingredientes: newList })
    }

    function handleNewIngrediente(value) {
        let newItem = true
        let newList = values.ingredientes || []

        newList = newList.map((item) => {
            if (item.provimento.nome === value) {
                item.quantidade++
                newItem = false
            }
            return item
        })

        if (newItem) {
            newList.push({
                quantidade: 1,
                provimento: {
                    nome: value
                }
            })
        }

        setValues({ ...values, ingredientes: newList })

        console.debug(value)
    }

    function handleNewPasso(value, i) {
        let newList = values.passos
        console.log(newList)

        newList = newList.map((item, index) => {
            if (index === i) {
                item.posicao = i + 1
                item.descricao = value
            }
            return item
        })
        console.log(newList)

        setValues({ ...values, passos: newList })

        console.debug(value)
    }

    function more() {
        console.log('newList')
        const newList = values.passos    
        newList.push(passo)
        setValues({ ...values, passos: newList })
    }

    function less(index){
        console.log(index)
        const newList = values.passos.filter(( passo, i ) => i !== index)

        setValues({ ...values, passos: newList })
    }

    function addReceita() {
        delete values.uuid
        delete values.id
        console.debug(values)
        add({ variables: { receita: values } });
    }

    function convertValues(receita) {
        let result = receita
        result.ingredientes = result.ingredientes.map((i) => {
            delete i.__typename
            delete i.provimento.__typename

            return i
        })
        result.passos = result.passos.map((p) => {
            delete p.__typename

            return p
        })
        delete result.id

        return result
    }

    function editReceita() {
        const result = convertValues(values)
        // delete values.uuid

        console.debug(values.id)
        console.debug(JSON.stringify(result))
        console.debug(result, id)
        add({ variables: { id: Number(id), receita: result } });
    }

    if(load){
        return <LoadingOverlay />
    }
    
    return (

        <FormContainerScroll >

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
                multiline
            />


            <CardInner>
                <CardInnerTitle>Ingredientes</CardInnerTitle>
                <Wrap>
                    <FormInnerIngrediente add={handleNewIngrediente} active={addIgrediente} toggle={toggleIngrediente} />

                    {values.ingredientes && values.ingredientes.map((i) =>
                        <InnerIngrediente update={handleUpdateIngrediente} remove={handleDeleteIngrediente} item={i} />
                    )}
                </Wrap>
            </CardInner>

            <CardInner>
                <CardInnerTitle>Passo a passo</CardInnerTitle>

                {values.passos.map((passo, i) =>
                    <FormPasso item={passo} index={i} add={handleNewPasso} remove={less} />
                )}

                <FormTouchableAdd hitSlop={{ top: 20, bottom: 20, left: 20, right: 100 }}>
                    <RowInnerAdd onPress={more}>
                        <InnerText>Adicionar</InnerText>
                        <AddReceita style={{ backgroundColor: '#fff' }} />
                    </RowInnerAdd>
                </FormTouchableAdd>
            </CardInner>

            <FormButtonGroup style={{ marginBottom: 70 }}>
                {/* <FormButton onPress={handleDelete} > */}
                {edit ?
                    <>
                        <FormButton active={true} onPress={editReceita}>
                            <FormButtonLabel active={true}>Editar</FormButtonLabel>
                        </FormButton>
                        <FormButton  >
                            <FormButtonLabel >Excluir</FormButtonLabel>
                        </FormButton>
                    </>
                    :
                    <FormButton active={true} onPress={addReceita}>
                        <FormButtonLabel active={true}> Gravar</FormButtonLabel>
                    </FormButton>
                }

            </FormButtonGroup>

        </FormContainerScroll>
    )
}

export default FormReceita