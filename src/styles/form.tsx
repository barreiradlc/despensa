import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

import { cor1, cor2, cor3, cor4, cor5, cor6 } from '../constants/CORES'

const { width, height } = Dimensions.get('screen')

export const Container = styled.SafeAreaView`
  flex: 1;
`
export const ContainerScroll = styled.ScrollView``


export const FormContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

export const FormItemContainer = styled.SafeAreaView`
  justify-content: ${ props => props.keyboardOpen ? 'flex-end' : 'center' };  
  flex-direction: column;
  margin: 0 10px;
  flex:1;
`

export const LogoImage = styled.Image`
  margin: 20px;
`

export const ContainerInput = styled.View`
  width: ${width - 20}px;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 40px;
  padding-vertical: 10px;
  border-radius: 10px;
  border: 1px ${cor3} solid;
  margin-top: 10px;
`

export const Form = styled.SafeAreaView``

export const Input = styled.TextInput`
  padding-left: 20px;
  width: 100%;
  color: ${cor2};
  flex-direction: row;
  justify-content: flex-start;
  elevation: 2;
  font-size:18px;
`

export const InputEnd = styled.TextInput`
  padding-left: 0px;
  width: 100%;
  color: ${cor2};
  flex-direction: row;
  justify-content: flex-start;
  elevation: 2;
  font-size:18px;
`

export const Button = styled.TouchableOpacity`
  align-items: center;
  width: ${width - 20}px;
  justify-content: center;
  margin: 15px 0px;
  padding: 15px 0px;
  background-color: ${ props => !props.invert ? cor1 : 'transparent'};
  border-radius: 10px;
`


export const ButtonLabel = styled.Text`
  color: ${ props => !props.invert ? cor5 : cor3};
  font-weight: bold;
  font-size:17px;
  align-items: center;
`
export const ButtonAdd = styled.TouchableOpacity`
  align-items: center;
  width: ${width - 20}px;
  justify-content: center;
  margin: 15px 0px;
  padding: 15px 0px;
  background-color: ${cor2};
  border-radius: 10px;
`


export const ButtonLabelAdd = styled.Text`
  color: ${cor6};
  font-weight: bold;
  font-size:17px;
  align-items: center;
`

export const TouchableItem = styled.TouchableOpacity`  
  align-items: center;
  justify-content: center;
  elevation: 30;
  padding: 20px 35px;
  /* height: 15px; */
  color: ${ props => !props.invert ? cor5 : cor2};
`

export const TouchableItemLabel = styled.Text`
  text-align: center;  
  color: ${cor5};
  font-size:15px;
  align-items: center;
`

// BOTTOM SHEET

export const FormContainerBottomSheet = styled.SafeAreaView`
  justify-content: flex-start;  
  flex-direction: column;
  margin: 0 20px;
  /* flex:1; */
`

export const FormContainerScroll = styled.View`
  justify-content: flex-start;  
  flex-direction: column;
  margin: 0 20px;
  /* flex:1; */
`