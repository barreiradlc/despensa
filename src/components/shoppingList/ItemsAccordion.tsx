import * as React from 'react';
import { useCallback } from 'react';
import { List } from 'react-native-paper';
import { cor1, cor2, cor3, cor4, cor6 } from '../../constants/CORES';
import CardShoppingItem from '../CardShoppingItem';

const ItemsAccordion = ({ expanded, setExpanded, pending, shoppingList }) => {

  const handlePress = () => setExpanded(!expanded);

    const handleManageItems = useCallback(() => {

    }, [])    

    const toolTip = useCallback(() => {

    }, [])
    

  return (
      <List.Accordion
        style={{ backgroundColor: cor1, margin: 15, marginBottom: 0, borderRadius: 15 }}
        titleStyle={{ color: cor6, backgroundColor: cor1, }}
        title={`${shoppingList.name} ${`\n`} ${pending} ite${pending > 1 ? 'ns' : 'm'} pendentes`}
        // left={props => <List.Icon {...props} icon="folder" color={cor2} />}
        expanded={expanded}
        onPress={handlePress}>
        
        {shoppingList.items.map(( item ) => 
            <CardShoppingItem shoppingItem={item} handleManageItems={handleManageItems} toolTip={toolTip} />
            // <List.Item title={item.provision.name} />
        )}
        {/* <List.Item title="Second item" /> */}
      </List.Accordion>    
  );
};

export default ItemsAccordion;