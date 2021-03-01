import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardPantry from '../../components/CardPantry';
import FabGroup from '../../components/FabGroup';
import LoadingSyncComponent from '../../components/LoadingSyncComponent';
import { Pantry } from '../../config/waterMelonDBConfig/schemas/Pantry';
import { getPantries, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { ButtonAdd as Button, ButtonLabelAdd as ButtonLabel, FormContainer } from '../../styles/form';

const List: React.FC = () => {
    const refreshRef = useRef()
    const navigation = useNavigation()
    const [ pantries, setPantries ] = useState<Pantry[]>([] as Pantry[])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        reloadData()
    },[])
    
    async function reloadData() {
        const data = await getPantries()

        // console.log("data PANTRY")
        // console.log(data)

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
        setPantries([] as Pantry[])
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

        // if(!!pantries.length){
        //     console.log("pantries")
        //     console.log(pantries[0].deletedAt)
        // }

        return pantries.filter(p => !p.deletedAt)

    }, [pantries])

  return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {!loading && validPantries?.map(( pantry: Pantry ) => 
                <CardPantry key={pantry._id} pantry={pantry} />
            )}

            <FormContainer
                style={{
                    justifyContent: 'flex-end'
                }}
            >
                <Button onPress={() => navigation.navigate('FormPantry', {}) }>
                    <ButtonLabel>Nova despensa</ButtonLabel>
                </Button>
            </FormContainer>


            <LoadingSyncComponent ref={refreshRef} />
        </ContainerScroll>      
  );
}

export default List;