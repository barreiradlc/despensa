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

function FormInnerIngrediente({ active, toggle, add, item }) {

    const ref_input = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const [submit, setSubmit] = useState()    
    const [values, setValues] = useState({
        nome: item ? item.provimento.nome : '',
        quantidade: item ? item.quantidade : '1',
        medida: item ? item.medida : 'UNIDADE'
    })


    function handleInput(value, attr) {
        setValues({ ...values, [attr]: value })
    }
    // function handleInput(e) {
    //         setNome(e.nativeEvent.text)
    // }

    function handleAdd() {
        add(values)        
        setTimeout(() => {
            ref_input.current.focus()
            resetValues()
        }, 50)
    }

    function resetValues(){
        setValues({
            nome: '',
            quantidade: '1',
            medida: 'UNIDADE'
        })
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
            <RowInner active >
                <MoreIngredient onPress={toggle} >
                    <AddReceita />
                </MoreIngredient>
            </RowInner>
        )
    }

    return (
        <>
        <TableBody style={{paddingTop: 40}}>            
            <TableCell>
                <Picker
                    prompt="Unidade de medida"
                    selectedValue={values.medida}
                    style={{ height: 50, width: '100%' }}
                    ref={ref_input2}
                    onValueChange={(itemValue) =>
                        handleInput(itemValue, 'medida') 
                    }>                    
                    {MEDIDAS_ENUM.map(( m ) => 
                        <Picker.Item label={m.label} value={m.value} />
                    )}
                </Picker>
            </TableCell>
            <TableCell numeric>
                <FormInput
                    // onBlur={handleHide}.
                    onChange={(event) => { handleInput(event.nativeEvent.text, 'quantidade') }}
                    autoFocus
                    value={values.quantidade}
                    // placeholder='Novo ingrediente'
                    returnKeyType="next"
                    onSubmitEditing={handleAdd}
                    ref={ref_input3}
                    />
            </TableCell>
            
        </TableBody>
        <TableBody>
            <TableCell>
                <FormInput
                    // onBlur={handleHide}
                    onChange={(event) => { handleInput(event.nativeEvent.text, 'nome') }}
                    autoFocus
                    value={values.nome}
                    placeholder='Nome'
                    returnKeyType="next"
                    onSubmitEditing={handleAdd}
                    ref={ref_input}
                    />
            </TableCell>
            <TableCell numeric>
                <RowInner active>
                    <MoreIngredient onPress={() => add(values)} >
                        <AddReceita />
                    </MoreIngredient>
                </RowInner>
            </TableCell>
        </TableBody>
        </>

    )
}

export default FormInnerIngrediente
