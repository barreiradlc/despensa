import React, {
  ForwardedRef,
  forwardRef,
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
  InputMultiline,
} from '../../components/styles/form';

import {toastWithGravity} from '../../utils/toastUtils';
import {
  createLocalPantry,
  CreatePantryDTO,
  deletePantry,
  editLocalPantry,
} from '../../services/local/realm/PantryLocalService';
import {PantryInterface} from '../../config/realmConfig/schemas/Pantry';
import {LocalDataContext} from '../../components/context/LocalDataProvider';
import {IFormRef} from '../../components/context/BottomSheetLocalPantryProvider';

interface FormInterface {
  close(): void;
  data: PantryInterface;
}

function Form({close, data}: FormInterface, ref: ForwardedRef<any>) {
  const {refreshPantries} = useContext(LocalDataContext);
  const nameRef = useRef<IFormRef>({} as IFormRef);
  const descriptionRef = useRef();
  const [pantryData, setPantryData] = useState<CreatePantryDTO>(
    {} as CreatePantryDTO,
  );
  const [edit, setEdit] = useState<boolean>(false);

  function handleChange(event: any, attr: string) {
    setPantryData({...pantryData, [attr]: event.nativeEvent.text});
  }

  useImperativeHandle(ref, () => ({
    focus: () => {
      nameRef.current.focus();
    },
  }));

  useEffect(() => {
    console.log({data});

    setEdit(!!data.uuid);

    if (data) {
      // nameRef.current.focus()

      setPantryData({
        name: data.name,
        description: data.description,
        queue: data.queue,
        uuid: data.uuid,
      });
    }
  }, [data]);

  async function handleSavePantry() {
    if (!pantryData.name) {
      toastWithGravity('É necessário dar um nome à sua despensa');
    }

    Keyboard.dismiss();

    if (edit) {
      console.log('EDIT');
      await editLocalPantry({
        ...pantryData,
        queue: true,
      });
    } else {
      console.log('CREATE');
      await createLocalPantry({
        ...pantryData,
        queue: true,
      });
    }

    handleCloseBottomSheet();
  }
  
  function handleCloseBottomSheet() {
    close();
    setPantryData({} as CreatePantryDTO);
  }

  const handleDeletePantry = useCallback(() => {
    handleCloseBottomSheet();

    console.log({uuid: pantryData.uuid});

    if (!edit) {
      return;
    }

    Alert.alert(
      'Tem certeza que deseja deletar estar despensa?',
      'A exclusão desta despensa implica na deleção de todos os itens vinculados a ela',
      [
        {
          text: 'Deletar',
          onPress: () => {
            deletePantry(String(pantryData.uuid)), refreshPantries();
          },
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar'),
          style: 'cancel',
        },
      ],
    );
  }, [edit, handleCloseBottomSheet, pantryData.uuid, refreshPantries]);

  return (
    <FormContainerAutoComplete>
      <ButtonLabel invert>
        {edit ? 'Editar Despensa' : 'Nova Despensa'}
      </ButtonLabel>
      <ContainerInput>
        <Input
          ref={nameRef}
          noIconStart
          placeholder="Nome"
          value={pantryData.name}
          onSubmitEditing={() => {
            descriptionRef?.current.focus();
          }}
          onChange={(e: any) => handleChange(e, 'name')}
        />
      </ContainerInput>

      <ContainerInput>
        <InputMultiline
          ref={descriptionRef}
          multiline
          noIconStart
          placeholder="Descrição"
          value={pantryData.description}
          onChange={(e: any) => handleChange(e, 'description')}
          onSubmitEditing={handleSavePantry}
        />
      </ContainerInput>

      <Button onPress={handleSavePantry}>
        <ButtonLabel>{edit ? 'Editar' : 'Cadastrar'}</ButtonLabel>
      </Button>

      <Button invert onPress={handleDeletePantry}>
        <ButtonLabel invert>{edit ? 'Deletar' : 'Cancelar'}</ButtonLabel>
      </Button>
    </FormContainerAutoComplete>
  );
}

export default forwardRef(Form);
