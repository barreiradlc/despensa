import { createConfigItem } from "@babel/core"
import { UniqueDirectivesPerLocationRule } from "graphql"
import realm from "../../../config/realmConfig/realm"
// import { v4 as uuidv4 } from 'uuid';
import getUuid from 'react-native-uuid';
import { PantryInterface } from "../../../config/realmConfig/schemas/Pantry";
import { ProvisionInterface } from "../../../config/realmConfig/schemas/Provision";

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

export async function getPantries() {
    const localPantries = await realm.objects<Pantry[]>('Pantry')
    return localPantries as unknown as Pantry[]
}