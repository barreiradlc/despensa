import { gql, useQuery } from "@apollo/client";
import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import DashboardError from "../components/DashboardError";
import LoadingComponent from "../components/LoadingComponent";
import { ME } from "../components/queries/meQuery";
import getInitialLabel from "../utils/initialLabel";

function HomeScreen() {
    const { loading, error, data, refetch } = useQuery(ME);
    const navigation = useNavigation()
    const [ readtimer, setReadTimer ] = useState(false)

    setTimeout(() => {
        setReadTimer(true)
    }, 3000)

    useEffect(() => {
        if(data && readtimer){
            // navigation.navigate('DashBoard')

            navigation.dispatch(
                StackActions.replace('DashBoard',)
            );        
        }
    }, [data, readtimer])
    
    useEffect(() => {
        
    }, [error])

    
    if (error) return <DashboardError refetch={refetch} />;

    return <LoadingComponent />;
}

export default HomeScreen