import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import  { StyleSheet } from 'react-native'
import { FormTouchableItem, InnerText, RowInner } from '../styled/Form'
import { RemoveReceita, TableBody ,TableCell } from '../styled/Geral'
import * as LocalStorage from '../../services/LocalStorage'
import { DataTable } from 'react-native-paper';
import { MEDIDAS_ENUM } from './enums/UnidadeDeMedida'

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
        textAlign: 'start'        
    }

    console.log('ITEM ---')
    console.log(item)
    console.log(nome)
    console.log(active)
    console.log('ITEM ---')


        return (
            <TableBody style={{ justifyContent: 'space-evenly', marginBottom: 20 }}>
                <TableCell style={{ textDecorationLine: active ? "line-through" : "none" }}>{nome}</TableCell>                
                <TableCell  numeric style={{ width: 100,  }}>{item.medida ? MEDIDAS_ENUM.filter(( m ) => m.value === item.medida)[0].label : "Unidade"}</TableCell>                
                <TableCell  numeric>   {item.quantidade}</TableCell>
            </TableBody>
        )
    

    return (
        <>
            {/* <RowInner stock={stock} active={active} onPress={() => snackCompras(item)} onLongPress={() => console.log('LoongPress')}> */}

            {/* <InnerText>{qtd > 1 && `${qtd}x `}{nome}</InnerText> */}

            {console.log(item)}

            <TableBody>
                <TableCell style={{ textDecorationLine: active ? "line-through" : "none" }}>{nome}</TableCell>                
                <TableCell numeric style={{ width: 100 }} >{item.medida ? MEDIDAS_ENUM.filter(( m ) => m.value === item.medida)[0].label : "Unidade"}</TableCell>                
                <TableCell numeric> {item.quantidade}</TableCell>                
            </TableBody>
        



            {__DEV__ && !show &&
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
