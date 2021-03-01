import { Model, tableSchema } from "@nozbe/watermelondb";
import { date, field, readonly } from '@nozbe/watermelondb/decorators'

export class Pantry extends Model {
  static table = 'pantries'

    static associations = {
        items: { type: 'has_many', foreignKey: 'pantry_id' },
    } as const

    @field('_id') _id?: string
    @field('name') name?: string
    @field('description') description?: string
    @field('thumbnail') thumbnail?: string
    @readonly @date('created_at') createdAt?: number
    @readonly @date('updated_at') updatedAt?: number
    @date('deleted_at') deletedAt?: number
    @field('queue') queue?: boolean
}


export const pantryTable = tableSchema({
    name: 'pantries',
    columns: [
      { name: '_id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string', isOptional: true },
      { name: 'thumbnail', type: 'string', isOptional: true },
      { name: 'queue', type: 'boolean' },
      
      // DATE FIELDS
      { name: 'created_at', type: 'number' },
      { name: 'updated_at', type: 'number' },
      { name: 'deleted_at', type: 'number', isOptional: true },
    ]
})