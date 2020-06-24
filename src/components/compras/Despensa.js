import * as React from 'react';
import { ScrollView, View } from 'react-native'
import { List, Checkbox } from 'react-native-paper';
import PerRowConfig from '../../telas/compras/Item'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { FormButton, FormButtonLabel, FormContainerCompras, FormContainer } from '../styled/Form'
import { screenWidth, Card } from '../styled/Geral'
import * as LocalStorage from '../../services/LocalStorage'

class Despensa extends React.Component {
    state = {
        expanded: true
    }

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
        });

    checkItem = (item, despensa) => {
        LocalStorage.checkItemListaCompras(item)
            .then((res) => {
                console.log(res)
                this.props.reload(item, this.props.data)
            })
        console.debug(item, despensa)
    }

    removeItem = (item, despensa) => {
        LocalStorage.removeItemListaCompras(item)
            .then((res) => {
                console.log({ res })
                this.props.reload(item, this.props.data)
            })
        console.debug(item, despensa)
    }

    changeItemQTD = (item, action) => {
        LocalStorage.changeQTDItemListaCompras(item, action)
            .then((res) => {
                console.log({ 'resItem': res })
                this.props.reload(item, action)
            })
        console.log({ item: item.quantidade })
    }


    render() {
        const RenderItem = () => {
            return (
                <FormContainerCompras>

                    <PerRowConfig changeItemQTD={this.changeItemQTD} check={this.checkItem} removeItem={this.removeItem} value={data.compras.filter((c) => !c.deletedAt)} despensa={data} />

                    <FormButton onPress={() => console.log(true)} style={{ width: screenWidth / 2, alignSelf: "center", padding: 0 }} active>
                        <FormButtonLabel active style={{ fontWeight: 'regular', fontSize: 15, margin: 0, padding: 0 }}>Adicionar Item</FormButtonLabel>
                    </FormButton>

                </FormContainerCompras>
            )
        }

        const { data } = this.props

        if (data.compras.length === 0 || data.compras.filter((c) => !c.deletedAt).length === 0) {
            return null
        }

        console.log({ screenWidth })

        return (
            <List.Accordion
                description={data.descricao}
                color='#c93b4a'
                titleStyle={{ color: '#c93b4a', fontSize: 20, fontWeight: 'bold' }}
                expanded={this.state.expanded}
                title={data.nome}
                onPress={this._handlePress}
                left={props => <List.Icon {...props} icon="fridge" color='#c93b4a' />}
            >

                <List.Item
                    style={{ position: "relative", right: 20, width: screenWidth }}
                    right={props => <RenderItem />}
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