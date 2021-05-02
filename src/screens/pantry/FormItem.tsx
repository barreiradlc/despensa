import React, {
  forwardRef,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Alert, Keyboard} from 'react-native';

import {
  Button,
  ButtonLabel,
  Input,
  ContainerInput,
  FormContainerAutoComplete,
} from '../../components/styles/form';

import {toastWithGravity} from '../../utils/toastUtils';
import {
  CreateItemDTO,
  createLocalItem,
  deleteItemPantry,
  getLocalProvision,
  updateLocalItem,
} from '../../services/local/realm/PantryLocalService';
import {ItemInterface} from '../../config/realmConfig/schemas/Item';
import {ProvisionInterface} from '../../config/realmConfig/schemas/Provision';
import {LocalDataContext} from '../../components/context/LocalDataProvider';
import {IFormRef} from '../../components/context/BottomSheetLocalPantryProvider';

interface FormItemDataInterface {
  item: ItemInterface;
  uuidPantry: string;
}

interface FormInterface {
  close(): void;
  data: FormItemDataInterface;
}

function FormItem({close, data}: FormInterface, ref: IFormRef) {
  const nameRef = useRef<IFormRef>({} as IFormRef);
  const qtdRef = useRef();
  const {refreshPantries} = useContext(LocalDataContext);
  const [itemData, setItemData] = useState<CreateItemDTO>({} as CreateItemDTO);
  const [provisionData, setProvisionData] = useState<ProvisionInterface>();
  const [query, setQuery] = useState<string>('');
  const [edit, setEdit] = useState<boolean>(false);

  function handleChange(event: any, attr: string) {
    setItemData({...itemData, [attr]: event.nativeEvent.text});
  }

  useImperativeHandle(ref, () => ({
    focus: () => {
      nameRef.current.focus();
    },
  }));

  useEffect(() => {
    if (data) {
      // nameRef.current.focus()
    }

    if (data.item.uuid) {
      const {item} = data;

      setEdit(true);
      setItemData({
        provision: item.provision,
        uuid: item.uuid,
        _id: item._id,
        quantity: 1,
        queue: true,
      });

      setQuery(item.provision.name);
    } else {
      setEdit(false);
      setItemData({quantity: 1} as CreateItemDTO);
      setQuery('');
    }
  }, [data.item]);

  useEffect(() => {
    console.log('{ itemData }');
    console.log({itemData});
  }, [itemData]);

  // useEffect(() => {

  //     setEdit(!!data.uuid)

  //     if (data) {
  //         itemData({
  //             name: data.name,
  //             description: data.description,
  //             queue: data.queue,
  //             uuid: data.uuid
  //         })
  //     }
  // }, [data])

  // useEffect(() => {
  //     console.log({ itemData })
  // }, [])

  async function handleSaveItem() {
    const pantry = data.uuidPantry;

    if (!query) {
      toastWithGravity('É necessário dar um nome à seu item');
    }
    Keyboard.dismiss();

    const provision = provisionData || (await getLocalProvision({name: query}));

    if (!provision) {
      return handleSaveItem();
    }

    const item = {
      ...itemData,
      provision,
      queue: true,
    };

    if (edit) {
      console.log('EDIT');
      console.log(item.uuid);
      console.log(item);
      console.log({itemData});

      await updateLocalItem({...item, queue: true});
    } else {
      console.log('CREATE');
      await createLocalItem({...item, queue: true}, pantry);
    }

    handleCloseBottomSheet();
  }
  function handleCloseBottomSheet() {
    close();
    setItemData({} as CreateItemDTO);
    setQuery('');
    refreshPantries();
  }

  const handleChangeQuantity = useCallback(
    (action: 'more' | 'less') => {
      console.log(action);
    },
    [data],
  );

  const handleDeleteItemPantry = useCallback(() => {
    if (!edit) {
      return handleCloseBottomSheet();
    }

    Alert.alert('Tem certeza que deseja deletar este item?', '', [
      {
        text: 'Deletar',
        onPress: () => {
          deleteItemPantry(String(itemData.uuid)), handleCloseBottomSheet();
        },
      },
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancelar'),
        style: 'cancel',
      },
    ]);
  }, [itemData]);

  return (
    <FormContainerAutoComplete>
      {/* <ProvisionFetchComponent /> */}
      <ButtonLabel invert>{edit ? 'Editar item' : 'Novo Item'}</ButtonLabel>

      <ContainerInput>
        <Input
          ref={nameRef}
          onSubmitEditing={() => {
            qtdRef?.current.focus();
          }}
          noIconStart
          placeholder="Nome"
          value={query}
          onChangeText={(val: string) => setQuery(val.toLowerCase())}
          autoCapitalize="none"
        />
      </ContainerInput>

      <ContainerInput>
        <Input
          ref={qtdRef}
          onSubmitEditing={() => {
            handleSaveItem;
          }}
          noIconStart
          placeholder="Quantidade"
          value={`${itemData.quantity}`}
          onChange={(e: any) => handleChange(e, 'quantity')}
        />

        {/* TODO, QTD BUTTONS */}
        {/* <RectButton onPress={() => handleChangeQuantity('less')}>
                    <Icon size={25} name={'minus'} color={cor2} />
                </RectButton>
                <RectButton onPress={() => handleChangeQuantity('more')}>
                    <Icon size={25} name={'plus'} color={cor2} />
                </RectButton> */}
      </ContainerInput>

      <Button onPress={handleSaveItem}>
        <ButtonLabel>{edit ? 'Editar' : 'Cadastrar'}</ButtonLabel>
      </Button>

      <Button invert onPress={handleDeleteItemPantry}>
        <ButtonLabel invert>{edit ? 'Deletar' : 'Cancelar'}</ButtonLabel>
      </Button>
    </FormContainerAutoComplete>
  );
}

export default forwardRef(FormItem);
