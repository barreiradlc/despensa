import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default class SnackBar extends React.Component {
  state = {
    visible: true,
  };

  _onToggleSnackBar = () => {
      this.setState(state => ({ visible: !state.visible }))
      console.log("CLICOU!!!")
  };

  _onDismissSnackBar = (config) => {
    this.setState({ visible: false })
    this.props.clickSnackBar(config)
    console.log("SUMIU!!!")
  };

  
  render() {        
    console.log('this.props.despensaAtiva')
    console.log(this.props.despensaAtiva.nome)

    const { visible } = this.state;
    const { despensaAtiva, itemAtivo } = this.props;

    return (
      <View style={styles.container}>
        <Snackbar
          visible={visible}
          onDismiss={this._onDismissSnackBar}
          DURATION_SHORT
          action={{
            label: 'Configurar',
            onPress: () => {
              this._onDismissSnackBar(true)
              // Do something
            },
          }}
        >
          Clique novamente para adicionar {itemAtivo} a sua lista de compras vinculado a {despensaAtiva.nome}, ou configure outra aqui.
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    justifyContent: 'space-between',
  },
});