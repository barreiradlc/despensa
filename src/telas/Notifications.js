import React, { useState } from 'react'
import { UserLabel, CardInner, FormInputTextArea, FormInputReadOnly, Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainerScroll, FormIconContainer, FormInput, FormLabel, FormTouchableItem, FormTouchableIcon, Google } from '../components/styled/Form'
import { UserItem, HeaderTouchable, MenuItem, Container, Float, FloatTitle, FloatTouchable, Plus } from '../components/styled/Geral';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment'
import * as LocalStorage from '../services/LocalStorage'
import * as Utils from '../components/utils/Utils'
import { Alert } from 'react-native'
import gql from 'graphql-tag';
import { LoadingOverlay } from '../components/utils/Components'
import { useMutation, useQuery, useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

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

    const { despensa, notifications } = route.params

    const client = useApolloClient()
    const [notificationList, setNotificationList] = useState(notifications)
    const [user, setUser] = useState('')
    const [aguarde, setAguarde] = useState(false)

    const [sendResposta, { data, loading }] = useMutation(HANDLE_CONVITE, { variables: { id: focus } });

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
                let newList = notificationList.filter(( n ) => n.id !== focus)
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

            </FormContainerScroll>
    )
}

export default Notifications