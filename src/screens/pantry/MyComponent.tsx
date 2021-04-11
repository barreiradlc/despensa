import * as React from 'react';
import { Text } from 'react-native';
import { List } from 'react-native-paper';
import { Pantry } from '../../services/local/realm/PantryLocalService';

interface MyComponentInterface{
    pantries: Pantry[]
}

const MyComponent = ({ pantries }: MyComponentInterface) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    // <List.Section title="Accordions">              
    <List.Section>              
        
        {pantries.map((pantry) => (
            <List.Accordion
                title={pantry.name}
                description={pantry.description}
                left={props => <List.Icon {...props} icon="folder" />}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>
        ))}
    </List.Section>
  );
};

export default MyComponent;