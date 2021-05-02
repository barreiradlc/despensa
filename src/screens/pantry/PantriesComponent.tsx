import {List} from 'react-native-paper';
import React, {useState, useEffect, createRef, RefObject, useMemo} from 'react';
import TooltipComponent from '../../components/utils/TooltipComponent';
import PantryOptions from '../../components/pantry/PantryOptions';
import {useCallback} from 'react';
import {PantryInterface} from '../../config/realmConfig/schemas/Pantry';
import ItemContent from './ItemContent';
import {ButtonFixed, ButtonLabel} from '../../components/styles/form';
import {ScrollView} from 'react-native';
import {
  IOpenBottomSheetOptions,
  useLocalPantry,
} from '../../components/context/BottomSheetLocalPantryProvider';

interface PantriesComponentInterface {
  pantries: PantryInterface[];
  editPantry(pantry: IOpenBottomSheetOptions): void;
}

export interface TipRefInterface extends RefObject<any | undefined> {
  toggleTooltip?(value?: boolean): void;
}

const PantriesComponent = ({pantries}: PantriesComponentInterface) => {
  const {handleOpen} = useLocalPantry();
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const pantriesRefs = useMemo<TipRefInterface[]>(
    () =>
      Array(pantries.length)
        .fill('')
        .map(() => createRef()),
    [pantries],
  );

  const handleEditPantry = useCallback(
    (pantry: PantryInterface, index: number) => {
      // TODO, rever esse coiso que está zuadaço
      pantriesRefs[index]?.current.toggleTooltip(true);

      setTimeout(() => {
        handleOpen({
          type: 'pantry',
          args: pantry,
        });
      }, 50);
    },
    [handleOpen, pantriesRefs],
  );

  useEffect(() => {
    pantriesRefs.map((_, i) => {
      pantriesRefs[i]?.current.changeTooltip(false);
    });
  }, [pantries, pantriesRefs]);

  const handleCreatePantryBottomSheet = useCallback(() => {
    handleOpen({
      type: 'pantry',
      args: {} as PantryInterface,
    });
  }, [handleOpen]);

  return (
    <>
      <ScrollView style={{marginBottom: 80}}>
        <List.AccordionGroup>
          {!!pantries.length &&
            pantries.map((pantry: PantryInterface, index: number) => (
              <List.Accordion
                key={pantry.uuid}
                id={pantry.uuid}
                title={pantry.name}
                description={pantry.description}
                onLongPress={() => {
                  pantriesRefs[index]?.current.toggleTooltip();
                  console.log(pantriesRefs);
                }}
                titleStyle={{color: '#C72828'}}
                style={{borderTopColor: '#555', borderTopWidth: 1}}
                left={() => {
                  return (
                    <TooltipComponent
                      content={
                        <PantryOptions
                          index={index}
                          pantry={pantry}
                          handleEditPantry={() =>
                            handleEditPantry(pantry, index)
                          }
                        />
                      }
                      ref={pantriesRefs[index]}>
                      <List.Icon icon="fridge" />
                    </TooltipComponent>
                  );
                }}
                expanded={expanded}
                onPress={handlePress}>
                <ItemContent items={pantry.items} uuidPantry={pantry.uuid} />
              </List.Accordion>
            ))}
        </List.AccordionGroup>
      </ScrollView>
      <ButtonFixed style={{zIndex: 45}} onPress={handleCreatePantryBottomSheet}>
        <ButtonLabel>Adicionar uma nova despensa</ButtonLabel>
      </ButtonFixed>
    </>
  );
};

export default PantriesComponent;
