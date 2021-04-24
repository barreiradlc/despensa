import { createConfigItem } from "@babel/core"
import { UniqueDirectivesPerLocationRule } from "graphql"
import realm from "../../../config/realmConfig/realm"
// import { v4 as uuidv4 } from 'uuid';
import getUuid from 'react-native-uuid';
import { PantryInterface } from "../../../config/realmConfig/schemas/Pantry";
import { ProvisionInterface } from "../../../config/realmConfig/schemas/Provision";
import { ItemInterface } from "../../../config/realmConfig/schemas/Item";

export interface Item {
    uuid: string;
    id?: string;
}

export interface User { }

export interface CreatePantryDTO {
    _id?: string;
    uuid?: string;
    name: string;
    description: string;
    queue: boolean
}

export interface CreateItemDTO {
    _id?: string;
    uuid?: string;
    quantity: number;
    queue: boolean;
    provision: ProvisionInterface
}

export interface FindOrCreateProvisionDTO {
    _id: string;
    name: string
}

export interface Pantry {
    uuid: string;
    _id: string;
    name: string;
    description: string;
    items: Item[];
    users: User[];
    queue: boolean
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export async function storePantries(pantries: Pantry[]) {

    // console.log({ pantries })

    // for (let pantry of pantries) {
    for (let pantry of pantries) {
        const { uuid, _id } = pantry
        const localpantry = realm.objects<Pantry[]>('Pantry').filtered('uuid = $0 or _id = $1', uuid, _id)[0]


        if (!!localpantry) {
            updateLocalPantry(pantry)
        } else {
            createLocalPantry(pantry)
        }


        console.log({ items: pantry.items })

        for (let item of pantry.items) {
            const localItem = realm.objects<Item>('Item').filtered('uuid = $0 or _id = $1', item.uuid, item._id)[0]

            console.log({ item })
            console.log({ localItem })

            if (!!localItem) {
                // return createLocalItem(item)
            } else {
                // return updateLocalItem(item)                
            }
        }
    }

}


export async function updateLocalPantry(pantry: Pantry) {
    const { uuid, _id } = pantry
    try {
        const localpantry = await realm.objects<Pantry>('Pantry').filtered('uuid = $0 or _id = $1', uuid, _id)[0]
        realm.write(() => {
            localpantry.name = pantry.name
            localpantry.description = pantry.description
        })
    } catch (error) {
        console.error(`Error while updating pantry ${error}`)
    }
}

export function createLocalPantry(pantry: Pantry | CreatePantryDTO) {
    try {
        const { _id, name, description, queue = false } = pantry

        // console.log({createLocalPantry})

        realm.write(async () => {
            await realm.create('Pantry', {
                uuid: getUuid.v4(),
                _id,
                name,
                description,
                queue
            })
        })
    } catch (error) {
        console.error(`Error while updating pantry ${error}`)
    }
}

export async function editLocalPantry(pantry: Pantry | CreatePantryDTO) {
    try {
        const { uuid, _id, name, description, queue = false } = pantry

        let localpantry = await realm.objects<PantryInterface>('Pantry').filtered('uuid = $0', uuid)[0]

        realm.write(async () => {
            localpantry.name = name
            localpantry.description = description
            localpantry._id = _id
            localpantry.queue = queue
        })
    } catch (error) {
        console.error(`Error while updating pantry ${error}`)
    }
}


export async function getLocalProvision({ name, _id }: ProvisionInterface) {
    try {
        let localProvision

        if (name) {
            localProvision = await realm.objects<ProvisionInterface>('Provision').filtered('name = $0', name)[0]
        } else if (_id) {
            localProvision = await realm.objects<ProvisionInterface>('Provision').filtered('_id = $0', _id)[0]
        } else {
            throw new Error(`No data provided`)
        }

        console.log(localProvision)

        if (!!localProvision) return localProvision;

        console.log("new localProvision")

        realm.write(async () => {
            const newProvision = await realm.create('Provision', {
                name,
                _id
            })

            console.log({ newProvision })
            return newProvision
        })
    } catch (error) {
        throw new Error(`Error while fetching provision ${error}`)
    }
}

export async function createLocalItem(item: ItemInterface | CreateItemDTO, uuidPantry: string) {
    let localpantry = await realm.objects<PantryInterface>('Pantry').filtered('uuid = $0', uuidPantry)[0]

    try {
        realm.write(() => {
            const newItem = realm.create<ItemInterface>('Item', {
                ...item,
                uuid: String(getUuid.v4()),
                quantity: Number(item.quantity),
            })

            localpantry.items.push(newItem)

        })
    } catch (error) {
        throw new Error(`Error while creating item ${error}`)
    }

}

export async function updateLocalItem(item: ItemInterface | CreateItemDTO) {
    let localItem = await realm.objects<ItemInterface>('Item').filtered('uuid = $0', item.uuid)[0]

    console.log(item)
    console.log(item.uuid)
    console.log({ localItem })

    const { provision, quantity } = item

    try {
        realm.write(() => {
            localItem.provision = provision
            localItem.quantity = quantity
        })
    } catch (error) {
        throw new Error(`Error while updating item ${error}`)
    }

}

export async function findPantryByUuid(uuid: string) {
    return await realm.objects<PantryInterface>('Pantry').filtered('uuid = $0', uuid)[0]
}

export async function findItemPantryByUuid(uuid: string) {
    return await realm.objects<ItemInterface>('Item').filtered('uuid = $0', uuid)[0]
}

export async function deletePantry(uuid: string) {
    let localpantry = await findPantryByUuid(uuid)

    realm.write(() => {
        realm.delete(localpantry)
    })
}

export async function deleteItemPantry(uuid: string) {
    let localItem = await findItemPantryByUuid(uuid)

    realm.write(() => {
        realm.delete(localItem)
    })
}

export async function getPantries() {
    const localPantries = await realm.objects<PantryInterface[]>('Pantry')
    return localPantries as unknown as PantryInterface[]
}