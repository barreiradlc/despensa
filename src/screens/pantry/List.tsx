import * as React from 'react';
import { RefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import BottomSheet from 'reanimated-bottom-sheet';
import { BottomSheetItemProvider } from '../../components/context/BottomSheetItemProvider';
import { LocalDataContext } from '../../components/context/LocalDataProvider';
import FormBottomSheet from '../../components/partials/FormBottomSheet';
import { ButtonClose, ButtonFixed, ButtonLabel } from '../../components/styles/form';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import { getPantries, Pantry, storePantries } from '../../services/local/realm/PantryLocalService';
import FormPantry from './Form';
import PantriesComponent from './PantriesComponent';

interface IFormRef extends RefObject<any | undefined> {
    focus(): void
    toggle(snap: number): void
}

function List() {
    const formRef = useRef<IFormRef>({} as IFormRef);
    const [pantrySelected, setPantrySelected] = useState<PantryInterface>({} as PantryInterface)
    const { pantries, refreshPantries } = useContext(LocalDataContext)

    async function init() {
        refreshPantries()
    }

    useEffect(() => {
        init()
    }, [])

    function handleClose() {
        formRef.current.toggle(1)
        init()
    }

    function handleOpen() {
        setPantrySelected({} as PantryInterface)
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

    useEffect(() => {
        formRef.current.toggle(1)
    }, [pantries])

    return (
        <BottomSheetItemProvider>
            <View style={{ flex: 1, flexDirection: 'column', marginTop: getStatusBarHeight() + 12 }}>

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