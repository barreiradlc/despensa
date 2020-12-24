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
        realm.write(async() => {
            await pantries.map(async (pantry: PantryInterface) => {                
                let savedPantry = realm.objects('Pantry').filtered('id = $0', String(pantry.id))[0]
                
                if (savedPantry) {
                    // savedPantry.id = pantry.id
                    savedPantry.name = pantry.name
                    savedPantry.description = pantry.description
                    savedPantry.items = itemsData

                    return savedPantry
                } else {
                    savedPantry = await realm.create('Pantry', {
                        id: pantry.id,
                        uuid: uuidv4(),
                        name: pantry.name,
                        description: pantry.description,
                        items: itemsData
                    })
                }



                const itemsData = await pantry.items?.map(async (item: ItemInterface) => {

                    const provision = await getProvision(item.provision)
                    
                    const itemData = {
                        id: item.id,
                        uuid: uuidv4(),
                        quantity: item.quanntity || 1,
                        provision: provision
                    }                

                    const savedItem = await realm.objects('Item').filtered('id = $0',item.id)[0]

                    if (savedItem) {
                        // savedItem.id = item.id
                        // savedItem.uuid = !savedItem.uuid ? savedItem.uuid : uuidv4()
                        savedItem.quantity = item.quanntity || 1
                        savedItem.provision = provision
                        savedItem.updatedAt = item.updatedAt
                        
                        return savedItem
                    }                

                    const newItem = await realm.create('Item', Promise.resolve(itemData))

                    return newItem
                })

                // Promise.all(itemsData)

                console.log("pantry")
                console.log(itemsData)

                
            })
        })
    } catch (error) {
        console.log({ error })
        throw new Error("Error saving patries");

    }

    return;
}