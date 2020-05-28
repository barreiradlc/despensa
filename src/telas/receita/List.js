import React, { useEffect } from 'react'
import gql from 'graphql-tag';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Container, CardRow, EditItem, DeleteItem, PlusItemReceita, MinusItem, Card, CardBody, CardTitle, CardTouchable } from '../../components/styled/Geral';
import { FloatingAction } from "react-native-floating-action";
import { LoadingOverlay } from '../../components/utils/Components'

const actions = [
    {
        text: "Nova Receita",
        color:'#c93b4a',
        icon: <PlusItemReceita />,
        name: "newReceita",
        position: 1
    },
    {
        color:'#c93b4a',
        text: "Lista de compras",
        icon: <PlusItemReceita />,
        name: "addLista",
        position: 2
    }
];

const GET = gql`
    query getreceitas($q: String){
        receitas(query:$q){
            id
            nome
            descricao
        }
    }
`;


function List({navigation}) {
    const { data, error, loading, refetch, subscribeToMore } = useQuery(GET);

    useEffect(() => {
        console.debug(JSON.stringify(data))
    }, [data])

    function navigateShow(item) {
        navigation.navigate('ShowReceita', {
            nome: item.nome,
            id: item.id,
        })
    }

    function handleAction(action){
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

    function handleFormNew(){
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
                    <CardTouchable onPress={() => {navigateShow(receita)}}>
                    <CardTitle>{receita.nome}</CardTitle>
                    <CardRow>
                        <CardBody>{receita.descricao}</CardBody>
                    </CardRow>
                    </CardTouchable>
                </Card>
        )
    }

    if(loading){
        return <LoadingOverlay />
    }

    return (
        <>
            <Container>
                {data && data.receitas.map((receita) =>
                    <Item receita={receita} />
                )}
            </Container>
            <FloatingAction
            
                color='#c93b4a'
                actions={actions}
                onPressItem={name => {
                    handleAction(name)
                }}
            />
        </>
    )
}

export default List