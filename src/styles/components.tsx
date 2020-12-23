import styled from 'styled-components/native'

export const cor1 = '#c93b4a'
export const cor2 = '#4e1017'
export const cor3 = '#dedede'
export const cor4 = '#fff'
export const cor5 = '#555'
export const cor6 = '#999999'
export const cor7 = '#000'


// GERAL
export const Container = styled.View`
  background-color: papayawhip;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px 20px;
`

export const ContainerScroll = styled.ScrollView`
  background-color: papayawhip;
  height: 20px;
  /* flex: 1; */
  /* justify-content: space-evenly; */
  /* align-items: center; */
  padding: 10px 20px;
`

export const ContainerOverlay = styled.View`
  background-color: papayawhip;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px 20px;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
`

export const TopContainer = styled.View`  
  justify-content: center;
`

export const LogoImage = styled.Image`
  margin: 20px;
`

// LOADING
export const LoadingLabelContainer = styled.View`  
  flex-direction: row;
`

export const LoadingLabel = styled.Text`
  color: ${cor2};
  font-size:18px;
  margin-top: 40px;
`

// LOADING
export const ErrorTouchableContainer = styled.View`  
  justify-content: space-evenly;
`

export const ErrorTouchable = styled.TouchableOpacity`
`

export const ErrorLabel = styled.Text`
  color: ${cor2};
  font-size:14px;
  margin-top: 40px;
`

export const ErrorTitle = styled.Text`
  color: ${cor2};
  font-size:18px;
  margin-top: 40px;
`