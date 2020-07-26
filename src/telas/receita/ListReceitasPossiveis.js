import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Container, CardRow, EditItem, DeleteItem, PlusItemReceita, MinusItem, Card, CardBody, CardTitle, CardTouchable } from '../../components/styled/Geral';
import { FloatingAction } from "react-native-floating-action";
import { LoadingOverlay } from '../../components/utils/Components'

import * as LocalStorage from '../../services/LocalStorage';


const actions = [
    {
        text: "Nova Receita",
        color: '#c93b4a',
        icon: <PlusItemReceita />,
        name: "newReceita",
        position: 1
    },
    // {
    //     color:'#c93b4a',
    //     text: "Lista de compras",
    //     icon: <PlusItemReceita />,
    //     name: "addLista",
    //     position: 2
    // }
];

const GET = gql`
    query receitasPossiveis($provimentos: [Int!]){
        receitasPossiveis(provimentos: $provimentos) {
            nodes {
              id
              nome
              descricao              
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
    }
`;


function ListReceitasPossiveis({ navigation, route }) {

    navigation.setOptions({ title: `Receitas possíveis` })

    const [provimentos, setProvimentos] = useState()

    useEffect(() => {
        getStorageIngredientes()
    }, [])

    function getStorageIngredientes() {
        LocalStorage.getProvimentos()
            .then((res) => {
                res.map((r) => {
                    console.debug(r.id)
                })
                if (res) {
                    console.debug(JSON.stringify(res))
                    let listIds = []
                    res.map((p) => {
                        let existente = listIds.filter((i) => i === p.id)[0]

                        if (p.id !== null && !existente) {
                            listIds.push(p.id)
                        }
                    })
                    console.debug({ listIds })
                    setProvimentos(listIds)
                }

            })
            .catch((err) => {
                console.debug(err)
            })
    }


    const { data, error, loading, refetch, subscribeToMore } = useQuery(GET, { variables: { provimentos } });

    useEffect(() => {
        console.debug("DATA")
        console.debug(JSON.stringify(data))
    }, [data])
    
    useEffect(() => {
        console.debug("ERROR")
        console.debug(JSON.stringify(error))
    }, [error])

    useEffect(() => {
        if (route.params) {
            if (route.params.refetch) {
                refetch(data)
            }
        }
    }, [route])

    function navigateShow(item) {
        navigation.navigate('ShowReceita', {
            nome: item.nome,
            id: item.id,
        })
    }

    function handleAction(action) {
        switch (action) {
            case 'newReceita':
                handleFormNew()
                break;
            case 'addLista':
                alert('A implementar...')
                break;

            default:
                break;
        }

    }

    function handleFormNew() {
        navigation.navigate('FormReceita', {
            edit: false,
            receita: null,
            id: null
        })
    }

    function Item({ receita }) {
        console.debug({ receita })

        return (
            <Card>
                <CardTouchable onPress={() => { navigateShow(receita) }}>
                    <CardTitle>{receita.nome}</CardTitle>
                    <CardRow>
                        <CardBody>{receita.descricao}</CardBody>
                    </CardRow>
                </CardTouchable>
            </Card>
        )
    }
    
    if (loading) {
        return <LoadingOverlay />
    }
    
    return (
        <>
            <Container style={{ marginBottom: 0 }}>
                {data && data.receitasPossiveis.nodes.map((receita) =>
                    <Item receita={receita} />
                )}

                {data.receitasPossiveis.nodes.length === 0 &&     
                    <Card>
                        <CardTitle style={{ textAlign: "center" }}>Nenhuma receita encontrada</CardTitle>
                        <CardBody style={{ textAlign: "center" }}>Abasteça suas despensas para que hajam mais possibilidades de busca</CardBody>
                    </Card>           
                }
            </Container>

            {/* <FloatingAction

                color='#c93b4a'
                actions={actions}
                onPressItem={name => {
                    handleAction(name)
                }}
            /> */}
        </>
    )
}

export default ListReceitasPossiveis