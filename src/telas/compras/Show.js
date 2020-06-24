import React from 'react'
import { ScrollView } from 'react-native'
import ItemDespensa from '../../components/compras/Despensa'
import * as LocalStorage from '../../services/LocalStorage'

function Show() {

    const [despensas, setDespensas] = React.useState([])

    React.useEffect(() => {
        init()
    }, [])

    function init(){
        LocalStorage.getDespensas()
        .then(( res ) => {
            console.log({res}, despensas)
            setDespensas(res)
        })
    }

    function reloadLista(item, despensa){
        const newListDespensas = despensas.map(( d ) => {
            d.compras.map(( i ) => {
                if(i.uuid === item.uuid){
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


    return (
        <ScrollView>  
            {despensas.map(( d ) => 
                <ItemDespensa reload={reloadLista} data={d} />
            )}
        </ScrollView>
    )
}

export default Show
