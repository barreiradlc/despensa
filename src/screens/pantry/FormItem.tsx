import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, Input, LogoImage, FormContainer, FormItemContainer } from "../../styles/form"
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem, getProvision, handlePantryQueue, ItemInterface, ProvisionInterface, pushPantry } from '../../services/local/PantryLocalService';
import { PROVISIONS } from '../../components/queries/provisionListQuery';
import { CardContainer, CardContainerProvision, ContainerScroll, Label, Title } from '../../styles/components';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Divider } from 'react-native-elements';

const Form: React.FC = () => {
    const provisionOfflineRef = useRef()
    const provisionRef = useRef()
    const quantidadeRef = useRef()
    const [query, setQuery] = useState('')
    const [queryProvision, setQueryProvision] = useState(false)
    const [edit, setEdit] = useState(false)
    // const { loading, error, data, refetch } = useQuery(PROVISIONS, {
    //     variables: {
    //         queryListInput: {
    //             query
    //         }
    //     },
    // });
    const [itemData, setItemData] = useState<ItemInterface>({} as ItemInterface)
    const navigation = useNavigation()
    const route = useRoute()

    const { populateItemsList, pantryUuid, item } = route.params

    async function handleProvisionChange() {
        console.log(query)
        const provision = await getProvision({ name: query })

        console.log('provision')
        console.log({ provision })

        setItemData({ ...itemData, provision: provision })
    }

    function handleChange(event: any, attr: string) {
        setItemData({ ...itemData, [attr]: event.nativeEvent.text.trim().toLowerCase() })
    }

    function handleSetProvision(provision: ProvisionInterface) {
        console.log(provision)
        setQuery('')
        setQueryProvision(false)
        setItemData({ ...itemData, 'provision': provision })
        getProvision(provision)

        quantidadeRef.current.focus()
    }

    function handleChangeProvision(event: any) {
        provisionRef.current?.focus()
        setQuery(event.nativeEvent.text.trim().toLowerCase())
    }

    function handleGoToSignUp() {
        navigation.navigate('SignUp')
    }

    function handleToggleProvision() {

    }

    useEffect(() => {
        console.log({ item })

        if (item) {
            setItemData({
                ...item,
                quantity: String(item.quantity)
            })

            setQuery(item.provision.name)

            setEdit(true)
        }
    }, [item])

    useEffect(() => {
        if (query) {
            setTimeout(() => {
                provisionRef.current?.focus()
            }, 500)
        }
    }, [query])

    async function handleSaveItem() {
        getProvision({ name: query })
            .then((provision) => {

                if(!provision){
                    return handleSaveItem()
                }

                if (!provision.name) {
                    return ToastAndroid.show("Não é possível salvar um item nem seu nome", 500)
                }

                getItem(itemData, provision)
                    .then(( item ) => {

                        console.debug("item")
                        console.debug(item)

                        // return handleSaveItem()

                        if (!edit) {
                            pushPantry(pantryUuid, item)
                        } else {
                            handlePantryQueue(pantryUuid, itemData.uuid)
                        }
        
                        navigation.goBack()
                    })
            })

    }

    useEffect(() => {
        provisionOfflineRef.current.focus()
        // if(__DEV__){
        //     setLoginData({
        //         username: "lerigou@gmail.com",
        //         password: "123123"
        //     })
        // }
    }, [])

    function queryProvisions() {
        setQueryProvision(true)
        setTimeout(() => {
            provisionRef.current.focus()
        }, 1500)
        // console.log(provisionRef)
    }

    async function handleSaveLoginData() {
        // const { signIn } = data

        // try {
        //     await AsyncStorage.setItem('@despensaJWT', JSON.stringify(signIn))
        //     navigation.dispatch(
        //         StackActions.replace('Home')
        //     );
        // } catch (e) {
        //     throw new Error("Error Saving token")
        //     // saving error
        // }
    }

    // const TooltipProvisions: React.FC = () => {
    //     if (!data) return null;

    //     const { provisions } = data

    //     if (!!provisions.length && query) {

    //         // return (<Title>{JSON.stringify(provisions[0].name)}</Title>)

    //         return (
    //             <ContainerScroll
    //                 contentContainerStyle={{ flexGrow: 1 }}
    //                 showsVerticalScrollIndicator={false}
    //             >

    //                 {provisions?.map((provision: ProvisionInterface, index: number) =>
    //                     <>
    //                         {index !== 0 && <Divider />}
    //                         <CardContainerProvision onPress={() => handleSetProvision(provision)} key={provision.id} >
    //                             <Label>{provision.name}</Label>
    //                         </CardContainerProvision>
    //                     </>
    //                 )}
    //             </ContainerScroll>
    //         );
    //     }

    //     return null
    // }

    return (
        <Container>

            <FormItemContainer>
                {/* <Tooltip
                    backgroundColor="rgba(250, 250, 250, 1)"
                    contentStyle={{ width: '100%' }}
                    onClose={() => console.log("TOOLTIP")}
                    isVisible={false}
                    // isVisible={!!data && !error}
                    // isVisible
                    content={<TooltipProvisions />}
                    placement='top'
                > */}

                {/* TODO - QUERY */}
                {/* <Input
                            value={query}
                            style={{ display: queryProvision ? 'flex' : 'none' }}
                            ref={provisionRef}
                            placeholder='Nome'
                            onChange={(e: any) => handleChangeProvision(e)}
                            autoCapitalize='none'
                            />
                                                    
                        <Button onPress={queryProvisions} style={{ display: queryProvision ? 'none' : 'flex' }}>
                            <ButtonLabel>{itemData?.provision ? itemData?.provision.name : 'Nome'}</ButtonLabel>
                        </Button> */}
                {/* TODO - QUERY */}



                <Input
                    ref={provisionOfflineRef}
                    placeholder='Nome'
                    value={query}
                    onChange={(e: any) => setQuery(e.nativeEvent.text.toLowerCase())}
                    // onBlur={(e: any) => handleProvisionChange(e)}
                    autoCapitalize='none'

                />
                <Input
                    ref={quantidadeRef}
                    placeholder='Quantidade'
                    value={itemData.quantity}
                    onChange={(e: any) => handleChange(e, 'quantity')}
                    autoCapitalize='none'
                />

                <Button onPress={handleSaveItem}>
                    <ButtonLabel>Salvar</ButtonLabel>
                </Button>
                {/* </Tooltip> */}
            </FormItemContainer>

        </Container>
    );
}

export default Form;