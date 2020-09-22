import { useApolloClient, useMutation } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { CardInner, FormButton, FormButtonGroup, FormButtonLabel, FormContainerScroll, RowInner, UserLabel, Wrap, InnerText } from '../components/styled/Form';
import { LoadingOverlay } from '../components/utils/Components';
import * as Utils from '../components/utils/Utils';
import * as LocalStorage from '../services/LocalStorage';

const HANDLE_CONVITE = gql`
    mutation handleConvite($id: Int, $aceita: Boolean!){
        responseConviteMutation(id: $id, aceita: $aceita) {
            response {
                id
                nome
                descricao
                items {
                    id
                    quantidade
                    validade
                    provimento {
                        id
                        nome
                    }
                }    
            }
        }
    }
`;

function Notifications({ route, navigation, handleNotifications }) {

    const { despensa, notifications, itensVencimento } = route.params

    const client = useApolloClient()
    const [notificationList, setNotificationList] = useState(notifications || null)
    const [despensasVencimento, setDespensasVencimento] = useState(notifications || null)
    const [user, setUser] = useState('')
    const [aguarde, setAguarde] = useState(false)

    const [sendResposta, { data, loading }] = useMutation(HANDLE_CONVITE, { variables: { id: focus } });

    function getDespensa(uuid) {
        return LocalStorage.getDespensaByUuid(uuid)
    }

    function handleNavigateDespensa(despensa) {

        if (despensa) {
            navigation.navigate('Estoque', {
                despensa,
                uuid: despensa.uuid
            })
        } else { console.table(despensa) }
    }

    useEffect(() => {
        let list = []

        itensVencimento.map((i) => {
            let add = list.filter((l) => l.uuid === i.despensaUuid)[0]
            let despensaLocal = getDespensa(i.despensaUuid)

            if (!add) {
                list.push({
                    uuid: i.despensaUuid,
                    despensaLocal,
                    items: [
                        i
                    ]
                })
            } else {
                console.log('LIST2')
                console.log(list)
                list.map((l) => {
                    console.log(l.uuid, i.despensaUuid)
                    if (l.uuid === i.despensaUuid) {
                        l.items.push(i)
                    }
                })
            }
        })

        setDespensasVencimento(list)
        // getItemsVencimento()
    }, [])

    // function getItemsVencimento(){
    //     LocalStorage.getItemsVencimento()        
    //         .then(( res ) => {
    //             console.debug('items vencimento')
    //             console.debug(res)
    //             console.debug('items')
    //         })
    // }

    navigation.setOptions({
        title: `Notificações`
    })

    const [focus, setFocus] = useState();
    const [values, setValues] = useState([])

    const getUser = async () => {
        let u = await AsyncStorage.getItem('@user');
        if (u) {
            setUser(JSON.parse(u))
        }
    }


    function handleInput(event, attr) {
        setValues({ ...values, [attr]: event.nativeEvent.text })
    }

    async function handleSubmit(value) {
        setAguarde(true)
        console.log(focus)
        sendResposta({
            variables: {
                id: Number(focus),
                aceita: value
            }
        })
            .then((response) => {
                setAguarde(false)
                console.debug(response)
                let newList = notificationList.filter((n) => n.id !== focus)
                setNotificationList(newList)
                route.params.handleNotifications(newList)
                LocalStorage.storeDespensas([response.data.responseConviteMutation.response])
                Utils.toast(`Convite ${value ? 'aceito' : 'recusado'} com sucesso`)
            })
            .catch((err) => {
                Utils.sweetalert(`Erro de conexão`)
                handleNotifications()
                console.debug(err)
            })
    }

    async function handleSelect(user) {
        setFocus(user.id)
    }

    async function handleSearch(e) {
        setQuery(e.nativeEvent.text)
        setFocus()
    }

    getUser()


    return (
        <FormContainerScroll>

            {aguarde &&
                <LoadingOverlay />
            }

            {notificationList.map((u) =>

                <FormButton key={u.id} flat onPress={() => handleSelect(u)} >
                    <CardInner flat active={focus === u.id} >
                        <UserLabel active={focus === u.id} >{u.mensagem}</UserLabel>
                        <UserLabel active={focus === u.id} >{u.email}</UserLabel>

                        {focus === u.id &&
                            <FormButtonGroup>
                                <FormButton onPress={() => handleSubmit(true)}>
                                    <FormButtonLabel>
                                        Aceitar
                                        </FormButtonLabel>
                                </FormButton>
                                <FormButton active onPress={() => handleSubmit(false)}>
                                    <FormButtonLabel active>
                                        Recusar
                                        </FormButtonLabel>
                                </FormButton>
                            </FormButtonGroup>
                        }


                    </CardInner>

                </FormButton>
            )}

            {despensasVencimento.length !== 0 && despensasVencimento.map((d) =>
                <FormButton style={{ paddingVertical: 20 }}>

                    <UserLabel style={{ fontSize: 18 }}> Se atente à suas despensas,{'\n'} {d.despensaLocal && d.despensaLocal.nome} possui {d.items && d.items.length === 1 && 'um'} ite{d.items && d.items.length > 1 ? 'ns' : 'm'}</UserLabel>
                    {/* <UserLabel style={{ fontSize: 18 }}>{JSON.stringify(d.despensaLocal.nome)}</UserLabel> */}

                    {/* <Wrap>
                        {d.items.map((i) =>
                            <RowInner active>
                                <InnerText>[]
                                    {i.provimento.nome}
                                </InnerText>
                            </RowInner>
                        )}
                    </Wrap> */}
                    <UserLabel style={{ fontSize: 18 }}> próximo{d.items && d.items.length > 1 && 's'} a seu vencimento</UserLabel>
                    <FormButtonGroup>
                        <FormButton onPress={() => handleNavigateDespensa(d.despensaLocal)} >
                            <FormButtonLabel>
                                Ver despensa
                            </FormButtonLabel>
                        </FormButton>
                    </FormButtonGroup>

                </FormButton>
            )}


        </FormContainerScroll>
    )
}

export default Notifications