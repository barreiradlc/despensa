import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { CardInner, FormButton, FormButtonGroup, FormButtonLabel, FormContainerScroll, FormInput, UserLabel } from '../../components/styled/Form';
import { FloatTouchable } from '../../components/styled/Geral';
import { LoadingOverlay, LoadingSmall } from '../../components/utils/Components';
import * as Utils from '../../components/utils/Utils';

const SEARCH_USERS = gql`
    query getUsers($q: String!){
        users(query:$q){
            id
            fullName
            email
        }
    }
`;

const CREATE_CONVITE = gql`
 mutation createConvite($id: Int!, $convite: ConviteInput!){
   addConviteMutation(id: $id, convite: $convite)
   {
     convite {
       usuarioSolicitacao
       id
       mensagem      
    }
}
}
`


function SearchUser({route, navigation}) {

    useEffect(() => {
    }, [])
    
    const { despensa } = route.params
    
    const client = useApolloClient()
    const [aguarde, setAguarde] = useState(false)
    const [query, setQuery] = useState('')
    const [user, setUser] = useState('')
    
    const { data, error, loading, refetch, subscribeToMore } = useQuery(SEARCH_USERS, { variables: { q: query }});
    const [sendConvite] = useMutation(CREATE_CONVITE, {variables: { id: focus } });
    
    navigation.setOptions({ 
        title: `Pesquisar usuário`
    })
    
    const [focus, setFocus] = useState();
    const [values, setValues] = useState([])
    
    const  getUser = async() => {
        let u = await AsyncStorage.getItem('@user');
        if(u){
            setUser(JSON.parse(u))
        }
    }
    
    
    function handleInput(event, attr) {
        setValues({ ...values, [attr]: event.nativeEvent.text })
    }
    
    async function handleSubmit() {
        setAguarde(true)
        console.log(focus)
        sendConvite({ variables: { 
            id: Number(focus),
            convite: { 
                mensagem: `${user.email} lhe convidou para fazer parte da despensa ${despensa.nome}` ,
                despensaId: despensa.id
            }
        } 
    })
    .then(( response ) => {
        setAguarde(false)
        console.debug(navigation)
        navigation.goBack()
        Utils.sweetalert('Convite enviado com successo', 'success', 'Successo')
        console.debug(response)
    })
    .catch(( err ) => {
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
        <>
        {aguarde &&
            <LoadingOverlay />
        }

        <FormContainerScroll>

            <FormInput
                onChange={handleSearch}
                autoFocus
                value={query}
                placeholder='Nome'
                returnKeyType="next"
            />

            {!data && loading &&
                <LoadingSmall />
            }

            {query !== '' && 
                (data  || !loading) && data.users && data.users.map(( u ) =>
                    user.id !== u.id && 
                        <FormButton key={u.id} flat onPress={() => handleSelect(u)} >
                            <CardInner flat active={focus === u.id} >
                                <UserLabel active={focus === u.id} >{u.fullName}</UserLabel>
                                <UserLabel active={focus === u.id} >{u.email}</UserLabel>
                            </CardInner>
                        </FormButton>
                )
            }



        </FormContainerScroll>

        {!loading && focus && 
            <FormButtonGroup style={{ backgroundColor: '#c93b4a' }}>
                    <FloatTouchable active={focus} onPress={handleSubmit} >
                        <FormButtonLabel active={focus} >Enviar convite</FormButtonLabel>
                    </FloatTouchable>
            </FormButtonGroup>
        }

        </>
    )
}

export default SearchUser