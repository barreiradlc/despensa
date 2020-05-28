import React, { useRef, useImperativeHandle, forwardRef, useEffect, useState } from 'react'
import { FloatHome, Plus, FloatTouchable, Float, Header, CardTouchable, ContainerDespensa, Card, CardBody, CardTitle, FloatTitle } from '../../components/styled/Geral'
import * as LocalStorage from '../../services/LocalStorage'
import { useNavigation } from '@react-navigation/native';

import { LoadingOverlay } from '../../components/utils/Components'
import { HeaderTouchable, HeaderContainer, HomeMenuItem } from '../../components/styled/Geral'
import QueueProcess from '../../components/QueueProcess'

function List(props, ref) {
    
    const [reload, setReload] = useState(false)    
    const queueRef = useRef()

    useEffect(() => {
        if(reload){
            console.debug('IMPERATIVE')
            console.debug(queueRef)
            console.debug('IMPERATIVE')
            // queueRef.current.reload('aaaaaa')
        }
        setReload(false)
    },[reload]);
    
    function reloadQueue(){
        console.log('reloadDashBoard')
        setLoading(true)
        init()
    }

    function listenRoute(){
        setReload(true)
        console.log('achou')
    }

    useEffect(() => 
        navigation.addListener('focus', () => listenRoute())
    ,[]);
    
    const navigation = useNavigation();
    const [values, setValues] = useState([])    
    const [loading, setLoading] = useState(props.edit || true)

    useEffect(() => {
        setLoading(true)
        init()
    }, [props])
    
    useEffect(() => {
        setLoading(true)
        init()
    }, [])

    useImperativeHandle(ref, () => ({
        refresh: () => {
            console.log('refresh...')
            setLoading(true)
            init()
        }
    }));

    function init() {
        
        console.debug('Refresh')
        if (props.items) {

            console.warn({ props })
            console.warn(props.items)

            setValues(props.items)
        } else {            
            loadData()
        }
        setLoading(false)
    }

    function loadData(){
        LocalStorage.getDespensas()
                .then((response) => {
                    console.debug({ response })
                    // props.reload()
                    setValues(response)
                })
                .catch((err) => {
                    console.log(err)
                })
    }

    if (loading) {
        return <LoadingOverlay />
    }

    function navigateEstoque(despensa) {
        navigation.navigate('Estoque', {
            despensa,
            uuid: despensa.uuid,
            reloadDespensas: loadData
        })
    }

    function Item(props) {

        const value = props.value

        console.log({v: value.nome})

        return (
            <Card>
                <CardTouchable onPress={() => navigateEstoque(value)}>
                    <>
                        <CardTitle>{value.nome} {__DEV__ && value.items.length}</CardTitle>
                        <CardBody>{value.descricao}</CardBody>
                            {__DEV__
                            &&
                                <CardBody>
                                    {value.fila ? 'pendente' : 'nem ta'}
                                </CardBody>
                            }
                    </>
                </CardTouchable>
            </Card>
        )
    }

    function handleFormNew(){
        navigation.navigate('FormDespensa', {
            edit: false,
            despensa: null,
            reload: loadData
        })
    }

    return (
        <>
            <ContainerDespensa>
                <Header>Minhas Despensas</Header>

                {values.map((value) =>
                    !value.deletedAt && 
                    <Item listenRoute={listenRoute} value={value} />
                )}
                
            </ContainerDespensa>

            <FloatTouchable onPress={handleFormNew}>
                <FloatHome>
                    <Plus />
                    <FloatTitle> Nova despensa </FloatTitle>
                </FloatHome>
            </FloatTouchable>

            <QueueProcess reload={reload} ref={queueRef} reloadQueue={reloadQueue} />
        </>
    )
}

export default forwardRef(List)