import Realm from 'realm'
import { uuid } from '../components/utils/Utils'
import realm from '../config/realm'

export async function updateShopList() {
    let today = new Date()
    let doneItems = await realm.objects('ItemCompras').filtered('done = $0', true)
    
    console.debug({doneItems})
    console.debug(doneItems.length)

    doneItems.map(( d ) => {
        let despensaLocal = getDespensaByUuid(d.despensaUuid)
        let itemProvimentoLocal = realm.objects('Item').filtered('provimento.nome = $0', d.provimento.nome)[0]
        
        console.log(d.provimento.nome)


        saveItem(d, d.provimento, today, despensaLocal, itemProvimentoLocal)
            .then(( res ) => {
                console.log({res})
                realm.write(() => {
                    despensaLocal.fila = true
                    realm.delete(d)
                })
            })
    })

}

export async function changeQTDItemListaCompras(item, action) {
    try {
        realm.write(() => {
            if (action == 'more') {
                item.quantidade++
            }
            if (action == 'less') {
                console.log("LESS")
                item.quantidade--
            }

            console.log('ITEM')
            console.log(item.quantidade)
            console.log('ITEM')

            return item
        })
    } catch (error) {
        console.error('Erro em alterar o estado do item na lista de compras')
    }
}

export async function removeItemListaCompras(item, despensa) {
    try {
        realm.write(() => {
            return item.deletedAt = new Date()
        })
    } catch (error) {
        console.error('Erro em alterar o estado do item na lista de compras')
    }
}

export async function checkItemListaCompras(item, despensa) {

    console.debug({item}, {despensa})

    try {
        if(item.done){
            
        }
        realm.write(() => {

            return item.done = !item.done
        })
    } catch (error) {
        console.error('Erro em alterar o estado do item na lista de compras')
    }
}

export async function addItemListaCompras(item, despensa, lista) {
    console.debug("ADD", item, " em ", despensa, lista)

    let despensaLocal = await realm.objectForPrimaryKey('Despensa', despensa)
    let provimentoLocal = await realm.objects('Provimento').filtered('id = $0 or nome = $1', Number(item.id), item.nome)[0]

    if (!provimentoLocal) {
        console.log('ADD')
        saveProvimento({ provimento: item })
    }

    getProvimentoCompras({ provimento: item })
        .then((update) => {
            console.debug({ update })

            if (!update) {
                console.debug({ transacaoCompra1: lista })
                newItemCompras(item.nome, despensa, item.quantidade)
                    .then((res) => {
                        if (lista) {
                            console.debug({ transacaoCompra2: res })

                            return res
                        } else {
                            console.debug({ transacaoCompra3: lista })
                            return "new"
                        }
                    })
            } else {
                addCompras(update, despensaLocal)
                return "update"
            }
        })

}

export async function addItemListaComprasDespensa(item, despensa) {
    console.debug("ADD", item, " em ", despensa)

    let despensaLocal = await realm.objectForPrimaryKey('Despensa', despensa)
    let provimentoLocal = await realm.objects('Provimento').filtered('nome = $0', item.nome)[0]

    if (!provimentoLocal) {
        console.log('ADD2')
        saveProvimento({ provimento: item })
            .then((p) => {
                provimentoLocal = p
            })
    }

    let more

    despensaLocal.compras.map((i) => {

        console.debug(i.provimento.nome, item.nome)

        if (i.provimento.nome === item.nome && !i.deletedAt) {
            realm.write(() => {
                console.log("MORE")
                i.quantidade++
                more = true
                return i
            })
        }
    })

    console.log('ADD3')

    if (!more) {
        newItemCompras(item.nome, despensa, item.quantidade)
            .then((res) => {
                console.log('ADD4', res)
                return res
            })
    }

    console.log('ADD5')
}

export async function getItemsVencimento() {
    let currentTime = new Date();

    currentTime = currentTime.setDate(currentTime.getDate() + 14)

    let twoWeeks = new Date(currentTime)

    console.debug({ twoWeeks })

    return await realm.objects('Item').filtered('validade <= $0', twoWeeks)
}

export async function getProvimentos() {
    return await realm.objects('Provimento')
}

