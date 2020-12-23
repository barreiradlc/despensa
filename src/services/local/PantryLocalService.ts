import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';
import realm from '../../config/realm';

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

export async function getProvision(provision: ProvisionInterface) {
    const { id, name } = provision

    const savedProvision = realm.objectForPrimaryKey('Provision', id)

    if (!savedProvision) {
        return realm.create('Provision', {
            id,
            name
        })
    }

    return savedProvision
}

export async function storePantries(pantries: PantryInterface[]) {

    // return console.log(JSON.stringify(pantries))

    try {
        realm.write(() => {
            pantries.map((pantry: PantryInterface) => {
                console.log("pantry")
                const pantryData = {
                    uuid: uuidv4(),
                    name: pantry.name,
                    description: pantry.description
                }

                const itemsData = pantry.items?.map(async (item: ItemInterface) => {
                    // console.log('item')
                    // console.log({ item })

                    const provision = getProvision(item.provision)

                    const itemData = {
                        id: item.id,
                        uuid: uuidv4(),
                        quantity: item.quanntity || 1,
                        provision
                    }

                    const savedItem = realm.objectForPrimaryKey('Item', item.id)

                    console.log("provision")
                    console.log({ itemData })


                    if (savedItem) {
                        savedItem.id = item.id
                        savedItem.uuid = uuidv4()
                        savedItem.quantity = item.quanntity || 1
                        savedItem.provision = provision
                        savedItem.updatedAt = item.updatedAt

                        return savedItem
                    }

                    return realm.create('Item', itemData)

                })

                const savedPantry = realm.objectForPrimaryKey('Pantry', String(pantry.id))


                if (savedPantry) {
                    savedPantry.id = pantry.id
                    savedPantry.name = pantry.name
                    savedPantry.description = pantry.description
                    savedPantry.items = itemsData

                    return savedPantry
                }

                return realm.create('Pantry', {
                    ...pantryData,
                    items: itemsData
                })

            })
        })
        // TODO -save pantries
        // TODO -save items
    } catch (error) {
        console.log({ error })
        throw new Error("Error saving patries");

    }

    return;
}