import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardDespensa';
import CardItem from '../../components/pantry/CardItem';
import { ItemListProvider } from '../../context/ItemListContext';
import { getPantries, getPantryByUuid, ItemInterface, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';

const Show: React.FC = () => {

    const navigation = useNavigation()
    const routes = useRoute()
    // const [items, setItems] = useState<ItemInterface[]>(routes.params?.items || [] as ItemInterface[])

    const { pantry } = routes.params

    function HeaderLeft() {
        return (
            <Button invert onPress={() => navigation.navigate('FormPantry', { pantry })}>
                <Icon name="more-vertical" size={21} color="#555" />
            </Button>
        )
    }

    useEffect(() => {

        // console.log(JSON.stringify(pantry))

        navigation.setOptions({
            title: pantry.name,
            headerRight: () => <HeaderLeft />
        })

        // reloadData()
    }, [])

    // async function reloadData() {
    //     const data = await getPantryByUuid(pantry.uuid)
    //     setItems(data.items)
    // }

    return (
        <ItemListProvider>
            <ContainerScroll
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >

                <CardItem pantry={pantry} />

            </ContainerScroll>

        </ItemListProvider>
    );
}

export default Show;