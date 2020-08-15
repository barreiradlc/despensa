import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native'
import FormInnerIngrediente from '../../components/receitas/FormInnerIngrediente';
import FormPasso from '../../components/receitas/FormPasso';
import InnerIngrediente from '../../components/receitas/InnerIngrediente';
import {
    CardInner, CardInnerTitle, FormButton, FormButtonGroup, FormButtonLabel, FormContainerScroll, FormInput, FormInputTextArea, FormTouchableAdd, InnerText, RowInnerAdd, Wrap, 
    
    TableBody,
    TableCell
} from '../../components/styled/Form';
import { AddReceita,TableHeader, Table,
    TableTitle, } from '../../components/styled/Geral';
import { LoadingOverlay } from '../../components/utils/Components';
import * as Utils from '../../components/utils/Utils';

import AddReceitaMutation from '../../components/mutations/AddReceitaMutation';
import EditReceitaMutation from '../../components/mutations/EditReceitaMutation';
import DeleteReceitaMutation from '../../components/mutations/DeleteReceitaMutation';

function FormReceita({ route, navigation }) {

    const editRef = useRef()
    const addRef = useRef()
    const removeRef = useRef()

    const descRef = useRef()
    const ingredientesRef = useRef()

    const { edit, receita, id } = route.params;

    navigation.setOptions({ title: `${edit ? 'Editar' : 'Nova'} receita` })

    const passo = {
        posicao: 1,
        descricao: ''
    }

    const INITIAL_VALUES = {
        id: receita && receita.id,
        nome: receita && receita.nome,
        descricao: receita && receita.descricao,
        ingredientes: receita && receita.ingredientes,
        // ingredientes: [
        //     {"medida": "UNIDADE", "provimento": { nome: "Ovo" }, "quantidade": "1"}
        // ],
        passos: receita ? receita.passos : [passo]
    }

    const [focus, setFocus] = useState(true);
    const [load, setLoad] = useState(true);
    const [disable, setDisable] = useState(true);
    const [erros, setErros] = useState([]);
    const [addIgrediente, setAddIngrediente] = useState(false);
    const [ingrediente, setIngrediente] = useState();
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
        if (!value.id) {

        }
        newList = values.ingredientes.filter(receita => receita.provimento.nome !== value.provimento.nome)
        const actualIngrediente = values.ingredientes.filter(receita => receita.provimento.nome === value.provimento.nome)[0]
        console.debug('value')
        console.debug(JSON.stringify(newList))
        console.debug(JSON.stringify(actualIngrediente))
        
        setValues({ ...values, ingredientes: newList })
        setAddIngrediente(true)
        setIngrediente(actualIngrediente)
    }

    function handleNewIngrediente(value) {

        console.log("==== VALUE ====")
        console.log(value)
        console.log("==== VALUE ====")


        let newItem = true
        let newList = values.ingredientes || []

        newList = newList.map((item) => {
            if (item.provimento.nome === value.nome) {
                item.quantidade = Number(item.quantidade) + 1
                item.medida = value.medida
                newItem = false
            }
            return item
        })

        if (newItem) {
            newList.push({
                quantidade: Number(value.quantidade) || 1,
                medida: value.medida || "UNIDADE",
                provimento: {
                    nome: value.nome.trim()
                }
            })
        }

        console.debug('newList')
        console.debug(newList)
        console.debug('newList')
        setValues({ ...values, ingredientes: newList })
        setIngrediente()
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

    function less(index) {
        console.log(index)
        const newList = values.passos.filter((passo, i) => i !== index)

        setValues({ ...values, passos: newList })
    }

    function convertValues(receita) {
        let result = receita

        result.ingredientes = result.ingredientes.map((i) => {
            delete i.__typename
            delete i.provimento.__typename
            
            return {
                ...i,
                quantidade : Number(i.quantidade)
            }
        })
        result.passos = result.passos.map((p) => {
            delete p.__typename

            return p
        })
        delete result.id

        return result
    }

    function handleSucess(remove) {
        setLoad(false)
        navigation.navigate('Receitas', { refetch: true })
        if (remove) {
            return Utils.sweetalert('', 'success', `\n\n\nReceita removida com sucesso`)
        }
        Utils.sweetalert('', 'success', `\n\n\nReceita ${edit ? 'editada' : 'cadastrada'} com sucesso`)
    }
    
    function sendError(msg) {
        setLoad(false)
        // navigation.navigate('Receitas', { refetch: true })        
        Utils.sweetalert('', 'error', `\n\n\nErro ao ${msg} receita`)
    }

    function editReceita() {
        if (disable) {
            return erros.map((e, i) => {
                setTimeout(() => {
                    Utils.toast(e.message)
                }, 500 * i)
            })
        }

        setLoad(true)
        const result = convertValues(values)

        let variables = {
            id: Number(id),
            receita: result
        }

        console.debug('------ result')
        console.debug(result)
        console.debug('------ result')

        // setLoad(false)
        editRef.current.mutate(variables)
    }

    function addReceita() {
        if (disable) {
            return erros.map((e, i) => {
                setTimeout(() => {
                    Utils.toast(e.message)
              PASSO  }, 500 * i)
            })
        }
        setLoad(true)
        // addRef.current.mutate(values)

        const result = convertValues(values)

        // let variables = {
        //     id: Number(id),
        //     receita: result
        // }

        addRef.current.mutate(result)
    }

    function handleRemove() {
        setLoad(true)
        removeRef.current.mutate(values)
    }

    function snackCompras(item) {
        console.log('ITEM A CONFIGURAR')
        console.log(item)
        console.log('ITEM A CONFIGURAR')
    }


    function removeReceita() {
        Alert.alert(
            'Atenção',
            'Deseja mesmo remover esta receita?',
            [
                { text: 'SIM', onPress: () => handleRemove() },
                {
                    text: 'NÂO',
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    if (!values) {
        return <LoadingOverlay />
    }

    useEffect(() => {
        let e = validate()
        if (e && e.length > 0) {
            setErros(e)
            setDisable(true)
        } else {
            setDisable(false)
            setErros([])
        }
    }, [values])

    function validate() {
        let errors = []

        if (!values.nome) {
            errors.push({ message: 'Nome não pode ficar em branco' })
        }
        if ((!values.passos && values.passos.length > 0) || !values.passos[0].descricao) {
            errors.push({ message: 'Deve haver ao menos um passo para registrar uma receita' })
        }
        if (!values.ingredientes || values.ingredientes.length === 0) {
            errors.push({ message: 'Deve haver ao menos um ingrediente para registrar uma receita' })
        }
        console.log(values.ingredientes)

        return errors
    }

    return (
        <>

            {load &&
                <LoadingOverlay />
            }

            <FormContainerScroll 
                onMomentumScrollBegin={() => setAddIngrediente(false)}
            >

                <EditReceitaMutation ref={editRef} success={handleSucess} sendError={sendError} />
                <AddReceitaMutation ref={addRef} success={handleSucess} sendError={sendError} />
                <DeleteReceitaMutation ref={removeRef} success={handleSucess} />

                <FormInput
                    onChange={(event) => { handleInput(event, 'nome') }}
                    autoFocus={focus}
                    value={values.nome}
                    placeholder='Nome'
                    returnKeyType="next"
                    onSubmitEditing={() => descRef.current.focus()}
                    />

                <FormInputTextArea
                    onChange={(event) => { handleInput(event, 'descricao') }}
                    placeholder='Descricao'
                    value={values.descricao}
                    returnKeyType='next'
                    // multiline
                    ref={descRef}
                    onSubmitEditing={() => setAddIngrediente(true)}
                />

                <CardInner>
                    <CardInnerTitle>Ingredientes</CardInnerTitle>

                    <Table>

                    {values.ingredientes.length > 0 &&                        
                        <TableHeader style={{ justifyContent: 'space-evenly', paddingLeft: 15 }}>
                            <TableTitle style={{fontWeight: 'bold'}}  >Nome</TableTitle>
                            <TableTitle style={{fontWeight: 'bold'}} numeric  >Qtd.</TableTitle>
                            <TableTitle style={{fontWeight: 'bold', width: 100}} numeric  >Medida</TableTitle>                            
                        </TableHeader>                        
                    }

                    {values.ingredientes && values.ingredientes.map((i) =>
                        <InnerIngrediente update={handleUpdateIngrediente} remove={handleDeleteIngrediente} item={i} add={handleNewIngrediente} />
                    )}

                    </Table>

                    <Wrap>
                        <FormInnerIngrediente 
                            snackCompras={snackCompras} 
                            add={handleNewIngrediente} 
                            active={addIgrediente} 
                            toggle={toggleIngrediente} 
                            item={ingrediente}
                        />
                    </Wrap>                        

                </CardInner>

                <CardInner>
                    <CardInnerTitle>Passo a passo</CardInnerTitle>

                    {values.passos && values.passos.map((passo, i) =>
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
                            <FormButton onPress={removeReceita}>
                                <FormButtonLabel >Excluir</FormButtonLabel>
                            </FormButton>
                        </>
                        :
                        <FormButton active onPress={addReceita}  >
                            <FormButtonLabel active disable={disable} style={{ opacity: disable ? 0.5 : 1 }}> Gravar</FormButtonLabel>
                        </FormButton>
                    }

                </FormButtonGroup>

            </FormContainerScroll>
        </>
    )
}

export default FormReceita