import { gql, useLazyQuery, useQuery, NetworkStatus } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import DashboardError from "../components/DashboardError";
import LoadingComponent from "../components/LoadingComponent";
import { ME } from "../components/queries/meQuery";
import { getPantries, storePantries } from "../services/local/PantryLocalService";

import getInitialLabel from "../utils/initialLabel";

function HomeScreen() {
    const [ meQuery,  { loading, error, data, refetch, client, networkStatus }] = useLazyQuery(ME, {
            notifyOnNetworkStatusChange: true,
    });
    const navigation = useNavigation()
    const [ readtimer, setReadTimer ] = useState(false)

    useEffect(() => {

        meQuery()
        
        setTimeout(() => {
            setReadTimer(true)
        }, 4000)

    }, [])

    async function handleUpdateUserData(user: any) {
        let newUser = {
            ...user,
            pantries: null
        }

        await AsyncStorage.setItem('@despensa:User', JSON.stringify(newUser))
    }

    useEffect(() => {
        
        if(data && readtimer){
            console.log("data")
            console.log(data)

            const { me } = data            
            
            // console.log("ME")
            // console.log(me.pantries)
            // console.log(me)

            if(me){
                // TODO, Barreira - Refatorar store pantries
                storePantries(me.pantries)
                handleUpdateUserData(me)

                // navigation.dispatch(
                //     StackActions.replace('DashBoard')
                // );
            }
            
        }
    }, [data, readtimer])
    
    useEffect(() => {
        console.log({error})
    }, [error])
    
    // useEffect(() => {
    //     if (networkStatus === NetworkStatus.refetch){
    //         meQuery()
    //     }        
    // }, [networkStatus])

    const reload = useCallback(() => {
        meQuery()
    }, [data])

    if (networkStatus === NetworkStatus.refetch) return <LoadingComponent />;
    if (error && !loading) return <DashboardError refetch={reload} />;

    return <LoadingComponent />;
}

export default HomeScreen