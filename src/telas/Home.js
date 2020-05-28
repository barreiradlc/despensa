import React, { useEffect, useState, useRef } from 'react'
import { Button, Text, View } from 'react-native';

import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as LocalStorage from '../services/LocalStorage'
import AsyncStorage from '@react-native-community/async-storage';

import List from '../telas/despensa/List'
import { LoadingOverlay } from '../components/utils/Components'

const ME = gql`
    query me{
        me {
            id
            email
            fullName    
            despensas {
                id
                nome
                descricao
                items {
                    id
                    quantidade
                    validade
                    provimento {
                        id
                        nome
                    }
                }
            }
            convites {
                id
                mensagem
                usuarioSolicitacao
                despensaId
            }
        }
    }
`;

function Home({ navigation , route, handleNotifications}) {
    
    const listRef = useRef()

    const { data, error, loading, refetch, subscribeToMore } = useQuery(ME);

    let edit

    console.log({p:route.params})

    if(route.params){
        console.log('re render')
        listRef.current.refresh()
    } else {
        console.log('no re render')
    }

    const [ loadingList, setLoadingList ] = useState(true)
    const [ despensasList, setdespensasList ] = useState()

    function callQueue(){
        console.log('Chama fila')
    }

    useEffect(() => {
        if (data) {
            console.log({data})
            // console.log(data.me.despensas.length)
            
            if (data.me) {
                loadData()
                handleNotifications(data.me.convites)
            }
        } else {
            console.log({data})
            if(!error){
                refetch(data)
            }
            // setLoadingList(false)
        }
    }, [data])

    useEffect(() => {
        setLoadingList(true)
    }, [edit])

    useEffect(() => {
        console.debug('render')
    }, [route])

    useEffect(() => {
        if(error){
            console.log({error})
            setLoadingList(false)
        }
    }, [error])


    function reloadData(){
        loadData()
    }

    async function loadData(){
        
        let userData = {
            id: data.me.id,
            email: data.me.email,
            fullName: data.me.fullName,
        }

        await AsyncStorage.setItem('@user', JSON.stringify(userData))
        // setdespensasList(data.me.despensas)

        try {
            // LocalStorage.removeDespensas()

            LocalStorage.storeDespensas(data.me.despensas)
                .then((res) => {
                    console.log({res})
                    setLoadingList(false)
                   
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch(err) {
            console.error('Algo de errado não está certo', err)
        }
    }

    if (loadingList) {
        return <LoadingOverlay />
    }

    return <List items={despensasList} callQueue={callQueue} edit={edit} reload={reloadData} ref={listRef}/>
    
}

export default Home