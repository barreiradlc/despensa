import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import FormBottomSheet from '../../components/partials/FormBottomSheet';
import { ButtonClose, ButtonFixed, ButtonLabel } from '../../components/styles/form';
import { getPantries, Pantry, storePantries } from '../../services/local/realm/PantryLocalService';
import MyComponent from './MyComponent';

function List() {
    const formRef = useRef(null);
    const [pantries, setPantries] = useState<Pantry[]>([] as Pantry[])

    useEffect(() => {
        async function init() {
            const data = await getPantries()
            setPantries(data)
        }
        init()
    }, [])

    function handleClose() {
        formRef.current.toggle(1)
    }

    function handleOpen() {
        formRef.current.toggle(0)
    }

    function renderContent() {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    padding: 16,
                    height: 450,
                }}
            >

                <View
                    style={{
                        bottom: 20,
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ButtonClose
                        title="Close Bottom Sheet"
                        onPress={handleClose}
                    >
                        <Icon name='times' />
                    </ButtonClose>
                </View>
            </View>

        )
    };

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>

            {/* TODO, Rever nome e funcionaliades */}
            <MyComponent pantries={pantries} />

            <ButtonFixed
                style={{ zIndex: 45 }}
                onPress={handleOpen}
                >
                <ButtonLabel>Adicionar uma nova despensa</ButtonLabel>
            </ButtonFixed>

            {/* TODO, Extrair form de outro component */}
            <FormBottomSheet ref={formRef} content={renderContent} />
        </View>
    )
}

export default List