import { useMutation } from '@apollo/client';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getQueuedPantries, ItemInterface, PantryInterface } from '../services/local/PantryLocalService';
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
            reloadData()
        }
    }))

    async function reloadData() {
        const pantries = await getQueuedPantries()   
        
        let pantriesData = pantries.map(( pantry: PantryInterface ) => {

            let items = pantry?.items.map(( item: ItemInterface ) => {
                return {
                    id: item.id,
                    // uuid: item.uuid,
                    quantity: item.quantity,
                    // TODO - expires
                    // expiresAt: item.expiresAt,
                    provision: item.provision,
                }
            })
            
            console.log("pantry")
            console.log(pantry[0])

            return {
                id: pantry[0].id,
                // uuid: pantry[0].uuid,
                name: pantry[0].name,
                description: pantry[0].description,
                items,
            }
        })
        
        
        // console.log(pantriesData.length)
        // console.log(pantriesData)
        // console.log("pantriesData")
        console.log(JSON.stringify(pantriesData))
        call({
            variables: pantries            
        })
    }

    useEffect(() => {
        console.log("DATA")
        console.log(data)
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