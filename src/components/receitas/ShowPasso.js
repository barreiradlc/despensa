import React, { useState, useRef, useEffect } from 'react'
import { InnerHeader, RowInner, FormInput } from '../styled/Form'
import { AddReceita, CardRowItem, MoreIngredient } from '../styled/Geral'


function ShowPasso({ active, toggle, add, index, item }) {

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
            <InnerHeader >Passo {item.posicao + 1}:  {`\n${nome} \n\n`}</InnerHeader>
        </>
    )
}

export default ShowPasso
