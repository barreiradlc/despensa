import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import realm from '../../config/realm';
import { CreateConfigItemOptions } from '@babel/core';

export default interface ProvisionInterface {
    id: string;
    name: string;
    createdAt?: Date
    updatedAt?: Date
}

export default interface ItemInterface {
    id: string;
    provision: ProvisionInterface;
    quantity?: number;
    expiresAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

interface PantryInterface {
    id?: string;
    name: string;
    description?: string;
    items?: ItemInterface[];
}

export async function getProvision(provision: ProvisionInterface): Promise<ProvisionInterface> {
    realm.write(() => {
        try {
            const { id, name } = provision

            const savedProvision = realm.objectForPrimaryKey('Provision', id)

            if (!savedProvision) {
                return realm.create('Provision', {
                    id,
                    name
                })
            }

            return savedProvision
        } catch (error) {

        }
    })
}
export async function getItem(item: ItemInterface, provision: ProvisionInterface) {
    realm.write(async() => {
        try {
            const savedItem = await realm.objects('Item').filtered('id = $0', item.id)[0]

            if (savedItem) {
                // savedItem.id = item.id
                // savedItem.uuid = !savedItem.uuid ? savedItem.uuid : uuidv4()
                savedItem.quantity = item.quanntity || 1
                savedItem.provision = provision
                savedItem.updatedAt = item.updatedAt

                return savedItem
            }

            const newItem = await realm.create('Item', {
                id: item.id,
                uuid: uuidv4(),
                quantity: item.quanntity || 1,
                provision: provision
            })

            return newItem
        } catch (error) {

        }
    })
}

export async function getPantry(pantry: PantryInterface, itemsData: ItemInterface[]) {
    realm.write(async() => {

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

            if (itemsData) {
                itemsData.map(( savedItem  => {
                    savedPantry.items.push(savedItem)
                }))
            }

            return savedPantry
        } catch (error) {

        }

    })
}

export async function storePantries(pantries: PantryInterface[]) {

    // return console.log(JSON.stringify(pantries))
    try {
        pantries.map(async (pantry: PantryInterface) => {

            const itemsData = await pantry.items?.map(async (item: ItemInterface) => {

                const provision = await getProvision(item.provision)

                let savedItem = await getItem(item, provision)
                // console.log("item")                    
                // console.log(provision)                    
                // console.log(savedItem)                    

                return savedItem
            })

            let savedPantry = await getPantry(pantry, itemsData)

            return savedPantry
            console.log("pantry")
            
            // itemsData?.map(( itemData ) => {
            //     savedPantry.items.push(itemData)
            // })
            console.log(savedPantry)

            // if (itemsData) {
            //     savedPantry.items = itemsData
            // }
        })
    } catch (error) {
        console.log({ error })
        throw new Error("Error saving patries");

    }

    return;
}