import React, { useEffect } from 'react'
import gql from 'graphql-tag';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { Container, CardRow, EditItem, DeleteItem, PlusItemReceita, MinusItem, Card, CardBody, CardTitle, CardTouchable, ImageBg, CardDesc } from '../../components/styled/Geral';
import { FloatingAction } from "react-native-floating-action";
import { LoadingOverlay } from '../../components/utils/Components'
const logo = '../../assets/placeholder-receita/563569-PL2J9K-126.png'

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
    query getreceitas($q: String, $after: String){
        receitas(query:$q, after: $after){
            nodes{
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


function List({ navigation, route }) {
    const { data, error, loading, refetch, subscribeToMore, fetchMore, cursor } = useQuery(GET, {
        variables: {
            offset: 0,
            limit: 10
        },
        fetchPolicy: "cache-and-network"
    });

    useEffect(() => {
        console.debug(JSON.stringify(data))
        console.debug(JSON.stringify(cursor))
    }, [data])

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

    function handleInfiniteScrool() {
        const { pageInfo } = data.receitas

        console.log(pageInfo)
        console.log(pageInfo.endCursor)
        if (pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    after: pageInfo.endCursor
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;

                    console.log("DATA")
                    console.log(prev.receitas)
                    console.log(fetchMoreResult.receitas)
                    console.log("DATA")

                    return Object.assign({}, prev, {
                        receitas: {
                            __typename: "ReceitaConnection",
                            nodes: [
                                ...prev.receitas.nodes,
                                ...fetchMoreResult.receitas.nodes
                            ],
                            pageInfo: fetchMoreResult.receitas.pageInfo
                        }
                    });
                }
            })


            // fetchMore({
            //     variables: {
            //       offset: data.feed.length
            //     },
            //     updateQuery: (prev, { fetchMoreResult }) => {
            //       if (!fetchMoreResult) return prev;
            //       return Object.assign({}, prev, {
            //         feed: [...prev.feed, ...fetchMoreResult.feed]
            //       });
            //     }
            //   })
        }
        // pageInfo {
        //     hasNextPage
        //     hasPreviousPage
        //     endCursor
        //     startCursor
        // }
    }

    function Item({ receita }) {
        console.debug({ receita })

        const capa = logo
        const capaLogo = true

        return (
            <Card noPadding>
                <CardTouchable onPress={() => { navigateShow(receita) }}>
                    <ImageBg source={capaLogo ? require(logo) : { uri: capa }} imageStyle={{ borderRadius: 10, opacity: 0.6, backgroundColor: "#4e1017" }}>

                        <CardTitle invert>{receita.nome}</CardTitle>
                        
                            <CardDesc invert>{receita.descricao}</CardDesc>
                        
                    </ImageBg>
                </CardTouchable>
            </Card>
        )
    }

    if (loading && !data) {
        return <LoadingOverlay />
    }

    console.log("ERRO")
    console.log(error)
    console.log("ERRO")

    return (
        <>
            <Container
                // refreshControl={refetch}
                onScroll={(e) => {
                    let paddingToBottom = 10;
                    paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                    if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
                        handleInfiniteScrool()
                    }
                }}
            >
                {data && data.receitas.nodes.map((receita) =>
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