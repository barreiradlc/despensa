
export default Despensa = {
    name: 'Despensa',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string',
        id: 'int?',
        nome: 'string?',
        capa: 'string?',
        descricao: 'string?',
        items: 'Item[]',
        compras: 'ItemCompras[]',
        deletedAt: 'date?',
        fila: { type: 'bool?', default: false } //{type: 'int', default: 0},
    }
}
