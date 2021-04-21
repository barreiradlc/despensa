import { ItemInterface } from "./Item";

export default {
    name: 'Pantry',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        _id: 'string?',
        name: 'string?',
        description: 'string?',
        items: 'Item[]',
        createdAt: 'date?',
        updatedAt: 'date?',
        deletedAt: 'date?',
        queue: { type: 'bool?', default: false }, //{type: 'int', default: 0},
        thumbnail: 'string?',
    }
}

export interface PantryInterface {
    uuid: string;
    _id?: string;
    name: string;
    description: string;
    items: ItemInterface[]; // Item
    users: any[]; // User
    queue: boolean
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
