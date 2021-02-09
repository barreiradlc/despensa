import realm from "../../config/realmConfig/realm";

export async function getShoppingFinished(){    
    return await realm.objects('ShoppingItem').filtered('done = $0', true).length    
}

export async function getShoppingList( uuid: string ){    
    return await realm.objectForPrimaryKey('ShoppingList', uuid)
}

export async function deleteShoppingItem(uuid: string){    
    const shoppingItem = await realm.objectForPrimaryKey('ShoppingItem', uuid)
    realm.write(() => {
        return realm.delete(shoppingItem)    
    })
}