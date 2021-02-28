import { appSchema, Database, tableSchema } from '@nozbe/watermelondb'
import { Pantry, pantryTable } from './schemas/Pantry'
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";


export const Schema = appSchema({
  version: 1,
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

export const { collections } = database