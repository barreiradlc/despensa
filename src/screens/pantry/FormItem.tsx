import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Keyboard, SafeAreaView, ToastAndroid } from 'react-native';

import { Button, ButtonLabel, Container, Input, LogoImage, FormContainer, FormItemContainer, ContainerInput } from "../../styles/form"
import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getItem, getProvision, handlePantryQueue, ItemInterface, ProvisionInterface, pushPantry } from '../../services/local/PantryLocalService';
import { PROVISIONS } from '../../components/queries/provisionListQuery';
import { CardContainer, CardContainerProvision, ContainerScroll, Label, Title } from '../../styles/components';
import { Divider } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';


const Form: React.FC = () => {
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const provisionOfflineRef = useRef()
    const provisionRef = useRef()
    const quantidadeRef = useRef()
    const [query, setQuery] = useState('')
    const [queryProvision, setQueryProvision] = useState(false)
    const [edit, setEdit] = useState(false)
    const { loading, error, data, refetch } = useQuery(PROVISIONS, {
        variables: {
            queryListInput: {
                query,
                take: 3
            }
        },
    });
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

    const items = useMemo(() => {
        console.log(data)
        console.log(toolTipVisible)

        if(data){
            
            if(toolTipVisible){
                provisionOfflineRef.current.focus()
            }
            
            return data.provisions
        }
        return []
    }, [data])

    useEffect(() => {
        if(!!items.length){
            provisionOfflineRef.current.focus()
        }
    }, [items])

    function ItemsTooltip(){
        return(
            <ContainerScroll>
                {items.map(( i ) => {
                    return (
                        <Button key={i.id} onPress={() => console.log(i.id)}>
                            <ButtonLabel>{i.name}</ButtonLabel>
                        </Button>
                    )
                })}
            </ContainerScroll>
        )
    }

    function handleChangeQuery({ nativeEvent: { text } }){
        console.log("text")
        console.log(text)

        setQuery(text.toLowerCase())
        setToolTipVisible(true)
    }

    return (
        <Container
            
        >

            <FormItemContainer
                keyboardOpen={toolTipVisible && !!items.length}
            >
               
                    {/* <Tooltip


                        tooltipStyle={{
                            height: '100%',
                            width: '100%'
                        }}
                        animated
                        //(Optional) When true, tooltip will animate in/out when showing/hiding
                        arrowSize={{width: 16, height: 8}}
                        //(Optional) Dimensions of arrow bubble p`ointing to the highlighted element
                        backgroundColor="rgba(0,0,0,0.5)"
                        //(Optional) Color of the fullscreen background beneath the tooltip.
                        isVisible={toolTipVisible && !!items.length}
                        //(Must) When true, tooltip is displayed
                        content={<ItemsTooltip />}
                        //(Must) This is the view displayed in the tooltip
                        placement="top"
                        //(Must) top, bottom, left, right, auto.
                        onClose={() => setToolTipVisible(false)}
                        //(Optional) Callback fired when the user taps the tooltip
                        > */}

                        <ContainerInput>
                            <Input
                                autoFocus={toolTipVisible && !!items.length}
                                ref={provisionOfflineRef}
                                placeholder='Nome'
                                value={query}
                                onChange={(e: any) => handleChangeQuery(e) }
                                // onBlur={(e: any) => handleProvisionChange(e)}
                                autoCapitalize='none'
                            />
                        </ContainerInput>
                    {/* </Tooltip> */}

                <ContainerInput>
                    <Input
                        ref={quantidadeRef}
                        placeholder='Quantidade'
                        value={itemData.quantity}
                        onChange={(e: any) => handleChange(e, 'quantity')}
                        autoCapitalize='none'
                    />
                </ContainerInput>

                <Button onPress={handleSaveItem}>
                    <ButtonLabel>Salvar</ButtonLabel>
                </Button>
                {/* </Tooltip> */}
            </FormItemContainer>

        </Container>
    );
}

export default Form;