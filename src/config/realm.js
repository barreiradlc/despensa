// 'use strict';

import Realm from 'realm'

import Despensa from './schemas/Despensa'
import Item from './schemas/Item'
import Provimento from './schemas/Provimento'

const SCHEMA_VERSION = 27

export default new Realm({
    schema: [Despensa, Item, Provimento],
    schemaVersion: SCHEMA_VERSION
});