export async function getProvimento(i) {
    return await realm.objects('Item').filtered('provimento.id = $0 or provimento.nome = $1', Number(i.provimento.id), i.provimento.nome)[0]
}

export async function getProvimentoCompras(i) {
    console.log("COMPRAS", i.provimento)
    return await realm.objects('ItemCompras').filtered('provimento.id = $0 or provimento.nome = $1', Number(i.provimento.id), i.provimento.nome)[0]
}

export async function getProvimentoComprasDespensa(i, d) {
    console.log("COMPRAS", i.provimento, d)
    let despensaLocal = realm.objects('Despensa').filtered('ItemCompras.provimento.id = $0 or ItemCompras.provimento.nome = $1 AND ItemCompras.deletedAt = $2', Number(i.provimento.id), i.provimento.nome, null)[0]
    console.log("COMPRAS", despensaLocal)
    return despensaLocal
}


export async function getQueueDespensa() {
    let list = await realm.objects('Despensa').filtered('fila = $0 AND deletedAt = $1', true, null)
    
    realm.write(async () => {
        list = list && list.map((despensa) => {

            console.debug({ despensa: despensa.items })

            let validItems = []
            
            despensa.items && despensa.items.map((i) => {
                if (i.dataExclusao && i.id || !i.id) {
                    validItems.push(i)
                }
            })

            console.debug({ validItems })

            despensa.items = validItems
            return despensa
        })

    })
    return list
}

export async function getQueue() {
    // let realm = await getRealm()    

    let list = await realm.objects('Item').filtered('fila = $0 AND deletedAt = $1', true, null)

    console.debug('uuid', list[0].despensaUuid)
    let despensa = await realm.objectForPrimaryKey('Despensa', list[0].despensaUuid)

    console.log('length Item', list.length)
    list = despensa.items

    console.log('length same Item', list.length)

    return {
        items: list,
        despensa: despensa,
    }
}

export async function getDespensas() {
    // let realm = await getRealm()    
    let list = await realm.objects('Despensa')

    console.debug(list.length)

    return list
}

export function getDespensaByUuid(uuid) {
    // let realm = await getRealm()    
    return realm.objectForPrimaryKey('Despensa', uuid)
}

export async function getDespensaItems(uuid, local) {
    // let realm = await getRealm()

    let list
    if (local) {
        list = await realm.objects('Despensa').filtered('uuid = $0', uuid)[0]
    } else {
        list = await realm.objects('Despensa').filtered('id = $0', Number(uuid))[0]
    }

    console.log({ list })

    return await list
}

export async function changeQTD(data, action) {
    // let realm = await getRealm()

    let despensaLocal = realm.objects('Despensa').filtered('uuid = $0', data.item.despensaUuid)[0]
    let itemLocal = realm.objectForPrimaryKey('Item', data.item.uuid)

    realm.write(() => {
        if (action === 'add') {
            itemLocal.quantidade++
        }
        if (action === 'remove') {
            itemLocal.quantidade--
        }
        despensaLocal.fila = true
    })
    return despensaLocal
}

export async function addCompras(data, despensaLocal) {

    let itemLocal = realm.objectForPrimaryKey('ItemCompras', data.uuid)

    realm.write(() => {
        itemLocal.quantidade++
    })

    console.debug(itemLocal)
    console.debug(itemLocal.uuid)
    console.debug(itemLocal.provimento.nome)
    console.debug(itemLocal.quantidade)

    return itemLocal
}

async function getItemPerUuid(uuid) {
    // let realm = await getRealm()

    return await realm.objectForPrimaryKey('Item', uuid)
}

export async function deleteItem(item) {

    let itemLocal = await realm.objectForPrimaryKey('Item', item.uuid)

    console.debug(itemLocal.uuid)

    realm.write(() => {

        if (itemLocal) {
            itemLocal.deletedAt = new Date()
        }

    })

    return 'item'
}

async function saveProvimento(item) {
    // let realm = await getRealm()

    const provimentoLocal = {
        // uuid: uuid(),
        id: parseInt(item.provimento.id),
        nome: item.provimento.nome,
    }
    realm.write(async () => {
        await realm.create('Provimento', provimentoLocal, true)
    })

    return provimentoLocal
}


