import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import  { StyleSheet } from 'react-native'
import { FormTouchableItem, InnerText, RowInner } from '../styled/Form'
import { RemoveReceita, TableBody ,TableCell } from '../styled/Geral'
import * as LocalStorage from '../../services/LocalStorage'
import { DataTable } from 'react-native-paper';

const MEDIDAS_ENUM = [
    {value:"UNIDADE",label: "unidade"},
    {value:"COLHER", label: "colher de sopa"}
]

function InnerIngrediente({ snackCompras, toggle, item, remove, show, storage, index }, ref) {

    const [active, setActive] = useState(false)
    const [activeEstoque, setActiveEstoque] = useState(false)
    const [stock, setStock] = useState(false)
    const [input, setInput] = useState()
    const [nome, setNome] = useState(item.provimento.nome)
    const qtd = item.quantidade

    useEffect(() => {
        init()
    }, [item])

    function init() {
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

    function getStorageIngrediente(i) {
        LocalStorage.getProvimento(i)
            .then((res) => {

                if (res) {
                    if (res.id || res.nome) {
                        setActive(true)
                    }
                    console.log('a')
                }
            })
            .catch((err) => {
                console.debug(err)
            })
    }

    function getStorageIngredienteCompras(i) {
        LocalStorage.getProvimentoCompras(i)
            .then((res) => {
                console.log('res')
                if (res) {
                    if (!res.deletedAt && res.provimento) {
                        setStock(true)
                        console.log('estoque', res.deletedAt, res.provimento.nome)
                    }

                }
            })
            .catch((err) => {
                console.debug(err)
            })
    }

    function edit() {
        console.log('edit')
    }

    let left = {
        textAlign: 'start' ,
        
    }

    return (
        <>
            {/* <RowInner stock={stock} active={active} onPress={() => snackCompras(item)} onLongPress={() => console.log('LoongPress')}> */}

            {/* <InnerText>{qtd > 1 && `${qtd}x `}{nome}</InnerText> */}

            {console.log(item)}

            
             

            <TableBody>
                <TableCell >{nome}</TableCell>
                <TableCell  >{MEDIDAS_ENUM.filter(( m ) => m.value === item.medida)[0].label}</TableCell>
                <TableCell  numeric>   {item.quantidade}</TableCell>
                <TableCell  numeric> + </TableCell>
            </TableBody>
        



            {!show &&
                <FormTouchableItem onPress={() => remove(item)} hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
                    <RemoveReceita />
                </FormTouchableItem>
            }
        </>
    )
}


const styles = StyleSheet.create({
    left: {              
    //   justifyContent: 'center',
    //   width: '100%'
    },
  });

export default forwardRef(InnerIngrediente)
