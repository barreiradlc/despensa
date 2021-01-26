import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardDespensa from '../../components/CardPantry';
import CardItem from '../../components/pantry/CardItem';
import { cor6 } from '../../constants/CORES';
import { ItemListProvider } from '../../context/ItemListContext';
import { getPantries, getPantryByUuid, ItemInterface, PantryInterface } from '../../services/local/PantryLocalService';
import { Container, ContainerScroll, Label } from '../../styles/components';
import { Button, ButtonLabel } from '../../styles/form';


const Show: React.FC = () => {

    const navigation = useNavigation()
    const routes = useRoute()
    // const [items, setItems] = useState<ItemInterface[]>(routes.params?.items || [] as ItemInterface[])

    const { pantry } = routes.params

    function HeaderRight() {
        return (
            <RectButton onPress={() => navigation.navigate('FormPantry', { pantry })} style={{ paddingHorizontal: 15 }}>
                <Icon name="more-vertical" size={21} color="#555" />
            </RectButton>
        )
    }

    function HeaderLeft() {
        return (
            <RectButton onPress={() => navigation.goBack()} style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Icon name="chevron-left" size={32} color="rgb(0.0, 0.0, 1.0)" style={{ paddingRight: 15 }}/>
                <Label color={`color="rgb(0.0, 0.0, 1.0)"`} >Início</Label>
            </RectButton>
        )
    }

    useEffect(() => {

        // console.log(JSON.stringify(pantry))
        if(Platform.OS === 'ios'){
            navigation.setOptions({
                title: pantry.name,
                headerRight: () => <HeaderRight />,
                headerLeft: () => <HeaderLeft />,
            })
        } else {
            navigation.setOptions({
                title: pantry.name,
                headerRight: () => <HeaderRight />,
                // headerLeft: () => <HeaderLeft />,
            })
        }

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