async function newProvimento(item) {
    // let realm = await getRealm()

    const provimentoLocal = {
        // uuid: uuid(),
        // id: parseInt(item.nome),
        nome: item.provimento.nome.trim(),
    }

    return await realm.create('Provimento', provimentoLocal, true)


    return provimentoLocal

}

export async function removeDespensa(despensa) {
    // let realm = await getRealm()

    let despensaLocal = await realm.objectForPrimaryKey('Despensa', despensa.uuid)

    realm.write(() => {
        despensaLocal.deletedAt = new Date()

        if (despensaLocal.id) {
            despensaLocal.fila = true
        }
    })

    return despensa

}

export async function editDespensa(despensa) {
    // let realm = await getRealm()

    let despensaLocal = await realm.objectForPrimaryKey('Despensa', despensa.uuid)

    realm.write(() => {
        despensaLocal.nome = despensa.nome
        despensaLocal.descricao = despensa.descricao
        despensaLocal.fila = true
    })

    return despensaLocal
}

export async function editItem(item, despensaUuid) {

    console.log({ item })

    // let realm = await getRealm()

    let itemLocal = realm.objectForPrimaryKey('Item', item.uuid)
    let despensaLocal = realm.objectForPrimaryKey('Despensa', despensaUuid)

    console.log(itemLocal.provimento.nome)
    console.log(item.nome)

    try {
        realm.write(async () => {

            itemLocal.quantidade = parseInt(item.quantidade)
            itemLocal.validade = item.validade
            if (item.nome !== itemLocal.provimento.nome) {
                // realm.delete(itemLocal.provimento)
                let provimentoLocal = realm.objects('Provimento').filtered('nome = $0', item.nome)[0]
                if (!provimentoLocal) {
                    provimentoLocal = newProvimento(item)
                }
                itemLocal.provimento = provimentoLocal
            }
            despensaLocal.fila = true
        })

    } catch (error) {
        console.log('error')
        console.log('error', error)
    }

    return await {
        despensaLocal,
        itemLocal
    }
}

export async function newItemCompras(item, despensaUuid, quantidade) {


    // let realm = await getRealm()
    let today = new Date()
    let despensaLocal = realm.objects('Despensa').filtered('uuid = $0', despensaUuid)[0]
    let provimentoLocal = realm.objects('Provimento').filtered('nome = $0', item)[0]

    if (!provimentoLocal) {
        provimentoLocal = {
            nome: item.trim()
        }
    }

    const attrs = {
        uuid: uuid(),
        // id: parseInt(item.id),
        despensaUuid: despensaLocal.uuid,
        quantidade: quantidade || 1,
        provimento: provimentoLocal,
        dataAlteracao: today,
        done: false
    }

    realm.write(async () => {
        await despensaLocal.compras.push(attrs)
    })

    console.debug({ attrs })

    return {
        despensaLocal,
        attrs
    }

}


export async function newItem(item, despensaUuid) {
    // let realm = await getRealm()

    let today = new Date()
    let despensaLocal = realm.objects('Despensa').filtered('uuid = $0', despensaUuid)[0]
    let provimentoLocal = realm.objects('Provimento').filtered('nome = $0', item.nome)[0]

    if (!provimentoLocal) {
        provimentoLocal = {
            nome: item.nome.trim()
        }
    }

    const attrs = {
        uuid: uuid(),
        // id: parseInt(item.id),
        despensaUuid: despensaLocal.uuid,
        quantidade: Number(item.quantidade) || 1,
        validade: item.validade && item.validade,
        provimento: provimentoLocal,
        dataAlteracao: today
    }

    realm.write(async () => {
        despensaLocal.fila = true
        await despensaLocal.items.push(attrs)
    })

    return {
        despensaLocal,
        attrs
    }

}

