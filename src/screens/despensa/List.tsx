import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CardDespensa from '../../components/CardDespensa';
import { getPantries, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';

const List: React.FC = () => {
    const [ pantries, setPantries ] = useState<PantryInterface[]>([] as PantryInterface[])

    useEffect(() => {
        reloadData()
    },[])

    async function reloadData() {
        const data = await getPantries()
        setPantries(data)
    }

    // const navigation = useNavigation()
    // useEffect(() => {
    //     navigation.setOptions({
    //         title: "ALOU"            
    //     })
    // }, [])

  return (
        <ContainerScroll
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            {pantries?.map(( pantry: PantryInterface ) => 
                <CardDespensa key={pantry.id} pantry={pantry} />
            )}

            {/* <Label>{JSON.stringify(pantries)}</Label> */}

        </ContainerScroll>      
  );
}

export default List;