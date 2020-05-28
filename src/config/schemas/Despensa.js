
export default class Despensa {
    static schema = {
        name: 'Despensa',
        primaryKey: 'uuid',
        properties: {
            uuid: 'string',
            id: 'int?',
            nome: 'string?',
            descricao: 'string?',
            items: 'Item[]',
            deletedAt: 'date?',
            fila: {type: 'bool?', default: true} //{type: 'int', default: 0},
        }
    }
};