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

export const ContainerEnd = styled.View`
  justify-content: flex-end;
`

export const ContainerScroll = styled.ScrollView`
  flex-direction: column;
  /* flex: 1; */
`

export const ContainerOverlayEnd = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  position: absolute;
  width: 100%;
  height: 0;
  opacity: 0.7;
  elevation: 10;
  position: absolute;
  bottom: 0;
`

export const ContainerOverlay = styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px 20px;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  elevation: 10;
`

export const CardContainer = styled.TouchableOpacity`
  margin: 10px 25px ;
  padding: 25px 10px;
  justify-content: flex-start;
  elevation: 4;
  background-color: #fff;
  border-radius: 25px;
  width: 90%;
`

export const CardContainerProvision = styled.TouchableOpacity`
  elevation: 15;
  padding: 10px 25px ;
  justify-content: flex-start;
  background-color: #fff;
`

export const TooltipEditContainer = styled.View`  
  flex-direction: column;
  justify-content: flex-start;
`
export const TooltipEditRowContainer = styled.View`  
  
  
`

export const TopContainer = styled.View`  
  justify-content: center;
`

export const LogoImage = styled.Image`
  margin: 20px;
`

export const Label = styled.Text`
  color: ${cor2};
  font-size:14px;
`

export const Title = styled.Text`
  color: ${cor2};
  font-size:18px;
  opacity: ${ props => props.opaque ? 0.4 : 1};
`

// LOADING
export const LoadingLabelContainer = styled.View`  
  flex-direction: column;
  justify-content: flex-end;
  elevation: 10;
`

export const LoadingLabel = styled.Text`
  color: ${cor2};
  font-size:18px;
  margin-top: 40px;
`

export const LoadingLabelBold = styled.Text`
  color: ${cor2};
  font-size:18px;
  margin-top: 40px;
  font-weight: bold;
  opacity: 0.4;
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

// QUANTITY
export const QuantityContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const QuantityTouchable = styled.TouchableOpacity`
  padding: 15px;
  opacity: ${ props => props.one ? 0.4 : 1};
`