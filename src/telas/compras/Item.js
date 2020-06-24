import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { CheckItem, CardRow, EditItem, DeleteItem, PlusItem, MinusItem, CardCol, CardCompras, Card, CardBody, CardTitle, screenWidth } from '../../components/styled/Geral';
import moment from 'moment'
import 'moment/min/moment-with-locales'

require('moment/locale/cs.js');
require('moment/locale/es.js');
require('moment/locale/fr.js');
require('moment/locale/nl.js');
require('moment/locale/pt-br');

moment.locale('pt-br');        

export class IconCheck extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.touchableCheck} onPress={() => props.changeqtd(data, 'add')}>
                <PlusItem />
            </TouchableOpacity>
        )
    }
}

export const renderItem = (data, rowMap) => {

    const closeRow = (rowMap, rowKey) => {
        console.log({rowMap})
        console.log({rowKey})

        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }


    const checkItem = (item) => {
        console.debug({item})
    }

    console.log('key')
    console.log(rowMap)

    return (
            <SwipeRow
                disableLeftSwipe={parseInt(data.item.key) % 2 === 0}
                friction={65}
                directionalDistanceChangeThreshold={5}
                leftActionValue={10}
                rightActionValue={-10}
                leftOpenValue={70}
                rightOpenValue={-70}
                
                style={styles.front}
            >
                <View style={styles.rowBack}>

                    <View style={styles.rowBackTouchable}>
                        <View style={styles.rowBackTouchableLeft}>
                            <TouchableOpacity style={styles.touchableLeft} onPress={() => props.changeqtd(data, 'add')}>
                                <DeleteItem color='#c93b4a' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={() => { checkItem(data.item), closeRow(rowMap, data.item.key); } }

                    >
                        <CheckItem state={data.item.done ? 'check-square-o' : 'square-o'} />
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => console.log('You touched me')}

                    underlayColor={'#AAA'}
                >
                    <CardCompras >
                        <CardRow>                            
                            <CardCol>
                                <PlusItem color='#c93b4a' />
                                <MinusItem color='#c93b4a' />
                            </CardCol>

                            <CardCol>
                                <CardTitle>{data.item.provimento.nome}</CardTitle>
                                <CardRow>
                                    <CardBody>{data.item.quantidade} unidade{data.item.quantidade > 1 && 's'}</CardBody>
                                    {data.item.validade &&
                                        <CardBody vencimento={twoWeeks > data.item.validade}> expira em: {moment(data.item.validade).format('L')}</CardBody>}
                                </CardRow>
                            </CardCol>
                        </CardRow>
                    </CardCompras>
                </TouchableWithoutFeedback>

            </SwipeRow>
    );
};


export default function PerRowConfig(props) {

    let currentTime = new Date();

    currentTime = currentTime.setDate(currentTime.getDate() + 14)

    let twoWeeks = new Date(currentTime)

    const closeRow = (rowMap, rowKey) => {
        console.log(rowMap.undefined)
        console.log({rowKey})

        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    }


    const renderItem = (data, rowMap) => (
        <SwipeRow
                disableLeftSwipe={parseInt(data.item.key) % 2 === 0}
                friction={65}
                directionalDistanceChangeThreshold={5}
                leftActionValue={10}
                rightActionValue={-10}
                leftOpenValue={70}
                rightOpenValue={-70}                
                style={styles.front}
            >
                <View style={styles.rowBack}>

                    <View style={styles.rowBackTouchable}>
                        <View style={styles.rowBackTouchableLeft}>
                            <TouchableOpacity style={styles.touchableLeft} onPress={() => props.removeItem(data.item)}>
                                <DeleteItem color='#c93b4a' />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnRight]}
                        onPress={() => { props.check(data.item, props.data) } }
                    >
                        <CheckItem state={data.item.done ? 'check-square-o' : 'square-o'} />
                    </TouchableOpacity>
                </View>

                <TouchableWithoutFeedback
                    onPress={() => console.log('You touched me')}
                    underlayColor={'#AAA'}
                >
                    <CardCompras >
                        <CardRow>
                            <CardCol style={{ alignContent: "space-between" }}>
                                <TouchableOpacity style={styles.touchableQTD} onPress={() => { props.changeItemQTD(data.item, 'more' ) }}>
                                    <PlusItem color='#c93b4a'size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.touchableQTD} onPress={() => { props.changeItemQTD(data.item, 'less' ) }}>
                                    <MinusItem color='#c93b4a' size={20} />
                                </TouchableOpacity>
                            </CardCol>
                            <CardCol style={{alignContent: 'flex-start', width: '80%'}}>
                                <CardTitle style={{ textAlign: 'left' }}>{data.item.provimento.nome}</CardTitle>
                                <CardRow>
                                    <CardBody>{data.item.quantidade} unidade{data.item.quantidade > 1 && 's'}</CardBody>
                                    {data.item.validade &&
                                        <CardBody vencimento={twoWeeks > data.item.validade}> expira em: {moment(data.item.validade).format('L')}</CardBody>}
                                </CardRow>
                            </CardCol>
                        </CardRow>
                    </CardCompras>
                </TouchableWithoutFeedback>

            </SwipeRow>
    );

    return (        
        <SwipeListView data={props.value} renderItem={renderItem} style={{position: "relative" ,width:screenWidth}} />        
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
        // backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 10
    },
    rowBackTouchable: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // padding: 20


    },
    rowBackTouchableLeft: {

        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // padding: 20
        width: 75


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
    touchableLeft: {
        width: 45,
        margin: 5
    },
    touchableCheck: {
        position: "absolute",

    },
    front: {
        position: 'relative',
        right: 0,
        width: '100%'
    },
    touchableQTD:{
        height:45,
        width:45,
        borderRadius: 50,
        backgroundColor: '#dedede',
        marginVertical: 5,
        padding: 15
    }
});