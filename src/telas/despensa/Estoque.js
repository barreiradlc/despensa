import React, { useEffect, useState } from 'react';
import { ContainerView, HeaderContainer, HeaderTouchable, MenuItem, Container, Float, FloatTitle, FloatTouchable, Plus } from '../../components/styled/Geral';
import * as LocalStorage from '../../services/LocalStorage';
import ListItems from './ListItems';
import { sweetalert } from '../../components/utils/Utils'
import { Alert } from 'react-native'

function Estoque({ route, navigation }) {
    
    const {despensa, editEstoque, uuid, items } = route.params;
    
    const [edit, setEdit] = useState(editEstoque)
    const [values, setValues] = useState()
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        init()
        // setLoading(false)
    }, [])
    
    useEffect(() => {
        init()
        // setLoading(false)
    }, [edit])
    
    async function init(){
        navigation.setOptions({ 
            title: despensa.nome,
            headerRight: () => (
                <HeaderTouchable onPress={handleEditDespensa} hitSlop={{ top: 20, bottom: 20, left: 20, right: 100 }}>
                    <HeaderContainer>
                        <MenuItem /> 
                    </HeaderContainer>
                </HeaderTouchable>
            )    
        })
        let listValid = validItem(despensa.items)
        setValues({...despensa, items: listValid})

        setLoading(false)
        setEdit(false)
    }
    
    useEffect(() => {
        // loadData()
        init()
    }, [editEstoque])
    
    function handleEditDespensa(){
        console.log('EDIT')
        // console.log(JSON.stringify(values))
        
        navigation.navigate('FormDespensa', {
            edit: true,
            despensa,
            reload: route.params.reloadDespensas
        })   
    }
    
    async function setItems(itemsLocais, despensa){
        setValues({
            uuid: despensa.uuid, 
            nome: despensa.nome, 
            descricao: despensa.descricao, 
            items: itemsLocais 
        })
    }
    
    function validItem(items){
        return items.filter(item  => item.deletedAt === null)
    }
    
    async function loadData() {

        let result
        result = validItem(despensa.items)
        
        navigation.setOptions({ 
            headerRight: () => ( 
                <HeaderTouchable onPress={handleEditDespensa} hitSlop={{ top: 20, bottom: 20, left: 20, right: 100 }}>
                    <HeaderContainer>
                        <MenuItem /> 
                    </HeaderContainer>
                </HeaderTouchable>
            )
        })     
        
        setItems(result, items)
        setLoading(false)
        setEdit(false)
    }
    
    function handleRefresh(){
        loadData()
    }
    
    function hadleFormItem(item ,edit) {

        if(!edit){
            console.log('new Item', despensa.uuid)            
        }
        
        navigation.navigate('FormItem', {
            item,
            edit: edit || false,
            despensaUuid: despensa.uuid,
            handleRefresh: handleRefresh
        })
    }

    function handleDelete(item){
        LocalStorage.deleteItem(item)
            .then(( res ) => {
                console.debug(res)
                sweetalert(`${res} removido(a)`, 'success', 'Sucesso')
                setEdit(true)
            })
            .catch(( err ) => {
                console.debug(err)
                sweetalert(`${err} removido(a)`)
            })
    }

    function handleDeleteItem(item){
        console.log(item)
        Alert.alert(
            'Atenção',
            'Deseja mesmo remover este item?',
            [            
              {
                text: 'NÂO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'SIM', onPress: () => handleDelete(item)},
            ],
            {cancelable: false},
        );
    }

    if (loading) {
        return null
    }

    function changeqtd(data, action){
        LocalStorage.changeQTD(data, action)
            .then(( d ) => {
                let listValid = validItem(d.items)
                setValues({...d, items: listValid})
            })
        
        setEdit(true)
    }

    return (
        <ContainerView>
            <>

                {__DEV__ &&
                    <FloatTitle> {JSON.stringify(despensa.id)} </FloatTitle>
                }

                <ListItems 
                    value={values} 
                    changeqtd={changeqtd} 
                    edit={hadleFormItem}
                    delete={handleDeleteItem}
                    />

            </>
            
            <FloatTouchable onPress={hadleFormItem}>
                <Float>
                    <Plus />
                    <FloatTitle> Novo item </FloatTitle>
                </Float>
            </FloatTouchable>
        </ContainerView>
    )
}


export default Estoque