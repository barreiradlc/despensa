import React, {useEffect, useState, useContext} from 'react'
import { Alert, Button, TouchableWithoutFeedback, Text, View } from 'react-native';
import { DrawerScrollContainer } from './styled/Geral'
import AsyncStorage from '@react-native-community/async-storage';
import * as LocalStorage from '../services/LocalStorage'

import UserContext from '../components/state/Context'

import DrawerItem from './DrawerItem'


function ContentDrawer({navigation, route}){
  
  const [ user , setUser ] = useState({
    fullName: ''
  })
  
    const  getUser = async() => {
      let u = await AsyncStorage.getItem('@user');
      if(u){
        setUser(JSON.parse(u))
      }
    }
  
    useEffect(() => {
      getUser()
    }, [])

    function handleSair(){
      Alert.alert(
        'Atenção',
        'Deseja mesmo sair?',
        [
          {
            text: 'NÂO',
            onPress: () => navigation.closeDrawer(),
            style: 'cancel',
          },
          {text: 'SIM', onPress: () => handleLogout()
        },
      ],
      {cancelable: false},
      );
    }

    async function handleLogout(){
      await AsyncStorage.removeItem('@token')
      await AsyncStorage.removeItem('@user')

      LocalStorage.removeAll()
        .then(( ) => {
          navigation.navigate('Login')
        })
    }

    function handleHome(){
        navigation.navigate('Home')
    }
    
    function handleProfile(){
      if(__DEV__){
        navigation.navigate('Perfil')
      } else {
        handleSoon()
      }
    }

    function handleSoon(){
      Alert.alert(
        'A implementar...',
        'Aguarde vindouras atualizações',
        [
          {text: 'OK', onPress: () => console.log('Nada a fazer')
        },
      ],
        {cancelable: false},
      );
    }


    let name 
    getUser()
      .then(( n ) => {
        name = n
      })
  
    return (
      <DrawerScrollContainer>
        <DrawerItem bg label={`Bem vindo(a) ${user.fullName}\n \n${user.email}`} handleFunction={() =>  console.log('nada')}  />
        
        <DrawerItem label='Home' icon='home' handleFunction={handleHome} />
        <DrawerItem label='Editar Perfil' icon='user' handleFunction={handleProfile} />
        <DrawerItem label='Favoritos' icon='star-o' handleFunction={handleSoon} />
        <DrawerItem label='Lista de compras' icon='th-list' handleFunction={handleSoon} />
        <DrawerItem label='Sair' icon='power-off' handleFunction={handleSair} />

      </DrawerScrollContainer>
    )
  }


  export default ContentDrawer