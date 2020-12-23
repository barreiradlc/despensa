export default {
    name: 'ItemCompras',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        despensaUuid: 'string',
        done: 'bool',
        quantidade: 'int',
        provimento: 'Provision',
        dataAlteracao: 'date',
        deletedAt: 'date?'
    }
}

