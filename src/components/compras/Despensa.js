import * as React from 'react';
import { ScrollView, View} from 'react-native'
import { List, Checkbox } from 'react-native-paper';
import PerRowConfig from '../../telas/compras/Item'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { screenWidth } from '../styled/Geral'

class Despensa extends React.Component {
    state = {
        expanded: true
    }

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
        });

        
    checkItem = (item) => {
        console.debug({item})
    }

    render() {

        const { data } = this.props

        if (data.compras.length === 0) {
            return null
        }

        console.log({screenWidth})

        return (
                <List.Accordion   
                    description={data.descricao}
                    color='#c93b4a'
                    titleStyle={{color: '#c93b4a', fontSize: 20, fontWeight: 'bold' }}
                    expanded={this.state.expanded}
                    title={data.nome}
                    onPress={this._handlePress}
                    left={props => <List.Icon {...props} icon="fridge" color='#c93b4a' />}
                >
                    
                    <List.Item 
                        style={{ position: "relative", left: 0, width:screenWidth }}                       
                        right={props => <PerRowConfig check={this.checkItem} value={data.compras} /> }
                    />

                </List.Accordion>

        );
    }
}

export default Despensa


{/* <List.Accordion
  title="Controlled Accordion"
  left={props => <List.Icon {...props} icon="folder" />}
  expanded={this.state.expanded}
  onPress={this._handlePress}
>
  <List.Item title="First item" />
  <List.Item title="Second item" />
</List.Accordion> */}