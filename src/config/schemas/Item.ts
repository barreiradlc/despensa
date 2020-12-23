export default {
    name: 'Item',
    primaryKey: 'uuid',
    properties: {
        id: 'string?',
        uuid: 'string',
        quantity: 'int',
        expiresAt: 'date?',
        provision: 'Provision',
        updatedAt: 'date?',
        deletedAt: 'date?',
        fila: { type: 'bool?', default: false } //{type: 'int', default: 0},
    }
}
