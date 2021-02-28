import { Model, tableSchema } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators'

// export default {
//     name: 'Pantry',
//     primaryKey: 'uuid',
//     properties: {
//         uuid: 'string',
//         _id: 'string?',
//         name: 'string?',
//         description: 'string?',
//         items: 'Item[]',        
//         createdAt: 'date?',
//         updatedAt: 'date?',
//         deletedAt: 'date?',
//         queue: { type: 'bool?', default: false }, //{type: 'int', default: 0},
//         thumbnail: 'string?',
//     }
// }

export class Pantry extends Model {
    static table = 'pantries'
    // static associations = {
    //     items: { type: 'has_many', foreignKey: 'pantry_id' },
    // }

    @field('name') name?: string
    @field('description') description?: string
    @field('queue') queue?: boolean
}


export const pantryTable = tableSchema({
    name: 'pantry',
    columns: [
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'queue', type: 'boolean' },
    ]
})