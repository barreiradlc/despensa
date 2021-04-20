import styled from 'styled-components/native'
import { cor1, cor2, cor3, cor4, cor5, cor6 } from '../../constants/CORES'

// export const cor1 = '#c93b4a'
// export const cor2 = '#4e1017'
// export const cor3 = '#dedede'
// export const cor4 = '#fff'
// export const cor5 = '#555'
// export const cor6 = '#999999'
export const cor7 = '#000'


// OPTIONS

export const ButtonOptions = styled.TouchableOpacity`
  margin: 4px 0;
  align-items: center;  
  justify-content: center;    
  background-color: ${ props => !props.invert ? cor1 : 'transparent'};  
`

export const ButtonOptionsLabel = styled.Text`
  color: ${ props => !props.invert ? cor5 : cor3};
  font-weight: bold;
  font-size:17px;
  align-items: center;
`

// GERAL
export const Container = styled.View`
  flex: 1;
  justify-content: center;
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
  background: #fff
`

export const CardContainerOuter = styled.View`
  margin: 0 25px; 
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-color: #fff;
  bottom: 5;
  z-index: -1;
`

export const CardContainer = styled.TouchableOpacity`
  width: 90%;
  margin: 10px 25px ;
  padding: 25px 25px;
  justify-content: flex-start;
  
  background-color: ${cor1};
  border-radius: 25px;
  border-radius: 25px;  
`
export const CardRowContainerInner = styled.View`
  margin: 0 20px;
  padding: 5px 5px;
  width: 90%;
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  justify-content: space-between; 
`

export const CardRowContainer = styled.TouchableOpacity`
  margin: 0 15px;
  padding: 15px 0;
  justify-content: flex-start;
  flex-direction: row;
  background-color: #fff;
`
export const AddShoppingItemTouchable = styled.TouchableOpacity`
  elevation: -2;
  z-index: -2;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  margin: 0 20px;
  padding: 10px 15px 15px 15px;
  width: 50%;
  justify-content: center;
  flex-direction: row;
  background-color: ${cor6};
  align-self: center;
`

export const RowContainer = styled.View`
  justify-content: space-between;

  flex-direction: row;  
`

export const ColContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`

export const CardInnerContainer = styled.View``

export const CardColContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`

export const CardItemProvision = styled.TouchableOpacity`
  elevation: 15;
  background-color: #fff;
  padding: 10px 25px ;
`

export const CardContainerProvision = styled.TouchableOpacity`
  justify-content: flex-start;
`

export const TooltipEditContainer = styled.View`  
  flex-direction: column;
  justify-content: flex-start;
`
export const TooltipEditRowContainer = styled.View`  
  elevation: 35;
  
`

export const TopContainer = styled.View`  
  justify-content: center;
  margin: 20px;
`

export const LogoImage = styled.Image`
  margin: 20px;
`

export const Label = styled.Text`
  color: ${props => props.color ? props.color : cor5};
  font-weight: bold;
  font-size:12px;
  margin-top: 5px;
  opacity: ${props => props.opaque ? 0.4 : 1};
`

export const Title = styled.Text`
  color: ${props => props.color ? props.color : cor5};
  font-size:18px;
  font-weight: bold;
  opacity: ${props => props.opaque ? 0.4 : 1};
`

// LOADING
export const LoadingLabelContainer = styled.View`  
  flex-direction: column;
  elevation: 10;
`

export const LoadingLabel = styled.Text`
  margin-top: 10px;
  color: ${cor4};
  font-size:32px;
  font-weight: bold;
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
  font-size:16px;
  margin-top: 40px;
`

export const ErrorTitle = styled.Text`
  color: ${cor2};
  font-size:32px;
  margin-top: 25px;
  margin-bottom: 10px;
`

// QUANTITY
export const QuantityContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const QuantityTouchable = styled.TouchableOpacity`
  padding: 15px;
  opacity: ${props => props.one ? 0.4 : 1};
`

export const ActionTouchable = styled.TouchableOpacity`
  padding: 15px;
  opacity: ${props => props.done ? 0.4 : 1};
`