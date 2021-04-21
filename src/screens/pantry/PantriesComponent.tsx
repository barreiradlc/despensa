

import { List } from 'react-native-paper';
import { Pantry } from '../../services/local/realm/PantryLocalService';
import React, { useState, useEffect, useRef, createRef, RefObject, MutableRefObject, useMemo } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TooltipComponent from '../../components/utils/TooltipComponent';
import ListAccordionGroup from 'react-native-paper/lib/typescript/components/List/ListAccordionGroup';
import { Button } from '../../components/styles/form';
import PantryOptions from '../../components/pantry/PantryOptions';
import { useCallback } from 'react';
import { PantryInterface } from '../../config/realmConfig/schemas/Pantry';
import ItemPantry from './ItemPantry';
import NewItemTab from './NewItemTab';
import ItemContent from './ItemContent';

interface PantriesComponentInterface {
  pantries: PantryInterface[],
  editPantry(pantry: PantryInterface): void
}

interface TipRefInterface extends RefObject<any | undefined> {
  toggleTooltip(value?: boolean): void
}

const PantriesComponent = ({ pantries, editPantry }: PantriesComponentInterface) => {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const pantriesRefs = useMemo<TipRefInterface[]>(() => Array(pantries.length).fill().map(() => createRef()), [pantries])

  const handleEditPantry = useCallback((pantry: PantryInterface, index: number) => {

    // TODO, Barreira - Rever esse coiso chato
    pantriesRefs[index]?.current.toggleTooltip(false)
    pantriesRefs[index]?.current.toggleTooltip(false)

    setTimeout(() => {
      editPantry(pantry)
    }, 50)
  }, [])

  return (
    <List.AccordionGroup>

      {!!pantries.length && pantries.map((pantry: PantryInterface, index: number) => (
        <List.Accordion
          key={pantry.uuid}
          id={pantry.uuid}
          title={pantry.name}
          description={pantry.description}
          onLongPress={() => {
            pantriesRefs[index]?.current.toggleTooltip()
            console.log(pantriesRefs)
          }}
          titleStyle={{ color: "#C72828" }}
          style={{ borderTopColor: "#555", borderTopWidth: 1 }}
          left={(props) => {
            return (
              <TooltipComponent content={<PantryOptions index={index} pantry={pantry} handleEditPantry={handleEditPantry} />} ref={pantriesRefs[index]}>
                <List.Icon icon="fridge" />
              </TooltipComponent>
            )
          }}
          expanded={expanded}
          onPress={handlePress}>

          <ItemContent items={pantry.items} uuidPantry={pantry.uuid} />

        </List.Accordion>
      ))}

    </List.AccordionGroup>
  );
};

export default PantriesComponent;