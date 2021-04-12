import { createConfigItem } from "@babel/core"
import { UniqueDirectivesPerLocationRule } from "graphql"
import realm from "../../../config/realmConfig/realm"
// import { v4 as uuidv4 } from 'uuid';
import getUuid from 'react-native-uuid';


export interface Item {
    uuid: string;
    id?: string;
}

export interface User { }

export interface Pantry {
    uuid: string;
    _id: string;
    name: string;
    description: string;
    items: Item[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export async function storePantries(pantries: Pantry[]) {    

    console.log({ pantries })

    // for (let pantry of pantries) {
    pantries.map(( pantry) => {
        const { uuid, _id } = pantry
        const localpantry = realm.objects<Pantry[]>('Pantry').filtered('uuid = $0 or _id = $1', uuid, _id)[0]

        console.log({ localpantry })

        if (!!localpantry) {
            updateLocalPantry(pantry)
        } else {
            createLocalPantry(pantry)
        }

        // for (let item of pantry.items) {
        //     const localItem = realm.objects<Item>('Item').filtered('uuid = $0 or id = $1', item.uuid, item.id)[0]

        //     if (!!localItem) {
        //         // return createLocalItem(item)
        //     } else {
        //         // return updateLocalItem(item)                
        //     }
        // }
    })

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

export function createLocalPantry(pantry: Pantry) {
    try {
        const { _id, name, description } = pantry
        
        realm.write(async () => {
            await realm.create('Pantry', {
                uuid: getUuid.v4(),
                _id,
                name,
                description
            })
        })
    } catch (error) {        
        console.error(`Error while updating pantry ${error}`)
    }
}

export async function getPantries() {
    const localPantries = await realm.objects<Pantry[]>('Pantry')
    return localPantries as unknown as Pantry[]
}