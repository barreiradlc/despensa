import * as React from 'react';
import {
    RadioButton,
    Text,
    View,
    DataTable,
    Paragraph,
    Dialog,
    Portal,
    Provider,
} from 'react-native-paper';
import { ScrollView } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { FormContainerScroll, Facebook, FormButtonLabel, FormButtonGroup, FormAsset, FormButton, FormContainer, FormIconContainer, FormInput, FormLabel, FormTouchable, FormTouchableIcon, Google } from '../styled/Form'
import * as Utils from '../utils/Utils'
import * as LocalStorage from '../../services/LocalStorage'

export default class FormItemCompra extends React.Component {

    state = {
        despensa: this.props.despensa,
        visible: this.props.renderForm,
        nome: '',
        quantidade: 1,
        focus: true
    };
    
    _hideDialog = () => {
        // this.props.handleConfigDialog()
        this.props.show(false)
        this.setState({ visible: false })
    };
    
    handleSetConfig = (noDismiss) => {
        const { despensa, nome, quantidade } = this.state

        console.debug(despensa.uuid)

        LocalStorage.addItemListaComprasDespensa({nome, quantidade, id: 0}, despensa.uuid, true)
            .then(( res ) => {
                Utils.toast(`${nome} adicionado`)

                console.debug({responseCompra:res})
                if(!noDismiss){
                    this._hideDialog()
                } else {
                    this.setState({
                        focus: true,
                        nome: '',
                        quantidade: 1
                    })
                    this.textInput.focus()
                }
                this.props.refresh()
            })
            .catch((e) => {
                console.warn(e)
                console.error(e)
            })

        // const { qtd, despensa } = this.state
        
        // let erros = this.validate(qtd, despensa)
        // if(erros.length !== 0){
        //     erros.map((e) => {
        //     })
        // } else {
        //     console.log({ qtd, despensa })        
            
        //     this.props.handleConfigDialog(qtd, despensa)
        // }
        
    }
    
    
    
    render() {

        const handleChangeInput = (value, attr) => {
            
            this.setState({
                [attr]: value.nativeEvent.text
            })
        }
        
        const { quantidade, nome, focus } = this.state
        
        return (
            <Portal>
                <Dialog visible={this.props.renderForm} onDismiss={this._hideDialog}>
                    <Dialog.Content>
                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{ paddingVertical: 14, borderBottomWidth: 0 }}>
                                <FormInput
                                    ref={(input) => { this.textInput = input; }}
                                    onChange={(e) => handleChangeInput(e, 'nome')}
                                    autoFocus={focus}
                                    value={nome}
                                    placeholder='Nome'                                    
                                    onSubmitEditing={() => this.secondTextInput.focus() }
                                    blurOnSubmit={false}
                                />

                                <FormInput
                                    ref={(input) => { this.secondTextInput = input; }}
                                    onChange={(e) => handleChangeInput(e, 'quantidade')}
                                    value={quantidade || 1}
                                    placeholder='Quantidade'
                                    keyboardType='number-pad'
                                    onSubmitEditing={() => {this.handleSetConfig(true)}}
                                />
                                
                                <FormButton onPress={this.handleSetConfig} active>
                                    <FormButtonLabel active>Adicionar</FormButtonLabel>
                                </FormButton>

                            </ScrollView>
                        </Dialog.ScrollArea>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        );
    }
}
