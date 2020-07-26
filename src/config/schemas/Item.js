export default Item = {
    name: 'Item',
    primaryKey: 'uuid',
    properties: {
        id: 'int?',
        uuid: 'string',
        despensaUuid: 'string',
        quantidade: 'int',
        validade: 'date?',
        provimento: 'Provimento',
        dataAlteracao: 'date',
        deletedAt: 'date?',
        fila: { type: 'bool?', default: false } //{type: 'int', default: 0},
    }
}
