import React, { useRef, useState, useEffect } from 'react';
import {
    FormInput, RowInner, TableBody,
    TableCellForm,TableBodyColumn
} from '../styled/Form';
import { AddReceita, MoreIngredient } from '../styled/Geral';
import { Picker } from '@react-native-community/picker';
import { MEDIDAS_ENUM } from '../receitas/enums/UnidadeDeMedida'

function FormInnerIngrediente({ active, toggle, add, item }) {

    const ref_input = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    console.debug("ITEM")
    console.debug(item)
    console.debug("ITEM")

    const [submit, setSubmit] = useState()
    const [values, setValues] = useState({
        nome: item ? item.provimento.nome : '',
        quantidade: item ? String(item.quantidade || 1) : '1',
        medida: item ? item.medida : 'UNIDADE'
    })

    useEffect(() => {
        if (active && values.nome) {
            add(values)
        }
        if (item) {
            setValues({
                nome: item ? item.provimento.nome : '',
                quantidade: item ? String(item.quantidade || 1) : '1',
                medida: item ? item.medida : 'UNIDADE'
            })
        }
        if (active) {
            ref_input.current.focus()
        }
    }, [item])

    useEffect(() => {
        console.debug("ACTIVE")
        console.debug(active)
        console.debug(values)

        if (!active && values && values.nome) {
            add(values)
        }
    }, [active])

    function handleInput(value, attr) {
        setValues({ ...values, [attr]: value })
    }
    // function handleInput(e) {
    //         setNome(e.nativeEvent.text)
    // }

    function handleAdd() {
        add(values)
        resetValues()
        setTimeout(() => {
            ref_input.current.focus()
            resetValues()
        }, 50)
    }

    function resetValues() {
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
        <TableBodyColumn>
            <TableBody style={{ paddingTop: 40 }}>
                <TableCellForm>
                    <Picker
                        prompt="Unidade de medida"
                        selectedValue={values.medida}
                        style={{ height: 50, width: '100%' }}
                        ref={ref_input2}
                        onValueChange={(itemValue) =>
                            handleInput(itemValue, 'medida')

                        }>
                        {MEDIDAS_ENUM.map((m) =>
                            <Picker.Item label={m.label} value={m.value} style={{ padding: 5 }} />
                        )}
                    </Picker>
                </TableCellForm>
                <TableCellForm numeric>
                    <FormInput
                        // onBlur={handleHide}.
                        onChange={(event) => { handleInput(event.nativeEvent.text, 'quantidade') }}
                        autoFocus
                        value={values.quantidade}
                        placeholder='Qtd.'
                        returnKeyType="next"
                        onSubmitEditing={handleAdd}
                        ref={ref_input3}
                    />
                </TableCellForm>

            </TableBody>
            <TableBody>
                <TableCellForm>
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
                </TableCellForm>
                <TableCellForm numeric>
                    <RowInner active>
                        <MoreIngredient onPress={handleAdd} >
                            <AddReceita />
                        </MoreIngredient>
                    </RowInner>
                </TableCellForm>
            </TableBody>
        </TableBodyColumn>

    )
}

export default FormInnerIngrediente
