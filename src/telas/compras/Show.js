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

    return (
        <ScrollView>  
            {despensas.map(( d ) => 
                <ItemDespensa data={d} />
            )}
        </ScrollView>
    )
}

export default Show
