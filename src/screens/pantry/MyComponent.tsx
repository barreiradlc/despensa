

import { List } from 'react-native-paper';
import { Pantry } from '../../services/local/realm/PantryLocalService';
import React, { useState, useEffect } from "react";
import Tooltip from "react-native-walkthrough-tooltip";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TooltipComponent from '../../components/utils/TooltipComponent';
import ListAccordionGroup from 'react-native-paper/lib/typescript/components/List/ListAccordionGroup';


interface MyComponentInterface {
  pantries: Pantry[]
}

const MyComponent = ({ pantries }: MyComponentInterface) => {
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <List.AccordionGroup>

      {!!pantries.length && pantries.map((pantry: Pantry) => (
        <List.Accordion
        
          key={pantry.uuid}
          id={pantry.uuid}
          title={pantry.name}
          description={pantry.description}
          left={props => <List.Icon {...props} icon="folder" />}
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