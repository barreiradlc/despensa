import { gql, useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { User } from "realm";
import DashboardError from "../components/DashboardError";
import LoadingComponent from "../components/LoadingComponent";
import { ME } from "../components/queries/meQuery";
import { storePantries } from "../services/local/PantryLocalService";
import getInitialLabel from "../utils/initialLabel";


function HomeScreen() {
    const { loading, error, data, refetch } = useQuery(ME);
    const navigation = useNavigation()
    const [ readtimer, setReadTimer ] = useState(false)

    setTimeout(() => {
        setReadTimer(true)
    }, 3000)

    async function handleUpdateUserData(user: any) {
        await AsyncStorage.setItem('@despensa:User', JSON.stringify(user))
    }

    useEffect(() => {
        console.log({data})

        if(data && readtimer){
            handleUpdateUserData(data.me.user)
            storePantries(data.me.pantries)
            navigation.dispatch(
                StackActions.replace('DashBoard',)
            );
        }
    }, [data, readtimer])
    
    useEffect(() => {
        console.log({error})
    }, [error])

    const reload = useCallback(() => {
        refetch()
    }, [data])
    
    if (error) return <DashboardError refetch={reload} />;

    return <LoadingComponent />;
}

export default HomeScreen