export default {
    name: 'ShoppingItem',
    primaryKey: 'uuid',
    properties: {        
        uuid: 'string',        
        done: 'bool',
        quantity: 'int',
        provision: 'Provision',
        createdAt: 'date',
        updatedAt: 'date',
        deletedAt: 'date?'
    }
}

