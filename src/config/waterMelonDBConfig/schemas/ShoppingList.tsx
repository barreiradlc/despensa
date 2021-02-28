export default {
    name: 'ShoppingList',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        name: 'string',
        pantryUuid: 'string',
        done: { type: 'bool?', default: false },
        createdAt: 'date',
        updatedAt: 'date',
        deletedAt: 'date?',
        items: 'ShoppingItem[]'
    }
}

