import Realm from 'realm'

import Pantry from './schemas/Pantry'
import Item from './schemas/Item'
import ItemCompras from './schemas/ItemCompras'
import Provision from './schemas/Provision'

const SCHEMA_VERSION = 45

export default new Realm({
    schema: [Pantry, Item, Provision, ItemCompras],
    schemaVersion: SCHEMA_VERSION
});