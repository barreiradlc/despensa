import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardDespensa';
import FabGroup from '../../components/FabGroup';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import { getPantries, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';

const List: React.FC = () => {
    const refreshRef = useRef()
    const navigation = useNavigation()
    const [ pantries, setPantries ] = useState<PantryInterface[]>([] as PantryInterface[])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        reloadData()
    },[])
    
    async function reloadData() {
        const data = await getPantries()
        setPantries(data)
        setLoading(false)
    }

    function HeaderLeft() {
        return (
            <Button invert onPress={() => refreshRef.current.reload() }>
                <Icon name="more-vertical" size={21} color="#555" />
            </Button>
        )
    }

    useEffect(() => {
        setLoading(true)
        setPantries([] as PantryInterface[])
        navigation.setOptions({            
            headerRight: () => <HeaderLeft />
        })

        const unsubscribe = navigation.addListener('focus', () => {
            refreshRef.current.reload()
            reloadData()
        });      
        return unsubscribe;
    }, [])
    
    const validPantries = useMemo(() => {

        return pantries.filter(p => !p.deletedAt)

    }, [pantries])

  return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {!loading && validPantries?.map(( pantry: PantryInterface ) => 
                <CardDespensa key={pantry.id} pantry={pantry} />
            )}

            {/* <Button onPress={() => navigation.navigate('FormPantry', {}) }>
                <ButtonLabel>Nova despensa</ButtonLabel>
            </Button> */}

            <LoadingSyncComponent ref={refreshRef} />

            {/* <FabGroup visible={true} /> */}

        </ContainerScroll>      
  );
}

export default List;