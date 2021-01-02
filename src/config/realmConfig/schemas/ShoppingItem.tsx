export default {
    name: 'ShoppingItem',
    primaryKey: 'uuid',
    properties: {        
        uuid: 'string',        
        done:  { type: 'bool?', default: false },
        quantity: 'int',
        provision: 'Provision',
        createdAt: { type: 'date', default: new Date() },
        updatedAt: { type: 'date', default: new Date() },
        deletedAt: 'date?'
    }
}

