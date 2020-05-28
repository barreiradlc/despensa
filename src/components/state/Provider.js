import React from 'react'
import UserContext from './Context'
import AsyncStorage from '@react-native-community/async-storage';

async function getUser(){
    const u = await AsyncStorage.getItem('@user');
    return JSON.parse(u)
}

function Provider({ children }) {

    let user
        getUser()
         .then(( r ) => {
             user = r
         })

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}

export default Provider