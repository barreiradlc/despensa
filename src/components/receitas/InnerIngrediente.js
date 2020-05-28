import React, { useState, useEffect } from 'react'
import { FormTouchableItem, InnerText, RowInner } from '../styled/Form'
import { RemoveReceita } from '../styled/Geral'

function InnerIngrediente({ toggle, item, remove, show }) {

    const [active, setActive] = useState(true)
    const [input, setInput] = useState()
    const [nome, setNome] = useState(item.provimento.nome)
    const qtd = item.quantidade
    
    useEffect(() => {
        setNome(item.provimento.nome)
    }, [item])

    function edit(){
        console.log('edit')
    }

    return (
        <RowInner>
            <FormTouchableItem onPress={edit}>
                <InnerText>{qtd > 1 && `${qtd}x `}{nome}</InnerText>
            </FormTouchableItem>

            {!show && 
                <FormTouchableItem onPress={() => remove(item) }  hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <RemoveReceita />
                </FormTouchableItem>
            }
        </RowInner>
    )
}

export default InnerIngrediente
