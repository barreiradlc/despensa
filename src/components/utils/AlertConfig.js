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

export default class AlertConfig extends React.Component {
    state = {
        qtd: '1',
        visible: this.props.configVisible,
        value: true,
        despensa: this.props.despensaAtiva,
    };

    _hideDialog = () => {
        this.props.handleConfigDialog()
        this.setState({ visible: false })
    };

    handleSetConfig = () => {
        const { qtd, despensa } = this.state

        let erros = this.validate(qtd, despensa)
        if(erros.length !== 0){
            erros.map((e) => {
                Utils.toast(e.message)
            })
        } else {
            console.log({ qtd, despensa })        

            this.props.handleConfigDialog(qtd, despensa)
        }

    }
    
    validate = (qtd, despensa) => {
        

        let erros = []

        if(Number(qtd) < 1){
            erros.push({message: "A quantidade precisa ser maior que zero"})
        }
        if(!Number(qtd) || qtd === ''){
            erros.push({message: "A quantidade precisa ser preenchida"})
        }
        if(despensa === undefined || despensa === ''){
            erros.push({message: "Precisa selecionar uma despensa"})
        }

        return erros
    }

    handleSetQTD = (e) => {
        let text = e.nativeEvent.text

        console.log(e.nativeEvent.text)
        
        this.setState({
            qtd: text
        })
        
    }

    render() {

        console.log(this.props)

        return (
            <Portal>
                <Dialog visible={this.props.configVisible} onDismiss={this._hideDialog}>
                    <Dialog.Content>
                        <Dialog.ScrollArea>
                            <ScrollView contentContainerStyle={{ paddingVertical: 14, borderBottomWidth: 0 }}>
                                <FormInput
                                    onChange={(e) => this.handleSetQTD(e)}
                                    autoFocus
                                    value={this.state.qtd}
                                    placeholder='Quantidade'
                                    keyboardType='number-pad'
                                />
                                <Picker
                                    style={{ padding: 35, borderRadius: 25, marginBottom: 15, color: "#555" }}
                                    selectedValue={this.state.despensa}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({ despensa: itemValue })
                                    }>
                                    <Picker.Item label="Selecione uma despensa" value={undefined} style={{ padding: 25,  borderRadius: 25  }} />
                                    {this.props.despensas.map((despensa) =>
                                        <Picker.Item label={despensa.nome} value={despensa.uuid} style={{ padding: 25,  borderRadius: 25  }} />
                                    )}
                                </Picker>
                                <FormButton onPress={this.handleSetConfig} active>
                                    <FormButtonLabel active>Atualizar</FormButtonLabel>
                                </FormButton>

                            </ScrollView>
                        </Dialog.ScrollArea>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        );
    }
}
