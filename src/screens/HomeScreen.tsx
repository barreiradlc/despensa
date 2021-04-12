import { gql, useLazyQuery, useQuery, NetworkStatus } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { ME } from "../components/gql/queries/meQuery";
import DashboardError from "../components/partials/DashBoardError";
import LoadingComponent from "../components/partials/LoadingComponent";
import { storePantries } from "../services/local/realm/PantryLocalService";



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

            const { me } = data            

            console.log({ me })

            if(me){            
                if(!!me.pantries){
                    storePantries(me.pantries)
                }
                handleUpdateUserData(me)

                navigation.navigate('Dashboard')

                // navigation.dispatch(
                //     StackActions.replace('Dashboard')
                // )
            }
            
        }
    }, [data, readtimer])
    
    useEffect(() => {
        console.log({error})
    }, [error])
    
    useEffect(() => {
        if (networkStatus === NetworkStatus.refetch){
            meQuery()
        }        
    }, [networkStatus])

    const reload = useCallback(() => {
        meQuery()
    }, [data])

    if (networkStatus === NetworkStatus.refetch) return <LoadingComponent />;
    if (error && !loading) return <DashboardError refetch={reload} />;

    return <LoadingComponent />;
}

export default HomeScreen