import styled from 'styled-components/native'
import { cor2, cor4, cor5 } from './components'

export const Container = styled.View`
  background-color: papayawhip;
  flex: 1;
`

export const Form = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

export const LogoImage = styled.Image`
  margin: 20px;
`

export const Input = styled.TextInput`
  color: ${cor2};
  width: 100%;
  elevation: 2;
  background: #dedede;
  font-size:18px;
`

export const Button = styled.TouchableOpacity`
  margin: 15px 0px;
  padding: 10px 35px;
  elevation: ${ props => !props.invert ? 2 : 0};
  background-color: ${ props => !props.invert ? cor5 : 'transparent'};
`

export const ButtonLabel = styled.Text`
  color: ${cor4};
  font-size:15px;
`

