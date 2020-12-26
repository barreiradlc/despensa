import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'Item',
    primaryKey: 'uuid',
    properties: {
        id: 'string?',
        uuid: { type: 'string?', default: uuidv4() }, //{type: 'int', default: 0},,
        quantity: { type: 'int?', default: 1 }, //{type: 'int', default: 0},,
        expiresAt: 'date?',
        provision: 'Provision',
        updatedAt: 'date?',
        deletedAt: 'date?',
        queue: { type: 'bool?', default: false } //{type: 'int', default: 0},
    }
}
