import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import realm from '../../config/realmConfig/realm';
import { CreateConfigItemOptions } from '@babel/core';

export interface ProvisionInterface {
    id: string;
    name: string;
    createdAt?: Date
    updatedAt?: Date
}

export interface ItemInterface {
    id: string;
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
    name: string;
    description?: string;
    items?: ItemInterface[];
}

export async function getProvision(provision: ProvisionInterface): Promise<ProvisionInterface> {
    const { id, name } = provision

    console.log({name, id})

    let savedProvision
    if(name){
        savedProvision = await realm.objects<ProvisionInterface>('Provision').filtered('name = $0', name)[0]    
    } else if(id){
        savedProvision = await realm.objects<ProvisionInterface>('Provision').filtered('id = $0', id)[0]
    }

    console.log({savedProvision})

    if (!savedProvision) {
        realm.write(async () => {
            return realm.create<ProvisionInterface>('Provision', {
                id,
                name
            })
        })
    }
    return savedProvision
}

export async function getItem(item: ItemInterface, provision: ProvisionInterface) {
    let savedItem = await realm.objects('Item').filtered('id = $0 or uuid = $1', item.id, item.uuid)[0]

    // console.log("savedItem")
    // console.log(savedItem)

    realm.write(async () => {
        if (savedItem) {
            // savedItem.id = item.id
            // savedItem.uuid = !savedItem.uuid ? savedItem.uuid : uuidv4()
            savedItem.quantity = Number(item.quantity) || 1
            savedItem.provision = provision
            savedItem.updatedAt = item.updatedAt

            return savedItem
        } else {
            savedItem = await realm.create('Item', {
                id: item.id,
                uuid: uuidv4(),
                quantity: Number(item.quantity) || 1,
                provision: provision
            })
        }
    })

    // console.log("createdItem")
    // console.log({ savedItem })

    return savedItem
}


export async function getPantry(pantry: PantryInterface) {
    realm.write(async () => {

        try {
            let savedPantry = realm.objects('Pantry').filtered('id = $0', String(pantry.id))[0]

            if (savedPantry) {
                // savedPantry.id = pantry.id
                savedPantry.name = pantry.name
                savedPantry.description = pantry.description

            } else {
                savedPantry = realm.create('Pantry', {
                    id: pantry.id,
                    uuid: uuidv4(),
                    name: pantry.name,
                    description: pantry.description,
                })
            }

            pantry.items?.map(async (item: ItemInterface) => {

                const provision = await getProvision(item.provision)

                let savedItem = await getItem(item, provision)
                

                let itemAdded = savedPantry.items.filter(i => i.id === item.id)[0]

                if (!itemAdded) {
                    realm.write(() => {
                        savedPantry.items.push(savedItem)
                    })
                }

                return savedItem
            })

            // console.log("p items")
            // console.log(JSON.stringify(savedPantry.items))

            return savedPantry
        } catch (error) {
            throw new Error("Error saving pantries");

        }

    })
}

export async function storePantries(pantries: PantryInterface[]) {

    // console.log(JSON.stringify(pantries))

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
    return realm.objects('Pantry')
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

            if(!id){
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
            const item = realm.objects('Item').filtered('uuid = $0', uuid)[0]
            const pantry = realm.objects('Pantry').filtered('uuid = $0', itemUuid)[0]
            
            item.queue = true
            pantry.queue = true
            
        } catch (error) {
            throw new Error("Error saving queue edits");         
        }   
    })
    
}

export async function getQueuedPantries() {
    const pantries = await realm.objects('Pantry').filtered('queue = $0', true)
    return pantries.map(( pantry: PantryInterface ) => {
        const items = pantry.items?.filter((item: ItemInterface) => item.queue === true)
        return {
            ...pantries,
            items
        }
    })
}