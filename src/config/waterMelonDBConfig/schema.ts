import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { appSchema, Database, tableSchema } from '@nozbe/watermelondb'

import { Pantry, pantryTable } from './schemas/Pantry'
import { Item, itemTable } from "./schemas/Item";

import { Provision, provisionTable } from "./schemas/Provision";

export const Schema = appSchema({
  version: 7,
  tables: [
    pantryTable,
    itemTable,
    provisionTable
  ]
})

export const adapter = new SQLiteAdapter({
    dbName: "despensa_db",
    schema: Schema 
});   

export const database = new Database({
    adapter,
    modelClasses: [
      Pantry, 
      Item,
      Provision
    ],
    actionsEnabled: true
})

export const pantryCollection = database.collections.get('pantries')

export const itemCollection = database.collections.get('items')

export const provisionCollection = database.collections.get('provisions')

export const { collections } = database