import { Model, Q, Relation, tableSchema } from "@nozbe/watermelondb";
import { date, field, lazy, readonly, relation } from '@nozbe/watermelondb/decorators'
import { Pantry } from "./Pantry";
import { Provision } from "./Provision";

export class Item extends Model {
  static table = 'items'

    static associations = {
        provision: { type: 'belongs_to', foreignKey: 'provision_id', key: 'provisions' },
        pantry: { type: 'belongs_to', foreignKey: 'pantry_id', key: 'pantries' },
    } as const

    @field('_id') _id?: string
    @field('quantity') quantity?: number
    @field('queue')  queue?: boolean

    @relation('pantry', 'pantry_id') pantry?: Relation<Pantry>
    @relation('provision', 'provision_id') provision?: Relation<Provision>

    @readonly @date('created_at') createdAt?: number
    @readonly @date('updated_at') updatedAt?: number

    @date('expires_at') expiresAt?: number
    @date('deleted_at') deletedAt?: number
}


export const itemTable = tableSchema({
    name: 'items',
    columns: [
        { name: '_id', type: 'string', isOptional: true },
        { name: 'quantity', type: 'number' },      
        { name: 'queue', type: 'boolean' },
        
        // DATE FIELDS
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        
        // RELATIONS FIELDS
        { name: 'pantry_id', type: 'string' },
        { name: 'provision_id', type: 'string' },

        { name: 'deleted_at', type: 'number' },
        { name: 'expires_at', type: 'number' }
    ]
})