import React, { useState, useEffect } from 'react'
import { FormTouchableItem, InnerText, RowInner } from '../styled/Form'
import { RemoveReceita } from '../styled/Geral'
import * as LocalStorage  from '../../services/LocalStorage'

function InnerIngrediente({ snackCompras, toggle, item, remove, show, storage }) {

    const [active, setActive] = useState(false)
    const [input, setInput] = useState()
    const [nome, setNome] = useState(item.provimento.nome)
    const qtd = item.quantidade
    
    useEffect(() => {
        setNome(item.provimento.nome)
        getStorageIngrediente(item)

    }, [item])

    function getStorageIngrediente(i){
        LocalStorage.getProvimento(i)
        .then(( res ) => {
            
            if(res){
                if(res.id || res.nome){
                        setActive(true)
                    }
                    console.log('a')
                }
            })
            .catch(( err ) => {
                console.debug(err)
            })
    }

    function edit(){
        console.log('edit')
    }

    return (
        <RowInner active={active} onPress={() => snackCompras(item)} onLongPress={() => console.log('LoongPress') }>
            
            <InnerText>{qtd > 1 && `${qtd}x `}{nome}</InnerText>
            
            {!show && 
                <FormTouchableItem onPress={() => remove(item) }  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <RemoveReceita />
                </FormTouchableItem>
            }
        </RowInner>
    )
}

export default InnerIngrediente
