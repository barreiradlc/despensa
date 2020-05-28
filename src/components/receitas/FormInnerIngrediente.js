import React, { useRef, useState } from 'react';
import { FormInput, RowInner } from '../styled/Form';
import { AddReceita, MoreIngredient } from '../styled/Geral';

function FormInnerIngrediente({ active, toggle, add }) {

    const ref_input = useRef();

    const [submit, setSubmit] = useState()
    const [nome, setNome] = useState()

    function handleInput(e) {
        setNome(e.nativeEvent.text)
    }

    function handleAdd(e){
        setSubmit(true)
    }
    
    function handleHide(e){
        
        let val = e._targetInst.memoizedProps.text.trim()
    
        if(val){
            add(val)
        }
    
        setNome()
        console.log(submit)
        if(submit){
            setTimeout(() => {
                ref_input.current.focus()
            }, 50)
        } else {
            toggle()
        }

        console.log('blur')
        setSubmit(false)
    }

    if (!active) {
        return (
            <RowInner>
                <MoreIngredient onPress={toggle} >
                    <AddReceita />
                </MoreIngredient>
            </RowInner>
        )
    }

    return (
            <FormInput
                onBlur={handleHide}
                onChange={(event) => { handleInput(event, 'nome') }}
                autoFocus
                value={nome}
                placeholder='Novo ingrediente'
                returnKeyType="next"
                onSubmitEditing={handleAdd}
                ref={ref_input}
            />
    )
}

export default FormInnerIngrediente
