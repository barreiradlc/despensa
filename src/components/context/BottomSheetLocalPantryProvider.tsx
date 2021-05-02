import React, {RefObject, useContext, useMemo, useRef, useState} from 'react';
import {createContext} from 'react';
import {ItemInterface} from '../../config/realmConfig/schemas/Item';
import {PantryInterface} from '../../config/realmConfig/schemas/Pantry';
import FormItem from '../../screens/pantry/FormItem';
import FormPantry from '../../screens/pantry/Form';
import FormBottomSheet from '../partials/FormBottomSheet';

interface BottomSheetLocalPantryContextData {
  handleClose(): void;
  handleOpen(options: IOpenBottomSheetOptions): void;
}

interface IToggleBottomSheetRef extends RefObject<any | undefined> {
  toggle(value: number): void;
}

export interface IFormRef extends RefObject<any | undefined> {
  focus(): void;
}

export interface IItemBottomSheetArgs {
  value?: ItemInterface;
  uuidPantry: string;
}

export interface IOpenBottomSheetOptions {
  type: string;
  args: IItemBottomSheetArgs | PantryInterface | undefined;
}

export const BottomSheetLocalPantryContext = createContext<BottomSheetLocalPantryContextData>(
  {} as BottomSheetLocalPantryContextData,
);

const BottomSheetLocalPantryProvider: React.FC = ({children}) => {
  const toggleRef = useRef<IToggleBottomSheetRef>({} as IToggleBottomSheetRef);
  const formRef = useRef<IFormRef>({} as IFormRef);
  const [form, setForm] = useState('');
  const [pantry, setPantry] = useState('');
  const [pantryData, setPantryData] = useState<PantryInterface>(
    {} as PantryInterface,
  );
  const [itemSelected, setItemSelected] = useState<ItemInterface>(
    {} as ItemInterface,
  );

  const itemFormData = useMemo(() => {
    return {
      item: itemSelected,
      uuidPantry: pantry,
    };
  }, [pantry, itemSelected]);

  function renderForm() {
    if (form === 'pantry') {
      return <FormPantry close={handleClose} data={pantryData} ref={formRef} />;
    }
    if (form === 'pantry_item') {
      return <FormItem close={handleClose} data={itemFormData} ref={formRef} />;
    }
    return null;
  }

  function handleClose() {
    toggleRef.current.toggle(1);
  }

  function handleOpenPantryBottomSheet(value?: PantryInterface) {
    setPantryData(value || ({} as PantryInterface));
  }

  function handleOpenItemPantryBottomSheet({
    value,
    uuidPantry,
  }: IItemBottomSheetArgs) {
    setPantry(uuidPantry);
    setItemSelected(value || ({} as ItemInterface));
  }

  function handleOpen(options: IOpenBottomSheetOptions) {
    toggleRef.current.toggle(0);
    setForm(options.type);
    setTimeout(() => {
      formRef.current.focus();
    }, 500);

    switch (options.type) {
      case 'pantry':
        return handleOpenPantryBottomSheet(options.args as PantryInterface);
      case 'pantry_item':
        return handleOpenItemPantryBottomSheet(
          options.args as IItemBottomSheetArgs,
        );
      default:
        throw new Error('PROVIDE SOME TYPE');
    }
  }

  return (
    <BottomSheetLocalPantryContext.Provider value={{handleClose, handleOpen}}>
      {children}
      <FormBottomSheet ref={toggleRef} content={renderForm} />
    </BottomSheetLocalPantryContext.Provider>
  );
};

function useLocalPantry(): BottomSheetLocalPantryContextData {
  const context = useContext(BottomSheetLocalPantryContext);

  if (!context) {
    throw new Error('usePantry must be used with BottomSheetPantryProvider');
  }

  return context;
}

export {BottomSheetLocalPantryProvider, useLocalPantry};
