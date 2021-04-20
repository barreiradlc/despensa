

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

interface MyComponentInterface {
  pantries: Pantry[]
}
interface TipRefInterface extends RefObject<any | undefined> {
  toggleTooltip(): void
}

const MyComponent = ({ pantries }: MyComponentInterface) => {
  const [expanded, setExpanded] = useState(false);
  const pantriesRefs = useMemo<TipRefInterface[]>(() => Array(pantries.length).fill().map(() => createRef()), [pantries])
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.AccordionGroup>

      {!!pantries.length && pantries.map((pantry: Pantry, index: number) => (
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
          left={(props) => {
            return (
              <TooltipComponent content={<PantryOptions />} ref={pantriesRefs[index]}>
                <List.Icon {...props} icon="folder" />
              </TooltipComponent>
            )
          }}
          expanded={expanded}
          onPress={handlePress}>
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      ))}

    </List.AccordionGroup>
  );
};

export default MyComponent;