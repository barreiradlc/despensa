import styled from 'styled-components/native'
import { cor2, cor4, cor5 } from './components'

export const Container = styled.SafeAreaView`
  background-color: papayawhip;
  flex: 1;
  width: 100%;
`
export const ContainerScroll = styled.ScrollView``


export const FormContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

export const FormItemContainer = styled.View`
  justify-content: flex-start;  
  flex-direction: column;
  margin: 0 20px;
  flex:1;
`

export const LogoImage = styled.Image`
  margin: 20px;
`

export const Input = styled.TextInput`
  color: ${cor2};
  justify-content: flex-start;
  elevation: 2;
  background: #dedede;
  font-size:18px;
`

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin: 15px 0px;
  padding: 10px 35px;
  elevation: ${ props => !props.invert ? 2 : 0};
  background-color: ${ props => !props.invert ? cor5 : 'transparent'};
`


export const ButtonLabel = styled.Text`
  elevation: 29;
  color: ${cor4};
  font-size:15px;
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