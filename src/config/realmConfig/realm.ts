import Realm from 'realm'

import Pantry from './schemas/Pantry'
import Item from './schemas/Item'
import ShoppingList from './schemas/ShoppingList'
import Provision from './schemas/Provision'
import ShoppingItem from './schemas/ShoppingItem'

const SCHEMA_VERSION = 54

export default new Realm({
    schema: [Pantry, Item, Provision, ShoppingList, ShoppingItem],
    schemaVersion: SCHEMA_VERSION
});