async function saveItem(item, provimentoLocal, today, despensaLocal, itemLocal) {
    
    try {
        
        console.log({ itemLocal })
        console.debug(item, today)
    
        const attrs = await {
            uuid: itemLocal ? itemLocal.uuid : uuid(),
            id: item.id && parseInt(item.id),
            despensaUuid: despensaLocal.uuid,
            quantidade: item.quantidade || 1,
            validade: item.validade && item.validade,
            provimento: provimentoLocal,
            dataAlteracao: item.dataAlteracao || new Date()
        }
    
        console.log({ attrs })
    
        if (!itemLocal) {
            realm.write(async () => {
                // let saveItem = realm.create('Item', attrs, true)
                console.debug('List Despensa')
                console.debug(JSON.stringify(despensaLocal))
                await despensaLocal.items.push(attrs)
            })
        } else {
            realm.write(() => {
                itemLocal.id = item.id && Number(item.id),
                itemLocal.validade = item.validade && item.validade,
                itemLocal.quantidade = item.quantidade //+ itemLocal.quantidade
            })
        }
    
        // if (!itemLocal) {
        //     return await attrs
        // }
    
        return await itemLocal
    } catch (error) {
        console.log({error})   
        console.error(`Erro em salvar item: ${item.provimento.nome}`)   
    }

}

export async function saveDespensa(despensa, local) {
    // let realm = await getRealm()
    let despensaLocal

    console.log(despensa.nome)
    console.log(despensa.uuid)

    realm.write(async () => {
        despensaLocal = realm.create('Despensa', {
            uuid: despensa.uuid || uuid(),
            id: despensa.id && parseInt(despensa.id),
            nome: despensa.nome,
            descricao: despensa.descricao,
            fila: local || false
        }, true)
    })

    return await despensaLocal

}


export async function removeAll() {
    // let realm = await getRealm()

    realm.write(() => {
        return realm.deleteAll()
    })
}
export async function removeDespensas() {
    // let realm = await getRealm()

    let despensasList = realm.objects('Despensa')

    realm.write(() => {
        console.debug(despensasList.length)
        realm.delete(despensasList)
    })

    return true
}

export async function storeDespensas(despensas) {
    // let realm = await getRealm()
    let listdespensa = []

    let del // = false
    // del = true  


    // console.debug(del)

    try {
        if (del) {
            realm.write(() => {
                realm.deleteAll()
            })
        } else {

            despensas.map(async (despensa) => {


                let despensaLocal = await realm.objects('Despensa').filtered('uuid = $0 or id = $1', despensa.uuid, Number(despensa.id))[0]

                console.log('despensa?')
                console.log(despensaLocal)
                // console.log(despensaLocal.nome)

                if (!despensaLocal) {
                    despensaLocal = await saveDespensa(despensa)
                } else {
                    realm.write(() => {
                        if (!despensaLocal.uuid) {
                            despensaLocal.uuid = despensa.uuid
                        }
                        if (!despensaLocal.id) {
                            despensaLocal.id = Number(despensa.id)
                        }
                        despensaLocal.nome = despensa.nome

                        despensaLocal.descricao = despensa.descricao
                        despensaLocal.fila = false
                    })
                }

                despensa.items.forEach(async (item) => {

                    let provimentoLocal = await realm.objects('Provimento').filtered('id = $0 OR nome = $1', parseInt(item.provimento.id), item.provimento.nome)[0]
                    let itemLocal = await realm.objects('Item').filtered('id = $0 or uuid = $1', parseInt(item.id), item.uuid)[0]

                    if (!provimentoLocal) {
                        provimentoLocal = await saveProvimento(item)
                    }

                    const today = new Date()

                    console.log('itemLocal?', item.uuid)
                    console.log(itemLocal)

                    itemLocal = await saveItem(item, provimentoLocal, today, despensaLocal, itemLocal)

                    // console.warn({ itemLocal })
                    // console.debug(itemLocal, newItem)

                    // if (newItem) {
                    //     realm.write(async () => {
                    //         console.debug('List Despensa')
                    //         console.debug(JSON.stringify(despensaLocal))
                    //             despensaLocal.items.push(itemLocal)
                    //         console.debug(JSON.stringify(despensaLocal))
                    //     })
                    // }

                })
                listdespensa.push(despensaLocal)
                // realm.write(() => {
                //     despensaLocal.items.push(items)
                // })
                // return await despensaLocal
            })
            // return await despensasList
            return listdespensa
        }

    } catch (e) {
        console.log('erro', e)
        console.log('erro', e.message)
    }
}



