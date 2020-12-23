export default ItemCompras = {
    name: 'ItemCompras',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        despensaUuid: 'string',
        done: 'bool',
        quantidade: 'int',
        provimento: 'Provimento',
        dataAlteracao: 'date',
        deletedAt: 'date?'
    }
}

