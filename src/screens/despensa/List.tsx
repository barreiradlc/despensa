import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import CardDespensa from '../../components/CardDespensa';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import { getPantries, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';

const List: React.FC = () => {
    const refreshRef = useRef()
    const navigation = useNavigation()
    const [ pantries, setPantries ] = useState<PantryInterface[]>([] as PantryInterface[])

    useEffect(() => {
        reloadData()
    },[])

    async function reloadData() {
        const data = await getPantries()
        setPantries(data)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            refreshRef.current.reload()
            reloadData()
        });      
        return unsubscribe;
    }, [])

  return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {pantries?.map(( pantry: PantryInterface ) => 
                <CardDespensa key={pantry.id} pantry={pantry} />
            )}

            <Button onPress={() => navigation.navigate('FormPantry', {}) }>
                <ButtonLabel>Nova despensa</ButtonLabel>
            </Button>

            <LoadingSyncComponent ref={refreshRef} />

        </ContainerScroll>      
  );
}

export default List;