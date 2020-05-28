import React, { useState, useRef, useEffect } from 'react'
import { InnerHeader, RowInner, FormInput } from '../styled/Form'
import { CardRow, CardTouchable,RemoveItem,AddReceita, CardRowItem, MoreIngredient } from '../styled/Geral'


function FormPasso({ active, toggle, add, index, item, remove }) {

    const ref_input = useRef();

    const [submit, setSubmit] = useState()
    const [nome, setNome] = useState(item.descricao)

    useEffect(() => {
        setNome(item.descricao)
    }, [item])

    function handleInput(e) {
        setNome(e.nativeEvent.text)
    }

    function handleAdd(e){
        
        let val = e._targetInst.memoizedProps.text

        add(val, index)

    }

    return (
        <>
        <CardRow>
            <InnerHeader >Passo {index + 1 }</InnerHeader>
            {index !== 0 && 
                <CardTouchable onPress={() => remove(index)}>
                    <RemoveItem />
                </CardTouchable>
            }
        </CardRow>
            <FormInput
                onBlur={handleAdd}
                onChange={(event) => { handleInput(event, 'nome') }}
                value={nome}
                placeholder='Novo Passo'
                returnKeyType="next"
                numberOfLines={4}
                multiline

                />
        </>
    )
}

export default FormPasso
