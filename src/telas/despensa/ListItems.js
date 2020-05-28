import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { CardRow, EditItem, DeleteItem, PlusItem, MinusItem, Card, CardBody, CardTitle } from '../../components/styled/Geral';
import moment from 'moment'
import 'moment/min/moment-with-locales'

require('moment/locale/cs.js');
require('moment/locale/es.js');
require('moment/locale/fr.js');
require('moment/locale/nl.js');
require('moment/locale/pt-br');

moment.locale('pt-br');         // :|

export default function PerRowConfig(props) {


    const closeRow = (rowMap, rowKey) => {
        console.log(rowMap)

        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }


    const renderItem = (data, rowMap) => (
        <SwipeRow
            disableLeftSwipe={parseInt(data.item.key) % 2 === 0}
            leftOpenValue={130}
            rightOpenValue={-150}
            style={{ backgroundColor: '#dedede' }}
        >
            <View style={styles.rowBack}>
                
                <View style={ styles.rowBackTouchable } >
                    <View style={styles.rowBackTouchableLeft}>
                    <TouchableOpacity style={styles.touchableLeft} onPress={ () => props.changeqtd(data, 'add') }>
                        <PlusItem />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableLeft}onPress={ () => props.changeqtd(data, 'remove') } >
                        <MinusItem />
                    </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={() => {props.edit(data.item, 'edit'), closeRow(rowMap, data.item.key)}}
                    // onPress={() => closeRow(rowMap, data.item.key)}
                >
                    <EditItem />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={() => {props.delete(data.item, 'edit'), closeRow(rowMap, data.item.key)}}

                >
                    <DeleteItem />
                </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback
                onPress={() => console.log('You touched me')}

                underlayColor={'#AAA'}
            >
                <Card>
                    <CardTitle>{data.item.provimento.nome}</CardTitle>
                    <CardRow>
                        <CardBody>{data.item.quantidade} unidade{data.item.quantidade > 1 && 's'}</CardBody>
                        {data.item.validade && 
                            <CardBody>expira em: {moment(data.item.validade).format('L')}</CardBody>
                        }
                    </CardRow>
                </Card>
            </TouchableWithoutFeedback>

        </SwipeRow>
    );

    return (
        <View style={styles.container}>
            <SwipeListView data={props.value.items} renderItem={renderItem} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 20
    },
    rowBackTouchable: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // padding: 20


    },
    rowBackTouchableLeft: {
        
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // padding: 20
        width:75


    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        // backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        // backgroundColor: 'red',
        right: 0,
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backLeftBtnLeft: {
        // backgroundColor: 'blue',
        left: 75,
        zIndex: 23
    },
    backLeftBtnRight: {
        // backgroundColor: 'red',
        left: 0,
    },
    touchableLeft:{
        width:45,
        margin:5
    }
});