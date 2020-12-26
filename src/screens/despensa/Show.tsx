import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CardDespensa from '../../components/CardDespensa';
import CardItem from '../../components/pantry/CardItem';
import { ItemListProvider } from '../../context/ItemListContext';
import { getPantries, ItemInterface, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';

const Show: React.FC = () => {

    const navigation = useNavigation()
    const routes = useRoute()
    const [items, setItems] = useState<ItemInterface[]>(routes.params?.items || [] as ItemInterface[])

    const { pantry } = routes.params
    
    useEffect(() => {
        
        navigation.setOptions({
            title: pantry.name
        })

        reloadData()
    }, [])

    async function reloadData() {
        const data = await getPantries()
        setItems(data.items)
    }

    return (
        <ItemListProvider>
            <ContainerScroll
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >             
            
            <CardItem items={items} pantry={pantry} />             

            </ContainerScroll>

        </ItemListProvider>
    );
}

export default Show;