import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import FormBottomSheet from '../../components/partials/FormBottomSheet';
import { getPantries, Pantry, storePantries } from '../../services/local/realm/PantryLocalService';
import MyComponent from './MyComponent';

function List(){

    const [ pantries, setPantries ] = useState<Pantry[]>([] as Pantry[])

    useEffect(() => {
        async function init(){
            const data = await getPantries()
            setPantries(data)
        }
        init()
    }, [])

    return(
        <View style={{ flex: 1 }}>

            <Text>{JSON.stringify(pantries)}</Text>

            <MyComponent pantries={pantries} />

            <FormBottomSheet />
        </View>
    )
}

export default List