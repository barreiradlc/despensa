import { Model, tableSchema } from "@nozbe/watermelondb";
import { field } from '@nozbe/watermelondb/decorators'

export class Provision extends Model {
  static table = 'provisions'

    @field('_id') _id?: string
    @field('name') name?: string     
}

export const provisionTable = tableSchema({
    name: 'provisions',
    columns: [
        { name: '_id', type: 'string', isOptional: true },
        { name: 'name', type: 'string', isOptional: true },        
    ]
})