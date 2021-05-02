import React, {useCallback} from 'react';
import {
  IItemBottomSheetArgs,
  useItemPantry,
  useLocalPantry,
} from '../../components/context/BottomSheetLocalPantryProvider';

import {ItemInterface} from '../../config/realmConfig/schemas/Item';
import ItemPantry from './ItemPantry';
import NewItemTab from './NewItemTab';

interface ItemContentInterface {
  items: ItemInterface[];
  uuidPantry: string;
}

const ItemContent: React.FC<ItemContentInterface> = ({items, uuidPantry}) => {
  const {handleOpen} = useLocalPantry();

  const handleOpenBottomSheet = useCallback(() => {
    handleOpen({
      type: 'pantry_item',
      args: ({
        uuidPantry: uuidPantry,
      } as unknown) as IItemBottomSheetArgs,
    });
  }, [handleOpen, uuidPantry]);

  return (
    <>
      {items.map((i) => (
        <ItemPantry key={i.uuid} data={i} uuidPantry={uuidPantry} />
      ))}

      <NewItemTab handleOpen={handleOpenBottomSheet} />
    </>
  );
};

export default ItemContent;
