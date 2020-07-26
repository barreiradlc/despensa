import * as React from 'react';
import { ScrollView, View } from 'react-native'
import { List, Checkbox } from 'react-native-paper';
import PerRowConfig from '../../telas/compras/Item'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { FormButton, FormButtonLabel, FormContainerCompras, FormContainer } from '../styled/Form'
import { screenWidth, Card } from '../styled/Geral'
import * as LocalStorage from '../../services/LocalStorage'
import FormItemCompra from '../utils/FormItemCompra'
import realm from '../../config/realm'

class Despensa extends React.Component {
    state = {
        expanded: false,
        renderForm: false,
        data: this.props.data
    }

    _handlePress = () =>
        this.setState({
            expanded: !this.state.expanded
        });

    checkItem = (item, despensa) => {
        LocalStorage.checkItemListaCompras(item, this.props.data)
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

    setShowOptions = (item) => {
        const { data } = this.state

        console.debug(item.visible)
        console.debug(data.compras)
        const newData = data.compras.map(( c ) => {
            if(item.provimento.nome === c.provimento.nome){
                
                c = { 
                    visible: !item.visible,
                    id: item.id,
                    uuid: item.uuid,
                    quantidade: item.quantidade,
                    deletedAt: item.deletedAt,
                    dataAlteracao: item.dataAlteracao,
                    done: item.done,
                    provimento: {
                        id: item.provimento.id,
                        nome: item.provimento.nome,
                    }
                }
                console.log(c)
            }

            return c
        })

        console.log({newData})


        this.setState({
            data : {
                uuid : data.uuid,
                id : data.id,
                nome : data.nome,
                descricao : data.descricao,
                deletedAt: data.deletedAt,
                fila: data.fila,
                compras: newData
                
            }
        })
    }

    changeItemQTD = (item, action) => {
        // LocalStorage.changeQTDItemListaCompras(item, action)
        //     .then((res) => {
        //         console.log( 'item' )
        //         console.log({ res })
                
        //         console.log( item.provimento.nome )
        //         console.log( this.state.data.compras )

                let newQTD = action == 'more' ? item.quantidade + 1 : item.quantidade - 1

                const newList = this.state.data.compras.map(( c ) => {
                    if(item.provimento.nome == c.provimento.nome){

                        console.log("newQTD")
                        console.log(newQTD)
                        console.log("newQTD")

                        realm.write(() => {
                            c.quantidade = newQTD
                        })
                    }

                    return item
                })

                this.setState({
                    ...this.state.data,
                    compras: {
                        newList
                    }
                })

                console.log({newList})


                // this.setState({
                //     data: {
                //         ...this.state.data,
                //         item : {
                //             quantidade: newQTD
                //         }
                //     }
                // })
                // this.props.reload(item, action)
            // })
        console.log({ item: item.quantidade })
    }


    render() {



        const setRenderForm = (val) => {
            const { data } = this.state
            // console.debug(val)
            this.props.handleFormShow(data)
            // this.setState({
            //     renderForm: val
            // })
            // console.debug('val')
        }

        const RenderItem = () => {
            return (
                <FormContainerCompras>

                    <FormButton onPress={() => setRenderForm( this.state.renderForm ) } style={{ width: screenWidth / 2, alignSelf: "center", padding: 0, marginBottom: 25 }} active>
                        <FormButtonLabel active style={{ fontWeight: 'regular', fontSize: 15, margin: 0, padding: 0 }}>Adicionar Item</FormButtonLabel>
                    </FormButton>

                    <PerRowConfig changeItemQTD={this.changeItemQTD} check={this.checkItem} removeItem={this.removeItem} value={data.compras.filter((c) => !c.deletedAt)} despensa={data} setShowOptions={this.setShowOptions} />

                </FormContainerCompras>
            )
        }

        const { renderForm } = this.props
        const { data } = this.state

        // if (data.compras.length === 0 || data.compras.filter((c) => !c.deletedAt).length === 0) {
        //     return null
        // }

        console.log({ screenWidth })

        return (
            <List.Accordion
                style={{ borderTopColor: '#c93b4a', borderTopWidth: 2 }}
                description={data.descricao}
                color='#c93b4a'
                titleStyle={{ color: '#c93b4a', fontSize: 20, fontWeight: 'bold' }}
                expanded={this.state.expanded}
                title={data.nome}
                onPress={this._handlePress}
                left={props => <List.Icon {...props} icon="fridge" color='#c93b4a' />}
            >

                {renderForm &&
                    <FormItemCompra renderForm={renderForm} despensaAtiva={data.uuid}/>
                }

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