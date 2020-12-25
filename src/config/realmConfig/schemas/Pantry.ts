
export default {
    name: 'Pantry',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        id: 'string?',
        name: 'string?',
        description: 'string?',
        items: 'Item[]',
        compras: 'ItemCompras[]',
        deletedAt: 'date?',
        fila: { type: 'bool?', default: false }, //{type: 'int', default: 0},
        thumbnail: 'string?',
    }
}
