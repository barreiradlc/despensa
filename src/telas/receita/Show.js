import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Alert } from 'react-native';

import DeleteReceitaMutation from '../../components/mutations/DeleteReceitaMutation';
import InnerIngrediente from '../../components/receitas/InnerIngrediente';
import ShowPasso from '../../components/receitas/ShowPasso';
import { CardInner, CardInnerTitle, FormButton, FormButtonGroup, FormButtonLabel, FormContainerScroll, Wrap } from '../../components/styled/Form';
import { LoadingOverlay } from '../../components/utils/Components';
import * as Utils from '../../components/utils/Utils';
import * as LocalStorage from '../../services/LocalStorage';

const GET = gql`
query getReceita($id: ID!) {
    receita(id: $id) {
      id
      nome
      descricao
      ingredientes {
        id
        provimento {
          id
          nome
        }
      }
      passos {
        id
        descricao
        posicao
      }
      user{
          id
          fullName
          email
      }
    }
  }  
`

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
        user{
            id
            fullName
        }
      }
    }
}  
`


function ShowReceita({ route, navigation }) {

    const removeRef = useRef()

    const { id, nome } = route.params

    const { data, error, loading, refetch, subscribeToMore } = useQuery(GET, { variables: { id: id } });

    const { edit, receita } = route.params;

    navigation.setOptions({ title: nome })

    const passo = {
        posicao: 1,
        descricao: ''
    }

    // const INITIAL_VALUES = {
    //     "ingredientes":[{"quantidade":1,"provimento":{"nome":"Ovo"}},{"quantidade":1,"provimento":{"nome":"Arroz "}}],"nome":"Hein","descricao":"Jogo","passos":[{"posicao":1,"descricao":"Passo 6em de bom more levava "},{"posicao":2,"descricao":"Buffon foi o seu dia meu amor e ja ate trabalhou 6anos no seu cabelo "}]
    // }

    const INITIAL_VALUES = {
        id: receita && receita.id,
        uuid: receita && receita.uuid,
        nome: receita && receita.nome,
        descricao: receita && receita.descricao,
        ingredientes: receita && receita.ingredientes,
        passos: receita ? receita.passos : [passo],
        user: {
            id: undefined,
            fullName: undefined
        }
    }

    const [provimentos, setProvimentos] = useState([]);
    const [user, setUser] = useState(true);
    const [load, setLoad] = useState(true);
    const [addIgrediente, setAddIngrediente] = useState(false);
    const [values, setValues] = useState(INITIAL_VALUES)

    useEffect(() => {
        if (data) {
            setValues(data.receita)
            setLoad(false)
            getUser()
        }
    }, [data])

    // useEffect(() => {
    //     getProvimentos()
    // }, [])

    // function getProvimentos(){
    //     LocalStorage.getProvimentos()
    //         .then(( p ) => {
    //             console.debug(p)
    //             setProvimentos(p)
    //         })
    //         .catch(( e ) => {
    //             console.log(e)
    //         })
    // }

    function getStorageIngrediente(i){
        LocalStorage.getProvimento(i)
            .then(( res ) => {
                if(res){
                    if(res.id){
                        console.log(res.id)
                        return res.id
                    }
                    console.log('a')
                }
                return false
            })
            .catch(( err ) => {
                return false
                console.debug(err)
            })
    }

    async function getUser() {
        const u = await AsyncStorage.getItem('@user');
        console.log({ u })
        setUser(JSON.parse(u))
    }

    function handleInput(event, attr) {
        setValues({ ...values, [attr]: event.nativeEvent.text })
    }

    function toggleIngrediente() {
        setAddIngrediente(!addIgrediente)
    }

    function handleUpdateIngrediente(value) {

    }

    function handleDeleteIngrediente(value) {
        const newList = values.ingredientes.filter(receita => receita.provimento.nome !== value)
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

    function handleForm() {
        navigation.navigate('FormReceita', {
            edit: true,
            receita: values,
            id
        })
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
        setLoad(false)
        console.debug(value)
    }

    function more() {
        console.log('newList')
        const newList = values.passos
        console.log(newList)
        newList.push(passo)

        console.log(newList)

        setValues({ ...values, passos: newList })
    }

    function addReceita() {
        delete values.uuid
        console.debug(values)
        add({ variables: { receita: values } });
    }

    function handleRemove() {
        setLoad(true)
        console.debug({ removeRef })

        removeRef.current.mutate(values)
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

    function handleSucess() {
        setLoad(false)
        navigation.navigate('Receitas', { refetch: true })
        Utils.sweetalert('', 'success', `\n\n\nReceita removida com sucesso`)
    }

    if (loading) {
        return <LoadingOverlay />
    }

    return (
        <>

            {/* {load &&
                <LoadingOverlay />
            } */}

            <FormContainerScroll >

                <DeleteReceitaMutation ref={removeRef} success={handleSucess} />

                <FormButtonLabel >{values.descricao}</FormButtonLabel>

                <CardInner>
                    <CardInnerTitle>Ingredientes</CardInnerTitle>
                    <Wrap>

                        {values.ingredientes && values.ingredientes.map((i) =>
                            <InnerIngrediente  update={handleUpdateIngrediente} remove={handleDeleteIngrediente} item={i} show />
                        )}
                    </Wrap>
                </CardInner>

                <CardInner>
                    <CardInnerTitle>Passo a passo</CardInnerTitle>

                    {values.passos.map((passo, i) =>
                        <ShowPasso item={passo} index={i} add={handleNewPasso} />
                    )}

                </CardInner>

                {!loading &&
                    values.user.id === user.id ?
                    <FormButtonGroup>
                        {/* <FormButton onPress={handleDelete} > */}
                        <FormButton onPress={handleForm}>
                            <FormButtonLabel >Editar receita</FormButtonLabel>
                        </FormButton>
                        <FormButton active onPress={removeReceita}>
                            <FormButtonLabel active>Excluir receita</FormButtonLabel>
                        </FormButton>
                    </FormButtonGroup>
                    :
                    <CardInnerTitle style={{ lineHeight: 35, fontSize: 15 }}>Receita enviada por: {'\n'}
                        <CardInnerTitle style={{ lineHeight: 25,fontSize: 20 }} >{values.user.fullName || values.user.email }</CardInnerTitle>
                    </CardInnerTitle>
                }

                <FormButtonGroup style={{ marginBottom: 50 }}>

                </FormButtonGroup>

            </FormContainerScroll>
        </>
    )
}

export default ShowReceita