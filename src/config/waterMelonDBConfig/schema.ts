import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { appSchema, Database, tableSchema } from '@nozbe/watermelondb'

import { Pantry, pantryTable } from './schemas/Pantry'

export const Schema = appSchema({
  version: 2,
  tables: [
    pantryTable,
  ]
})

export const adapter = new SQLiteAdapter({
    dbName: "despensa_db",
    schema: Schema 
});   

export const database = new Database({
    adapter,
    modelClasses: [Pantry],
    actionsEnabled: true
})

export const pantryCollection = database.collections.get('pantries')


export const { collections } = database