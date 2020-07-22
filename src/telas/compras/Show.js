import React from 'react'
import { ScrollView, AppState } from 'react-native'
import ItemDespensa from '../../components/compras/Despensa'
import * as LocalStorage from '../../services/LocalStorage'
import FormItemCompra from '../../components/utils/FormItemCompra'

function Show() {

    const [despensas, setDespensas] = React.useState([])
    const [despensaAtiva, setDespensaAtiva] = React.useState()
    const [showForm, setShowForm] = React.useState()

    React.useEffect(() => {
        init()
    }, [])


    function _handleAppStateChange (nextAppState){  
        if(nextAppState === 'inactive' || nextAppState === 'background'){
          init()
        }
      }

    function init() {
        AppState.addEventListener('change', _handleAppStateChange);
        LocalStorage.getDespensas()
            .then((res) => {
                console.log({ res }, despensas)
                setDespensas(res)
            })
    }

    function reloadLista(item, despensa) {
        const newListDespensas = despensas.map((d) => {
            d.compras.map((i) => {
                if (i.uuid === item.uuid) {
                    i = item
                }
                return i
            })
            return d
        })

        console.debug(item.quantidade)
        console.debug(newListDespensas)
        setDespensas(newListDespensas)
    }

    function handleItemCompra(despensa){
        console.debug(despensa.uuid)
        setDespensaAtiva(despensa)
        setShowForm(!showForm)
    }

    return (
        <ScrollView>
            
            {despensas.map((d) =>
                <ItemDespensa handleFormShow={handleItemCompra} reload={reloadLista} data={d} />
            )}

            {showForm &&
                <FormItemCompra renderForm={showForm} show={setShowForm} despensa={despensaAtiva} reloadLista={reloadLista} refresh={init} />
            }

        </ScrollView>
    )
}

export default Show
