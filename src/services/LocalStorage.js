import Realm from 'realm'
import { uuid } from '../components/utils/Utils'
import realm from '../config/realm'

export async function getQueueDespensa() {
    let list = await realm.objects('Despensa').filtered('deletedAt = $0 AND fila = $1', null, true)
    // let realm = await getRealm()    
    realm.write(async( ) => {
        list = list && list.map(( despensa ) => {

            console.debug({despensa:despensa.items})

            let validItems = []
    
            despensa.items && despensa.items.map(( i ) => {
                if(i.dataExclusao !== null){
                    validItems.push(i)
                }
            })

            console.debug({validItems})
        
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

async function getItemPerUuid(uuid) {
    // let realm = await getRealm()

    return await realm.objectForPrimaryKey('Item', uuid)
}

export async function deleteItem(item) {

    let itemLocal = await realm.objectForPrimaryKey('Item', item.uuid)
    
    console.debug(itemLocal.uuid)

    realm.write(() => {
    
        if(itemLocal){
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
        nome: item.nome.trim(),
    }
    realm.write(async () => {
        return await realm.create('Provimento', provimentoLocal, true)
    })

    return provimentoLocal

}

export async function removeDespensa(despensa) {
    // let realm = await getRealm()

    let despensaLocal = await realm.objectForPrimaryKey('Despensa', despensa.uuid)

    realm.write(() => {
        despensaLocal.deletedAt = new Date()
    })

    return despensa

}

export async function editDespensa(despensa) {
    // let realm = await getRealm()

    let despensaLocal = await realm.objectForPrimaryKey('Despensa', despensa.uuid)

    realm.write(() => {
        despensaLocal.nome = despensa.nome
        despensaLocal.despensa = despensa.despensa
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
                    provimentoLocal = await newProvimento(item)
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
        quantidade: parseInt(item.quantidade) || 1,
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
    // let realm = await getRealm()

    console.log({ itemLocal })
    console.debug(item, today)
    
    const attrs = await {
        uuid: itemLocal ? itemLocal.uuid : uuid(),
        id: parseInt(item.id),
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
            realm.write(async () => {
            itemLocal.id = Number(item.id),
            itemLocal.validade = item.validade,
            itemLocal.quantidade = item.quantidade
        })
    }

    // if (!itemLocal) {
    //     return await attrs
    // }

    return await itemLocal

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

                console.log('despensa?')
                console.log(despensa.nome)

                let despensaLocal = await realm.objects('Despensa').filtered('uuid = $0 or id = $1', despensa.uuid, Number(despensa.id))[0]

                if (!despensaLocal) {
                    despensaLocal = await saveDespensa(despensa)
                } else {
                    realm.write(() => {
                        if(!despensaLocal.uuid){
                            despensaLocal.uuid = despensa.uuid
                        }
                        if(!despensaLocal.id){
                            despensaLocal.id = Number(despensa.id)
                        }
                        despensaLocal.nome = despensa.nome
                        
                        despensaLocal.descricao = despensa.descricao
                        despensaLocal.fila = false
                    })
                }

                despensa.items.forEach(async (item) => {

                    let provimentoLocal = await realm.objects('Provimento').filtered('id = $0', parseInt(item.provimento.id))[0]
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

// async function createDespensa(item, despensaLocal) {
//     let realm = await realm()

//     console.debug('item')
//     console.debug(item)
//     console.debug('item')

//     if (item.provimento) {
//         if (item.provimento.id) {

//             let provimentoLocal = await realm.objects('Provimento').filtered('id = $0', parseInt(item.provimento.id))[0]
//             console.log({ itemsProvimentos: item })
//             let itemLocal = await realm.objects('Item').filtered('id = $0', parseInt(item.id))

//             if (!provimentoLocal) {

//                 provimentoLocal = {
//                     uuid: uuid(),
//                     id: parseInt(item.provimento.id),
//                     nome: item.provimento.nome,
//                 }


//                 console.debug('item.id')
//                 console.debug(item)
//                 console.debug('item.id')


//             }

//             if (!itemLocal) {

//                 realm.write(async () => {
//                     itemLocal = await realm.create('Item', {
//                         uuid: uuid(),
//                         id: parseInt(item.id),
//                         quantidade: item.quantidade,
//                         validade: item.validade,
//                         provimento: provimentoLocal
//                     })
//                     return itemLocal

//                 })
//             }
//             console.log('---------------')
//             console.debug(JSON.stringify(itemLocal))
//             console.debug(JSON.stringify(despensaLocal))
//             console.log('---------------')

//             return itemLocal

//                 // if(itemLocal.uuid){
//                 //     await despensaLocal.items.push(itemLocal)
//                 // }

//             })
//         }
//     }
// }


