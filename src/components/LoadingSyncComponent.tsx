import { NetworkStatus, useMutation } from '@apollo/client';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getQueuedPantries, ItemInterface, PantryInterface, storePantries } from '../services/local/PantryLocalService';
import {
    ContainerOverlay,
    TopContainer,
    LogoImage,
    LoadingLabel,
    LoadingLabelContainer,
    cor2,
    ContainerOverlayEnd,
    LoadingLabelBold
} from "../styles/components"
import { MANAGE_PANTRIES } from './mutations/managePantriesMutation';

const logo = '../assets/logo.png'

function LoadingSyncComponent(_, ref){
    const [call, { data, error, loading }] = useMutation(MANAGE_PANTRIES);

    useImperativeHandle(ref, () => ({
        reload: () => {    
            
            // console.log("REALOAD")        
            // console.log(NetworkStatus)        
            // console.log(networkStatus)        
            reloadData()
        }
    }))

    async function reloadData() {
        const pantries = await getQueuedPantries()    

        console.log({ pantries })

        if(!pantries.length) {
            return console.log("NOTHS TO RELOAD")  
        }

        let pantriesData = pantries.map(( pantry: PantryInterface ) => {

            let items = pantry?.items.map(( item: ItemInterface ) => {
                return {
                    _id: item._id,
                    uuid: item.uuid,
                    quantity: item.quantity,
                    // TODO - expires
                    // expiresAt: item.expiresAt,
                    provision: item.provision,
                }
            })

            return {
                _id: pantry[0]._id,
                uuid: pantry[0].uuid,
                name: pantry[0].name,
                description: pantry[0].description,
                deletedAt: pantry[0].deletedAt,
                items,
            }
        })
        
        
        console.log(pantriesData.length)
        console.log(JSON.stringify(pantriesData))
        // console.log(pantriesData)
        // console.log("pantriesData")

        call({
            variables: {
                pantries: pantriesData
            }            
        })
    }

    useEffect(() => {
        console.log("DATA")
        console.log(data)
        if(data){
            data.managePantries && storePantries(data.managePantries)
        }
    },[data])
    
    useEffect(() => {
        console.log("ERROR")
        console.log(error)
    },[error])

    console.log({loading})

    if(!loading) return null

    return (
        <ContainerOverlayEnd>            
            <LoadingLabelContainer> 
                <LoadingLabelBold>Sincronizando despensas...</LoadingLabelBold>
            </LoadingLabelContainer>
        </ContainerOverlayEnd>
    );
}

export default forwardRef(LoadingSyncComponent);