import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import * as LocalStorage from '../services/LocalStorage'
import NetInfo from "@react-native-community/netinfo";
import  { ConnectionTab, ConnectionLabel } from '../components/styled/Geral'

const SEND = gql`
mutation handleDepensasMutation($despensas: [DespensaInput!]!){
    handleDespensaMutation(despensas: $despensas)  {
        despensas {
            id
            uuid
            nome
            descricao
            items{
                id
                uuid
                quantidade
                provimento{
                    id
                    nome
                }
                
            }        
        }
    }
}
` 

function QueueProcess({ reloadQueue, call, reload }, ref){
        
    const [ despensas, setDespensas ] = useState({})
    const [ resetDespensas, setResetDespensas ] = useState(false)
    const [ send, setSend ] = useState(true)
    const [ load, setLoad ] = useState('')
    const [ connection, setConnection ] = useState()

    const [submit, { data, error, loading }] = useMutation(SEND);

    function changeDot(){
        let dots = load
        let l = dots.length < 3 ? dots + '.' : ''
        setLoad(l)
    }

    useImperativeHandle(ref , () => {
        reload: (param) => {
            console.debug('reload da listagem', param)
        }
    })

    useEffect(() => {
        loadData()
    }, [reload])

    useEffect(() => {
        if(connection && despensas){
            setTimeout(() => {
                changeDot()
            }, 1000)
        }
    }, [load])
    
    useEffect(() => {
        if(send){
            loadData()
        }
    }, [send])
    
    useEffect(() => {
        if(despensas.length > 0){
            console.log({despensas})
            sendData()
        }
    }, [despensas])
    
    useEffect(() => {
        console.log('Retorno')
        console.debug(JSON.stringify(despensas))
        console.debug(JSON.stringify(data))
        console.log('Retorno')
        if(data){
            setSend(false)
            LocalStorage.storeDespensas(data.handleDespensaMutation.despensas)
            // .then((  ) => {
                
            //     // reloadQueue()
            //     // reload()
            // })
        }
    }, [data])
    
    async function sendData(){
        console.debug('enviando...')
        console.debug(JSON.stringify(despensas))
        submit({ variables: { despensas: despensas } });
        setDespensas([])
    }

    function convertValues(obj){
        let listDespensas = obj.map(( despensa ) => {

            let listItems = despensa.items.map(( i ) => {
                
                let item = {
                    id: i.id,
                    uuid: i.uuid,
                    quantidade: i.quantidade,
                    validade: i.validade,
                    provimento: {
                        id :i.provimento.id,
                        nome:i.provimento.nome
                    }
                }

                if(!item.provimento.id) delete item.provimento.id

                if(!item.id) delete item.id
                if(!item.validade) delete item.validade
                
                if(!i.dataExclusao){
                    return item
                }
            })

            let newDespensa = {
                uuid: despensa.uuid,
                id: despensa.id,
                nome: despensa.nome,
                descricao: despensa.descricao,
                items: listItems
            }

            if(!newDespensa.id) delete newDespensa.id

            return newDespensa
        })

        console.log('LIST')
        console.log(JSON.stringify(listDespensas))

        setDespensas(listDespensas)
    }
    
    async function loadData(){
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setConnection(state.isConnected)
        });
        
        // Unsubscribe
        unsubscribe();

        LocalStorage.getQueueDespensa()
            .then( async( response ) => {
                if(response.length > 0){
                    convertValues(response)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    if(despensas && despensas.length > 0 && connection){
        return (
            <ConnectionTab>
                <ConnectionLabel> Sincronizando Despensas {load}</ConnectionLabel>
            </ConnectionTab>
        )
    }

    return null
}

export default forwardRef(QueueProcess)