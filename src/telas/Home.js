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
            firstName
            lastName
            fullName    
            username
            email
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

function Home({ navigation , route, handleNotifications, mount, handleMountFinish }) {
    
    const listRef = useRef()

    const { data, error, loading, refetch, subscribeToMore } = useQuery(ME);

    if(route.params){
        console.log('re render')
        setRefresh(true)
        listRef.current.refresh()
    } else {
        console.log('no re render')
    }

    const [ edit, setEdit ] = useState(true)
    const [ refresh, setRefresh ] = useState(mount)
    const [ loadingList, setLoadingList ] = useState(true)
    const [ despensasList, setdespensasList ] = useState()

    function callQueue(){
        console.log('Chama fila')
    }

    useEffect(() => {
        if (data && refresh) {
            console.log({refresh})
            console.log({data})
            console.log('refresh!')
            // console.log(data.me.despensas.length)            
            if (data.me && refresh) {
                loadData()
                handleNotifications(data.me.convites)
            }
        } else {
            console.log({refresh})
            console.log({data})
            console.log('!refresh')
            // if(!error && refresh){
            //     refetch()
            // }
            // setLoadingList(false)
            // setRefresh(false)
            setLoadingList(false)
        }
    }, [data])

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
        
        console.log("load DATA")

        let userData = {
            id: data.me.id,
            email: data.me.email,
            fullName: data.me.fullName,
            firstName: data.me.firstName,
            lastName: data.me.lastName,
            username: data.me.username,
        }

        await AsyncStorage.setItem('@user', JSON.stringify(userData))
        // setdespensasList(data.me.despensas)

        try {
            // LocalStorage.removeDespensas()

            LocalStorage.storeDespensas(data.me.despensas)
                .then((res) => {
                    console.log('RESPONSE')
                    console.log(JSON.stringify(res))
                    setLoadingList(false)
                    setEdit(false)
                    setRefresh(false)
                    handleMountFinish()
                   
                })
                .catch((err) => {
                    console.log(`Erro aqui: ${err}`)
                })

        } catch(err) {
            console.error('Algo de errado não está certo', err)
        }
    }

    if (loadingList) {
        return <LoadingOverlay />
    }

    return <List items={despensasList} callQueue={callQueue} edit={edit} ref={listRef}/>
    
}

export default Home