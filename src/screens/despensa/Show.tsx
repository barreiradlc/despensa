import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CardDespensa from '../../components/CardDespensa';
import CardItem from '../../components/pantry/CardItem';
import { ItemListProvider } from '../../context/ItemListContext';
import { getPantries, ItemInterface, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';

const Show: React.FC = () => {

    const navigation = useNavigation()
    const routes = useRoute()
    const [items, setItems] = useState<ItemInterface[]>(routes.params?.items || [] as ItemInterface[])

    useEffect(() => {
        const { pantry } = routes.params
    
        navigation.setOptions({
            title: pantry.name
        })

        reloadData()
    }, [])

    async function reloadData() {
        // const data = await getPantries()
        // setPantries(data)
    }

    return (
        <ItemListProvider>
            <ContainerScroll
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >             
            
            <CardItem items={items}  />             

            </ContainerScroll>
        </ItemListProvider>
    );
}

export default Show;