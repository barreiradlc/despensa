import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import realm from '../../config/realmConfig/realm';
import { CreateConfigItemOptions } from '@babel/core';

export interface ProvisionInterface {
    id?: string;
    name: string;
    createdAt?: Date
    updatedAt?: Date
}

export interface ItemInterface {
    queue: boolean;
    id?: string;
    uuid?: string;
    provision: ProvisionInterface;
    quantity: number;
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface PantryInterface {
    id?: string;
    uuid?: string;
    queue?: boolean;
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    items?: ItemInterface[];
}

export interface ShoppingListInterface {
    pantryUuid: string;
    uuid?: string;
    name: string;
    done?: boolean;
    items: ShoppingItemInterface[];
    createdAt?: Date;
    updatedAt?: Date;
}


export interface ShoppingItemInterface {
    uuid?: string;
    provision: ProvisionInterface;
    quantity: number;
    done?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}


export async function getProvision(provision: ProvisionInterface): Promise<ProvisionInterface> {
    const { id, name } = provision

    console.log({ name, id })

    let savedProvision
    if (name) {
        savedProvision = await realm.objects<ProvisionInterface>('Provision').filtered('name = $0', name)[0]
    } else if (id) {
        savedProvision = await realm.objects<ProvisionInterface>('Provision').filtered('id = $0', id)[0]
    }

    console.log({ savedProvision })

    if (savedProvision) {
        return savedProvision
    }

    realm.write(async () => {
        return await realm.create<ProvisionInterface>('Provision', {
            id,
            name
        })
    })
}

export async function getItem(item: ItemInterface, provision: ProvisionInterface) {
    const { id, uuid } = item
    let savedItem

    if (id) {
        savedItem = await realm.objects('Item').filtered('id = $0', item.id)[0]
    } else if (uuid) {
        savedItem = await realm.objects('Item').filtered('uuid = $0', item.uuid)[0]
    }

    realm.write(() => {

        console.log("savedItem")
        console.log(savedItem)

        if (savedItem) {
            // savedItem.id = item.id
            // savedItem.uuid = !savedItem.uuid ? savedItem.uuid : uuidv4()
            savedItem.queue = false
            savedItem.quantity = Number(item.quantity) || 1
            savedItem.provision = provision
            savedItem.updatedAt = item.updatedAt

            // return savedItem
        } else {

            savedItem = realm.create('Item', {
                id: item.id,
                uuid: uuidv4(),
                quantity: Number(item.quantity) || 1,
                // queue: false,
                provision: provision
            })
        }
    })

    Promise.resolve(savedItem)

    console.log("createdItem")
    console.log({ savedItem })

    return savedItem
}

export async function getShoppingItem(item: ShoppingItemInterface, provision: ProvisionInterface) {
    const { uuid } = item
    let savedItem: ShoppingItemInterface

    if (uuid) {
        savedItem = await realm.objects<ShoppingItemInterface>('ShoppingItem').filtered('uuid = $0', item.uuid)[0]
    }

    realm.write(() => {

        console.log("savedItem")
        console.log(savedItem)

        if (savedItem) {
            savedItem.done = false
            savedItem.quantity = Number(item.quantity) || 1
            savedItem.provision = provision
            savedItem.updatedAt = new Date()
        } else {

            savedItem = realm.create<ShoppingItemInterface>('ShoppingItem', {
                uuid: uuidv4(),
                quantity: Number(item.quantity) || 1,
                provision: provision
                // queue: false,
            })
        }
    })

    Promise.resolve(savedItem)

    console.log("createdItem")
    console.log({ savedItem })

    return savedItem
}


export async function getPantry(pantry: PantryInterface, local = false) {

    const { id, uuid } = pantry

    let savedPantry
    if (uuid) {
        savedPantry = realm.objects('Pantry').filtered('uuid = $0', String(uuid))[0]
    } else if (id) {
        savedPantry = realm.objects('Pantry').filtered('id = $0', String(id))[0]
    }

    realm.write(async () => {

        try {

            if (pantry.deletedAt) {
                savedPantry && realm.delete(savedPantry)
                return
            };


            if (savedPantry) {
                // savedPantry.id = pantry.id
                // console.log(pantry.items)
                // console.log(local)


                savedPantry.id = id
                // savedPantry.uuid = uuid
                savedPantry.queue = local
                savedPantry.name = pantry.name
                savedPantry.description = pantry.description
                savedPantry.createdAt = pantry.createdAt
                savedPantry.updatedAt = pantry.updatedAt

            } else {
                savedPantry = realm.create('Pantry', {
                    queue: local,
                    id: pantry.id,
                    uuid: uuidv4(),
                    name: pantry.name,
                    description: pantry.description,
                    createdAt: pantry.createdAt,
                    updatedAt: pantry.updatedAt,
                })
            }


            pantry.items?.map(async (item: ItemInterface) => {
                const provision = await getProvision(item.provision)

                getItem(item, provision)
                    .then(async (savedItem) => {
                        console.log("savedItem")
                        console.log(savedItem)

                        let itemAdded = await savedPantry.items.filter(async (i) => i.id === savedItem.id)[0]

                        if (!itemAdded) {
                            Promise.resolve(savedItem)
                            console.log("savedItem")
                            console.log({ savedItem })

                            realm.write(() => {
                                savedPantry.items.push(savedItem)
                            })
                        }

                        return savedItem
                    })
                    .catch((error) => {
                        throw new Error(`ERROR WHILE SAVING ITEM ${JSON.stringify(error)}`);
                    })
            })

            // console.log("p items")
            // console.log(JSON.stringify(savedPantry.items))

            return savedPantry
        } catch (error) {
            throw new Error(`Error saving pantry ${JSON.stringify(error)}`);

        }

    })
}

export async function storePantries(pantries: PantryInterface[]) {

    // const user = await AsyncStorage.getItem('@despensaJWT')
    console.log(JSON.stringify(pantries))
    // return realm.write(() => realm.deleteAll() ) 

    try {
        pantries.map(async (pantry: PantryInterface) => {

            let savedPantry = await getPantry(pantry)

            // itemsData.map(( savedItem  => {

            // let itemAdded = savedPantry.items.filter(i => i.id === savedItem.id)[0]
            // if(!itemAdded){
            // savedPantry.items.push(savedItem)
            // }
            // }))

            // console.log("pantry")

            // itemsData?.map(( itemData ) => {
            //     savedPantry.items.push(itemData)
            // })

            // if (itemsData) {
            //     savedPantry.items = itemsData
            // }

            return savedPantry
        })
    } catch (error) {
        console.log({ error })
        throw new Error("Error saving patries");

    }

    return;
}

export async function getPantries() {
    return realm.objects<PantryInterface[]>('Pantry')
}

export async function getShoppingList(uuid: string) {
    return realm.objectForPrimaryKey<ShoppingListInterface[]>('ShoppingList', uuid)
}

export async function getShoppingsList() {
    return realm.objects<ShoppingListInterface[]>('ShoppingList')
}

export async function getPantryByUuid(uuid) {
    return await realm.objects('Pantry').filtered('uuid = $0', uuid)[0]
}

export async function moreQuantity(uuid: string) {
    realm.write(() => {
        try {
            const item = realm.objects('Item').filtered('uuid = $0', uuid)[0]
            item.quantity = item.quantity + 1
        } catch (error) {
            throw new Error(`Error adding quantity: ${JSON.stringify(error)}`);
        }
    })
}

export async function minusQuantity(uuid: string) {
    realm.write(() => {
        try {
            const item = realm.objects('Item').filtered('uuid = $0', uuid)[0]
            item.quantity = item.quantity - 1
        } catch (error) {
            throw new Error(`Error adding quantity: ${JSON.stringify(error)}`);
        }
    })
}

export async function saveProvision(uuid: string) {

}

export async function deleteItem(uuid: string, id: string) {
    realm.write(() => {
        try {
            const item = realm.objects('Item').filtered('uuid = $0 or id = $1', uuid, id)[0]

            if (!id) {
                realm.delete(item)
            } else {
                item.deletedAt = new Date()
            }
        } catch (error) {

        }
    })
}

export async function pushPantry(uuid: string, item: ItemInterface) {
    const pantry = realm.objects('Pantry').filtered('uuid = $0', uuid)[0]

    realm.write(() => {
        pantry?.items.push(item)

        item.queue = true
        pantry.queue = true
    })

    console.log(uuid)
    console.log(JSON.stringify(pantry))
}

export async function handlePantryQueue(uuid: string, itemUuid: string) {

    realm.write(() => {
        try {
            const item = realm.objects('Item').filtered('uuid = $0', itemUuid)[0]
            const pantry = realm.objects('Pantry').filtered('uuid = $0', uuid)[0]

            item.queue = true
            pantry.queue = true

        } catch (error) {
            throw new Error("Error saving queue edits");
        }
    })

}

export async function deletePantry(uuid: string) {
    const pantry = await realm.objects('Pantry').filtered('uuid = $0', uuid)[0]
    realm.write(() => {
        if (!pantry.id) {
            realm.delete(pantry)
        } else {
            pantry.queue = true
            pantry.deletedAt = new Date
        }
    })
}

export async function getQueuedPantries() {
    const pantries = await realm.objects('Pantry').filtered('queue = $0', true)
    return pantries.map((pantry: PantryInterface) => {
        const items = pantry.items?.filter((item: ItemInterface) => item.queue === true)
        return {
            ...pantries,
            items
        }
    })
}

export async function deleteShoppingList(uuid: string) {
    const shoppingList = await realm.objects('ShoppingList').filtered('uuid = $0', uuid)[0]
    realm.write(() => {
        realm.delete(shoppingList)
    })
}

export async function deleteShoppingItem(uuid: string) {
    const shoppingItem = await realm.objects('ShoppingItem').filtered('uuid = $0', uuid)[0]
    realm.write(() => {
        realm.delete(shoppingItem)
    })
}


export async function manageShoppingList(shoppingList: ShoppingListInterface) {
    try {

        if (shoppingList?.uuid) {
            console.log("UPDATE")
            const shoppingListSaved = await realm.objectForPrimaryKey<ShoppingListInterface>('ShoppingList', shoppingList?.uuid)


            if (shoppingListSaved) {
                console.log(shoppingList.name)
                console.log(shoppingListSaved.name)

                realm.write(async () => {
                    shoppingListSaved.name = shoppingList.name;
                    shoppingListSaved.pantryUuid = shoppingList.pantryUuid
                    shoppingListSaved.createdAt = new Date()
                    shoppingListSaved.updatedAt = new Date()
                    
                    console.log({ shoppingListSaved })

                })

                return shoppingListSaved
            } else {
                throw new Error("List not found");
            }

        } else {

            const attr = {
                pantryUuid: shoppingList.pantryUuid,
                name: shoppingList.name,
                uuid: uuidv4(),
                done: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
            console.log("NEW")
            console.log(attr)

            realm.write(async () => {
                const newshoppingList = await realm.create('ShoppingList', attr)                
            })


        }
    } catch (error) {
        console.error(error);
        throw new Error(`Error saving shopping list: ${JSON.stringify(error)}`);
    }

}

export async function pushShoppingList(shoppingList: ShoppingListInterface, item: ShoppingItemInterface) {
    realm.write(() => {
        try {
            shoppingList?.items.push(item)
        } catch (error) {
            throw new Error(`Error saving item ${JSON.stringify(error)}`);
        }
    })
}

export async function toggleDoneShoppingItem(uuid: string, value: boolean) {

    const item = await realm.objectForPrimaryKey<ShoppingItemInterface>('ShoppingItem', uuid)

    realm.write(() => {
        try {
            item.done = value
        } catch (error) {
            throw new Error(`Error toggling ShoppingItem ${JSON.stringify(error)}`);
        }
    })
    console.log({ item })
}

export async function editShoppingItem(item: ShoppingItemInterface) {
    realm.write(() => {
        
    })
}

export async function handleShoppingListsCheckout() {

    
     realm.objects<ShoppingListInterface>('ShoppingList')        
        .map(async( shoppingList: ShoppingListInterface ) => {
        
        if(!shoppingList.items.length){
            return
        }

        const pantry: PantryInterface = realm.objectForPrimaryKey<PantryInterface>('Pantry', shoppingList.pantryUuid)

        if(!pantry){
            realm.write(() => {
                return realm.delete(shoppingList)
            })
        }

        await shoppingList.items
            .filter(shoppingItem => shoppingItem.done)
            .map(async( item ) => {

                let savedItem: ItemInterface
                
                await pantry.items?.map(( i: ItemInterface ) => {

                    console.log("i")
                    console.log(i)

                    if(!i.provision){
                        return
                    }

                    if(i?.provision.name === item.provision.name || i.provision.id === item.provision.id){
                        savedItem = i
                    }

                    realm.write(() => {
                        if(!!savedItem){
                            savedItem.quantity = savedItem.quantity + i.quantity
                        } else {
                            // const newItem = getItem(item as ItemInterface, item.provision)                        
                            pantry.items?.push({
                                // id: item.id,
                                uuid: uuidv4(),
                                quantity: Number(item.quantity) || 1,
                                queue: false,
                                provision: item.provision
                            })                        
                        }
                        realm.delete(item)
                    })
                })
        })

        if(!shoppingList.items.length){
            realm.write(() => {
                realm.delete(shoppingList)
            })
        }
    })    
}

export async function handleShoppingListCheckout(shoppingListCheckout: ShoppingItemInterface[], pantryUuid: string) {
    const pantry = await realm.objectForPrimaryKey<PantryInterface>('Pantry', pantryUuid)

    if(pantry){
        shoppingListCheckout.map(async( itemCheckout: ShoppingItemInterface ) => {
            const itemSaved = await pantry.items?.find(( item ) => item.provision.name === itemCheckout.provision.name)
            realm.write(() => {
                try {
                    if(itemSaved){                    
                        itemSaved.queue = true
                        itemSaved.updatedAt = new Date()
                        itemSaved.quantity = itemSaved.quantity + itemCheckout.quantity                
                    } else {
                        const newItem = realm.create('Item', {                        
                            uuid: uuidv4(),
                            quantity: Number(itemCheckout.quantity) || 1,
                            queue: true,
                            provision: itemCheckout.provision
                        })
                        pantry.items?.push(newItem)
                    }
                    console.log({itemCheckout})
                    realm.delete(itemCheckout)
                } catch (error) {
                    console.error(error)
                    throw new Error("Error checking out items");                    
                }
            })
    
        })
    }
    // console.log(shoppingListCheckout)
}