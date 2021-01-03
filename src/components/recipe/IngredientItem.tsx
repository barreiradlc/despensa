import { useQuery } from '@apollo/client';
import { Picker } from '@react-native-picker/picker';
import { EnumValueNode } from 'graphql';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Divider } from 'react-native-elements';
import { UNITS_ENUM } from '../../constants/UNITS_ENUM';
import { IngredientInterface } from '../../context/RecipeFormContext';
import { getProvision, ProvisionInterface } from '../../services/local/PantryLocalService';
import { RowContainer } from '../../styles/components';

import { FormContainerBottomSheet, Input, TouchableItem, TouchableItemLabel } from '../../styles/form';
import { PROVISIONS } from '../queries/provisionListQuery';



const IngredientItem: React.FC = ({ item, handleChangeIngredient }) => {

    const provisionRef = useRef()

    const [ingredient, setIngredient] = useState(item)

    const [selected, setSelected] = useState(!!item.provision)
    const [query, setQuery] = useState('')
    const [selectProvision, setSelectProvision] = useState(false)

    useEffect(() => {
        handleChangeIngredient(ingredient)
    }, [ingredient])

    const { loading, error, data, refetch } = useQuery(PROVISIONS, {
        variables: {
            queryListInput: {
                query,
                take: 3
            }
        },
    });

    const showResults = useMemo(() => {
        console.log(!!query.length && selectProvision)

        if (!!query.length && selectProvision) {
            return false
        }
        return true
    }, [query, selectProvision])

    const provisions = useMemo(() => {
        if (data) {
            return data.provisions
        }
        return []
    }, [data])

    function handleGetHeight() {
        console.log('Provisions')
        console.log(!!provisions.length)

        if (!!provisions.length && !!query.length) {
            return 80 * provisions.length
        }
        return 45
    }

    function handleSearchProvision() {
        setSelected(false)
        setQuery(ingredient.provision.name)
        setTimeout(() => {
            provisionRef.current.focus()
        }, 500)
    }

    function handleSelectQuery(provision: ProvisionInterface) {
        console.log(provision)
        handleChange(provision, 'provision')
        setSelected(true)
    }

    function handleInputChange(event: any, attr: string) {
        handleChange(event.nativeEvent.text, attr)        
    }

    function handleChange(value: any, attr: string) {
        setIngredient({ ...ingredient, [attr]: value })
    }

    function handleOnBlur() {
        setSelectProvision(false)
        if(ingredient.provision){
            setSelected(true)
        }
    }
    
    async function handleOnBlurItem() {
        setSelectProvision(false)
        if(ingredient.provision){
            setSelected(true)
        } else {
            const provision = await getProvision({ name: query })
            handleChange(provision, 'provision')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            if (provisionRef.current) {
                provisionRef.current.focus()
            }
        }, 500)
    }, [])

    return (
        <FormContainerBottomSheet
            style={{
                elevation: 5,
                paddingBottom: selectProvision ? 10 + (10 * provisions.length) : 10
            }}
        >

            {/* {i !== 0 && <Divider style={{ height: 1, elevation: 5 }} />} */}

            {/* TODO tipar provision */}

            {selected ?
                <TouchableItem
                    invert
                    onPress={handleSearchProvision}
                >
                    <TouchableItemLabel >{ingredient.provision.name}</TouchableItemLabel>
                </TouchableItem>
                :
                <View style={{
                    // flex: 1,
                    height: selectProvision ? handleGetHeight() : 45,
                    justifyContent: `flex-start`,
                    flexDirection: 'column',
                    marginTop: 15,
                    marginBottom: 15,
                    elevation: 25,
                    zIndex: 900,
                }}>
                    <Autocomplete
                        listContainerStyle={{
                            elevation: 26,
                            zIndex: 901,
                            position: 'absolute',
                            top: 50,
                            // marginBottom: 175,                        
                            backgroundColor: '#fff',
                            width: '100%',
                            borderColor: 'transparent',
                            borderBottomWidth: 0
                        }}
                        listStyle={{
                            margin: 0,
                            backgroundColor: '#fff',
                            width: '100%',
                            borderColor: 'transparent',
                            borderBottomWidth: 0,
                            // elevation: 24,
                        }}
                        containerStyle={{
                            // elevation: 25,
                            // height: 20,
                            backgroundColor: '#fff',
                            borderColor: 'transparent',
                            borderBottomWidth: 0
                        }}
                        style={{
                            backgroundColor: '#dedede',
                            borderColor: 'transparent',
                            fontSize: 18,
                            borderBottomWidth: 0
                        }}
                        inputContainerStyle={{
                            borderColor: 'transparent',
                        }}
                        // autoFocus={focus}                        
                        placeholder="Item"
                        keyboardShouldPersistTaps='handled'
                        hideResults={showResults}

                        data={provisions}
                        defaultValue={query}
                        onStartShouldSetResponder={() => {
                            return true;
                        }}
                        ref={provisionRef}
                        renderTextInput={() =>
                            <Input
                                ref={provisionRef}
                                placeholder='Item'
                                value={query}
                                // onBlur={handleOnBlurItem}
                                onChangeText={(e: any) => { setQuery(e), setSelectProvision(true) }}
                                autoCapitalize='none'
                            />
                        }
                        onChangeText={text => { setQuery(text), setSelectProvision(true), setItemIndex(i) }}
                        renderItem={({ item: provision, index }) => {

                            console.log({ index })

                            return (
                                <>
                                    {index !== 0 && <Divider />}
                                    <TouchableItem
                                        key={provision.id}
                                        invert
                                        onPress={() => handleSelectQuery(provision)}
                                    >
                                        <TouchableItemLabel >{provision.name}</TouchableItemLabel>
                                    </TouchableItem>
                                </>
                            )
                        }}
                    />
                </View>

            }


            <RowContainer>
                {/* <Input
                    onBlur={handleOnBlur}
                    // ref={provisionOfflineRef}
                    placeholder='Medida'
                    value={ingredient.unit}
                    onChange={(e: any) => { handleInputChange(e, 'unit') }}
                    autoCapitalize='none'
                /> */}
                <Picker
                    selectedValue={ingredient.unit}
                    style={{height: 50, width: '50%'}}
                    onValueChange={(itemValue, itemIndex) =>
                        handleChange(itemValue, 'unit')
                    }>
                    
                    {UNITS_ENUM.map(( unit ) => 
                        <Picker.Item label={unit.label} value={unit.value} />
                    )}
                    
                </Picker>
                
                <Input
                    onBlur={handleOnBlur}
                    // ref={provisionOfflineRef}
                    placeholder='Quantidade'
                    value={String(ingredient.quantity) || 1}
                    onChange={(e: any) => { handleInputChange(e, 'quantity') }}
                    autoCapitalize='none'
                />
            </RowContainer>

        </FormContainerBottomSheet>
    );
}

export default IngredientItem;