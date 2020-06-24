import React, {useEffect, useState, useContext} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Button, TouchableWithoutFeedback, Text, View } from 'react-native';
import { DrawerScrollContainer } from './styled/Geral'
import { useIsDrawerOpen } from '@react-navigation/drawer';

import UserContext from '../components/state/Context'
import DrawerItem from './DrawerItem'
import * as LocalStorage from '../services/LocalStorage'

function ContentDrawer({navigation, route}){
  
    const isDrawerOpen = useIsDrawerOpen();

    const [ user , setUser ] = useState({
      fullName: ''
    })
  
    const  getUser = async() => {
      let u = await AsyncStorage.getItem('@user');
      console.log(u)
      if(u){
        setUser(JSON.parse(u))
      }
    }
  
    useEffect(() => {
      getUser()
    }, [isDrawerOpen])

    useEffect(() => {
      console.debug({UserContext})
      console.debug({user})
      
      getUser()
      console.debug({user})
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
      navigation.navigate('Perfil')
    }

    function handleListReceitasPossiveis(){
      navigation.navigate('ListReceitasPossiveis')
    }
    
    function handleListaCompras(){
      navigation.navigate('Lista de compras')
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
  
    return (
      <DrawerScrollContainer>
        <DrawerItem bg label={`Bem vindo(a) ${user.fullName}\n \n${user.email}`} handleFunction={() =>  console.log('nada')}  />
        
        <DrawerItem label='Home' icon='home' handleFunction={handleHome} />
        <DrawerItem label='Editar perfil' icon='user' handleFunction={handleProfile} />
        <DrawerItem label='Receitas possíveis' icon='star-o' handleFunction={handleListReceitasPossiveis} />
        {/* <DrawerItem label='Favoritos' icon='star-o' handleFunction={handleSoon} /> */}
        <DrawerItem label='Lista de compras' icon='th-list' handleFunction={handleListaCompras} />
        <DrawerItem label='Sair' icon='power-off' handleFunction={handleSair} />

      </DrawerScrollContainer>
    )
  }


  export default ContentDrawer