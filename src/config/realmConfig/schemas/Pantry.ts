
export default {
    name: 'Pantry',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        id: 'string?',
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
