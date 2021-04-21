import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import { BottomSheetItemProvider } from '../../components/context/BottomSheetItemProvider';
import FormBottomSheet from '../../components/partials/FormBottomSheet';
import { ButtonClose, ButtonFixed, ButtonLabel } from '../../components/styles/form';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { getPantries, Pantry, storePantries } from '../../services/local/realm/PantryLocalService';
import FormPantry from './Form';
import PantriesComponent from './PantriesComponent';

function List() {
    const formRef = useRef(null);
    const [pantries, setPantries] = useState<Pantry[]>([] as Pantry[])
    const [pantrySelected, setPantrySelected] = useState<Pantry>({} as Pantry)

    async function init() {
        const data = await getPantries()
        setPantries(data)
    }

    useEffect(() => {
        init()
    }, [])

    function handleClose() {
        formRef.current.toggle(1)
        init()
    }

    function handleOpen() {
        setPantrySelected({} as Pantry)
        formRef.current.toggle(0)
    }

    function renderContent() {
        return (
            <FormPantry close={handleClose} data={pantrySelected} />
        )
    };

    const editPantry = useCallback((pantry: PantryInterface) => {
        setPantrySelected(pantry)
        formRef.current.toggle(0)
    }, [pantries])

    return (
        <BottomSheetItemProvider>
            <View style={{ flex: 1, flexDirection: 'column' }}>

                {/* TODO, Rever nome e funcionaliades */}
                <ScrollView style={{ marginBottom: 80 }}>
                    <PantriesComponent editPantry={editPantry} pantries={pantries} />
                </ScrollView>

                <ButtonFixed
                    style={{ zIndex: 45 }}
                    onPress={handleOpen}
                >
                    <ButtonLabel>Adicionar uma nova despensa</ButtonLabel>
                </ButtonFixed>

                <FormBottomSheet ref={formRef} content={renderContent} />

            </View>
        </BottomSheetItemProvider>
    )
}

export default List