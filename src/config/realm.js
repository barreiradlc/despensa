// 'use strict';

import Realm from 'realm'

import Despensa from './schemas/Despensa'
import Item from './schemas/Item'
import ItemCompras from './schemas/ItemCompras'
import Provimento from './schemas/Provimento'

const SCHEMA_VERSION = 28

export default new Realm({
    schema: [Despensa, Item, Provimento, ItemCompras],
    schemaVersion: SCHEMA_VERSION
});