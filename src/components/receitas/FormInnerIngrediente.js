import React, { useRef, useState } from 'react';
import {
    FormInput, RowInner, TableBody,
    TableCell
} from '../styled/Form';
import { AddReceita, MoreIngredient } from '../styled/Geral';
import { Picker } from '@react-native-community/picker';

const MEDIDAS_ENUM = [
    {value:"UNIDADE",label: "unidade"},
    {value:"COLHER", label: "colher de sopa"}
]

function FormInnerIngrediente({ active, toggle, add }) {

    const ref_input = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const [submit, setSubmit] = useState()
    const [nome, setNome] = useState()
    const [medida, setMedida] = useState()
    const [quantidade, setquantidade] = useState(1)

    function handleInput(e) {
        setNome(e.nativeEvent.text)
    }

    function handleAdd(e) {
        console.log('ref_input2')
        console.log(ref_input2)
        console.log(ref_input2.current)
        // console.log(ref_input2.current.toggle())
        console.log('ref_input2')
        // ref_input2.current.toggle()
        // setSubmit(true)
    }
    function handleAddMedida(e) {
        // ref_input3.current.focus()
        // setSubmit(true)
    }
    function handleAddNome(e) {
        ref_input2.current.focus()
        setSubmit(true)
    }

    function handleHide(e) {

        let val = e._targetInst.memoizedProps.text.trim()

        if (val) {
            add(val)
        }

        setNome()
        console.log(submit)
        if (submit) {
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
            <RowInner active>
                <MoreIngredient onPress={toggle} >
                    <AddReceita />
                </MoreIngredient>
            </RowInner>
        )
    }

    return (
        <TableBody>
            <TableCell>
                <FormInput
                    // onBlur={handleHide}
                    onChange={(event) => { handleInput(event, 'nome') }}
                    autoFocus
                    value={nome}
                    placeholder='Nome'
                    returnKeyType="next"
                    onSubmitEditing={handleAdd}
                    ref={ref_input}
                    />
            </TableCell>
            <TableCell numeric>
                <FormInput
                    // onBlur={handleHide}
                    onChange={(event) => { handleInput(event, 'nome') }}
                    autoFocus
                    value={quantidade}
                    // placeholder='Novo ingrediente'
                    returnKeyType="next"
                    onSubmitEditing={handleAdd}
                    ref={ref_input3}
                />
            </TableCell>
            <TableCell>
                <Picker
                    prompt="Unidade de medida"
                    selectedValue={medida}
                    // style={{ height: 50, width: 100 }}
                    ref={ref_input2}
                    onValueChange={(itemValue) =>
                        setMedida(itemValue)                        
                    }>                    
                    {MEDIDAS_ENUM.map(( m ) => 
                        <Picker.Item label={m.label} value={m.value} />
                    )}
                </Picker>
            </TableCell>
            
            <RowInner active>
                <MoreIngredient onPress={toggle} >
                    <AddReceita />
                </MoreIngredient>
            </RowInner>
        </TableBody>

    )
}

export default FormInnerIngrediente
