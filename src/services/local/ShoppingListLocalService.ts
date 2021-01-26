import realm from "../../config/realmConfig/realm";

export async function getShoppingFinished(){    
    return await realm.objects('ShoppingItem').filtered('done = $0', true).length    
}