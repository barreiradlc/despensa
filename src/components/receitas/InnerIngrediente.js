import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import { FormTouchableItem, InnerText, RowInner } from '../styled/Form'
import { RemoveReceita } from '../styled/Geral'
import * as LocalStorage  from '../../services/LocalStorage'

function InnerIngrediente({ snackCompras, toggle, item, remove, show, storage }, ref) {

    const [active, setActive] = useState(false)
    const [stock, setStock] = useState(false)
    const [input, setInput] = useState()
    const [nome, setNome] = useState(item.provimento.nome)
    const qtd = item.quantidade
    
    useEffect(() => {
        init()
    }, [item])
    
    function init(){
        setNome(item.provimento.nome)
        getStorageIngrediente(item)
        getStorageIngredienteCompras(item)
    }

    useImperativeHandle(ref, () => ({
        reload: () => {
            console.debug("RELOAD", nome)
            init()
        }
    }))

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
    
    function getStorageIngredienteCompras(i){
        LocalStorage.getProvimentoCompras(i)
        .then(( res ) => {
            
                if(res){
                    if(res.provimento.id || res.provimento.nome){
                        setStock(true)
                        console.log('estoque', res)
                    }
                    console.log('estoque?')
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
        <RowInner stock={stock} active={active} onPress={() => snackCompras(item)} onLongPress={() => console.log('LoongPress') }>
            
            <InnerText>{qtd > 1 && `${qtd}x `}{nome}</InnerText>
            
            {!show && 
                <FormTouchableItem onPress={() => remove(item) }  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <RemoveReceita />
                </FormTouchableItem>
            }
        </RowInner>
    )
}

export default forwardRef(InnerIngrediente)
