import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as React from 'react';
import { Alert, Button, TouchableWithoutFeedback, Text, View } from 'react-native';

import Login from '../telas/Login';
import Perfil from '../telas/Perfil';
import Notifications from '../telas/Notifications';
import Home from '../telas/Home';
import Estoque from '../telas/despensa/Estoque'
import FormItem from '../telas/despensa/NovoItem'
import FormDespensa from '../telas/despensa/FormDespensa'
import SearchUser from '../telas/despensa/SearchUser'
import FormReceita from '../telas/receita/FormReceita'
import ListReceitas from '../telas/receita/List'
import ShowReceita from '../telas/receita/Show'

import { IconsImage, TabContainer, TabLabel } from '../components/styled/Geral'
import { HeaderBadge, HomeNotifications, HeaderTouchable, HeaderContainer, HomeMenuItem } from '../components/styled/Geral'
import ContentDrawer from '../components/ContentDrawer'
import UserContext from '../components/state/Context'



const logo = '../assets/despensa.png'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Sair({navigation}){

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
        {text: 'SIM', onPress: () => navigation.navigate('Login')},
      ],
      {cancelable: false},
  );
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => navigation.closeDrawer()}>
        <View style={{  justifyContent: 'flex-start', alignItems: 'flex-start', padding:25, fontWeight: 'bold', fontSize:25 }}>
          <Text>Home</Text>
        </View> 
      </TouchableWithoutFeedback><TouchableWithoutFeedback onPress={handleSair}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', padding:25, fontWeight: 'bold', fontSize:25 }}>
          <Text>Sair</Text>
        </View> 
      </TouchableWithoutFeedback>
    </>
  )
}

function HomeScreen({ navigation }) {

  const [ conviteList, setConviteList ] = React.useState([])

  function handleNotifications(convites){
    console.log('Olar')
    console.debug(convites)
    setConviteList(convites)
  }

  function handleNavigateNotifications(){
    navigation.navigate('Notifications', {
      notifications: conviteList,
      handleNotifications
    })
  }

  navigation.setOptions({ 
    // title: 'Despensa',
    headerLeft: () => ( 
        <HeaderTouchable onPress={() => navigation.openDrawer()}>
            <HeaderContainer>
                <HomeMenuItem /> 
            </HeaderContainer>
        </HeaderTouchable>
    ),

    headerRight: () => ( 
        <HeaderTouchable onPress={handleNavigateNotifications}>
            <HeaderContainer>
                {conviteList && conviteList.length > 0 && 
                  <HeaderBadge/>
                }
                <HomeNotifications /> 
            </HeaderContainer>
        </HeaderTouchable>
    )    
  })

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={props => <Home handleNotifications={handleNotifications}  {...props} />} navigation={navigation} options={{
        tabBarLabel: '',
        tabBarIcon: (props) => (
          <CustomComponent props={props} id='Despensa' />
        ),
      }} />

      
        <Tab.Screen name="Receitas" component={ListReceitas} options={{
          tabBarLabel: '',
          tabBarIcon: (props) => (
            <CustomComponent props={props} id='Receitas' />
          ),
        }}
        />
      
      
    </Tab.Navigator>
  );
}

function getBg(id) {
  if (id === 'Despensa') {
    return '#c93b4a'
  }
  if (id === 'Receitas') {
    return '#4e1017'
  }
  return '#fff'
}

function IconReceitaAtivo(props) {
  let icon = '../assets/receita-ativo.png'

  return <IconsImage source={require(icon)} id={props.id} />
}

function IconReceitaInAtivo(props) {
  let icon = '../assets/receita-inativo.png'

  return <IconsImage source={require(icon)} id={props.id} />
}

function IconDespensaAtivo(props) {
  let icon = '../assets/despensa-ativo.png'

  return <IconsImage source={require(icon)} id={props.id} />
}

function IconDespensaInAtivo(props) {
  let icon = '../assets/despensa-inativo.png'

  return <IconsImage source={require(icon)} id={props.id} />
}

function CustomComponent(props) {

  const active = props.props.focused
  const bg = getBg(props.id)

  return (
    <TabContainer bg={bg} id={props.id} active={active}>

      {/* {!__DEV__ &&
        props.id === 'Receitas' ?
          props.active ?
            <IconReceitaAtivo />
            :
            <IconReceitaInAtivo />
          :
          props.active ?
            <IconDespensaAtivo />
            :
            <IconDespensaInAtivo />
      } */}
      

      <TabLabel active={active}>{props.id}</TabLabel>
    </TabContainer>
  )
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Drawer')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}



function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const options = {
  tabBarPosition: 'bottom',
  backBehavior: 'none',
  gesturesEnabled: false,
  swipeEnabled: false
}

function MyDrawer(props) {
  const context = React.useContext(UserContext)

  console.debug(context)

  return (
  <NavigationContainer>
    <Drawer.Navigator
    context={context}
    drawerLockMode='locked-open'
    drawerContent={props =>  <ContentDrawer context={context} {...props} />}
    gestureHandlerProps={false}
    swipeEnabled={false}
    edgeWidth={0}
    drawerStyle={{
      backgroundColor: '#fff',
      width: 240,
    }}
    >
      <Drawer.Screen name="Home" gesturesEnabled={false} component={() => Navigator(props)} />
      {/* <Drawer.Screen name="Article" component={Article} /> */}
      {/* <Drawer.Screen name="Sair" component={Sair} /> */}
    </Drawer.Navigator>
  </NavigationContainer>
  );
}


function Navigator(props) {

  const home = props.token ? 'Home' : 'Login'

  return (
      <Stack.Navigator initialRouteName={home}>
        <Stack.Screen name="Drawer" component={MyDrawer} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="FormItem" component={FormItem} />
        <Stack.Screen name="FormDespensa" component={FormDespensa} />
        <Stack.Screen name="SearchUser" component={SearchUser} />
        <Stack.Screen name="FormReceita" component={FormReceita} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ShowReceita" component={ShowReceita} />
        <Stack.Screen name="Estoque" component={Estoque} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
  );
}

export default MyDrawer;
