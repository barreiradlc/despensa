import styled from 'styled-components/native'
import React from 'react'

const cor1 = '#c93b4a'
const cor2 = '#4e1017'
const cor3 = '#dedede'
const cor4 = '#fff'
const cor5 = '#555'
const cor6 = '#999999'
const cor7 = '#000'

export const FormContainer = styled.SafeAreaView`
  background-color: #fff
  flex: 1 
`
  
export const FormContainerScroll = styled.ScrollView`
  background-color: #fff
  flex: 1 
  padding:40px
  
`
  
export const FormLabel = styled.Text`
  marginHorizontal: 5px
  textAlign: left
  padding: 0px
`
  
export const FormButton = styled.TouchableOpacity`
    textAlign: left
    background: ${props => props.active ? cor1 : cor4 }
    flex: 1
    elevation: ${props => props.flat ? 0 : 5 }
    borderRadius: 10px
`

export const FormButtonLabel = styled.Text`
  fontSize: 20px
  fontWeight: ${props => props.active ? 'bold' : 'normal' }
  color: ${props => props.active ? cor4 : cor5 }
  textAlign: center
  marginVertical: 10px
  width: 100%
  padding: 10px
  
`

export const FormButtonGroup = styled.View`
  alignItems: stretch
  flex-direction: row
  justifyContent: space-between
  marginVertical: 20px
`
  
export const FormTouchable = styled.TouchableOpacity`
  flexDirection: row
  justifyContent: center
  marginTop: 15px
  marginBottom: 25px

  padding: 0px
`

export const FormTouchableItem = styled.TouchableOpacity`
  alignItems:center
  justifyContent: center
  
  marginHorizontal:5px
`
export const FormTouchableDate = styled.TouchableOpacity`
  alignItems:center
  justifyContent: center
`
export const FormTouchableAdd = styled.TouchableHighlight`
  alignItems:flex-end
  justifyContent: flex-end
  
`


export const FormIconContainer = styled.View`
  flexDirection: row
  width: 100%
  justifyContent: space-evenly
`

export const FormTouchableIcon = styled.TouchableOpacity`
  flexDirection: row
  marginVertical: 35px
  padding: 10px
  border-radius: 50px
  width: 60px
  height: 60px
  alignItems: center
  justify-content: center
`
  
export const FormTouchableInner = styled.Text`
  textAlign: center
  margin: 0px
  padding: 0px
`
  
export const FormAssetContainer = styled.View`
  margin:10px
  padding:10px
  borderWidth: 2px
  borderColor: #dedede
  borderRadius: 250px
  backgroundColor: rgba(255, 133, 133, 0.75)
`

export const FormAsset = styled.Image`
  borderRadius: ${ props => props.round ? '50px' : '0px'  }
  padding: ${ props => props.round ? '80px' : '0px'  }
  width: 100%
  height: 200px
  resizeMode: contain
  marginVertical: 40px
`
  
export const FormInput = styled.TextInput`
  background: ${cor3}
  paddingVertical: 15px
  paddingHorizontal: 20px
  marginBottom: 15px
  borderRadius: 15px
`

export const FormInputTextArea = styled.TextInput`
  background: ${cor3}
  paddingVertical: 15px
  paddingHorizontal: 20px
  marginBottom: 15px
  borderRadius: 15px
  height: 100px
`

export const FormInputReadOnly = styled.Text`
  background: ${cor3}
  paddingVertical: 20px
  paddingHorizontal: 20px
  marginBottom: 15px
  borderRadius: 15px
  width: 100%
  color: ${props => props.placeholder ? cor6 : cor7}
`
  
  
export const ErrorLabel = styled.Text`
  color: #fff
  padding: 10px
  fontWeight: bold
`

export const ErrorInnerCard = styled.View`
`
  
export const ErrorCard = styled.View`
  borderRadius: 15px
  marginVertical: 25px
  padding: 10px
  background: #f7d139
  elevation:3
  flexDirection: row
`
  
export const Card = styled.View`
  background: #fff
  marginVertical: 10px
  padding: 25px
  borderRadius: 10px
  elevation:3
`
  
export const CardTitle = styled.Text`
  fontSize: 20px
  fontWeight: bold
  marginBottom: 15px
`
export const UserLabel = styled.Text`
  fontSize: 15px
  fontWeight: ${props => props.active ? 'bold' : 'normal' }
  color: ${props => props.active ? cor4 : cor5 }
  width: 100%
  flex: 1
  elevation: 0
  
`


export const CardInner = styled.View`
  borderLeftColor: ${cor1}
  borderLeftWidth: 5px
  background: ${props => props.active ? cor1 : cor4 }
  marginVertical: 10px
  padding: 25px
  borderRadius: 10px
  elevation: ${props => props.flat ? 0 : 3 }
`
  
export const CardInnerTitle = styled.Text`
  fontSize: 20px
  fontWeight: bold
  marginBottom: 15px
`
    
export const Wrap = styled.View`
    flexWrap: wrap
    flexDirection:row
`

export const RowInner = styled.TouchableOpacity`
    backgroundColor:${cor1}
    flexDirection:row
    alignItems: center
    justify-content: center
    padding:5px
    margin: 5px
    height:50px
    borderRadius:5px
`
export const RowInnerAdd = styled.TouchableOpacity`
    backgroundColor:${cor1}
    flexDirection:row
    alignItems: flex-end
    justify-content: flex-end
    padding:5px
    margin:  5px
    borderRadius:5px
`

export const InnerText = styled.Text`
    fontWeight: bold
    alignSelf:center
    paddingHorizontal: 20px
    borderRadius: 15px
    color: #fff
  `
export const InnerHeader = styled.Text`
    fontWeight: bold
    alignSelf:flex-start
    
    borderRadius: 15px
    color: #555
  `
  
  export const ErrorTouchable = styled.TouchableOpacity`
  alignItems: flex-end
  elevation:5
  `
  // ícones
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  
  export const Facebook = () => <FontAwesome name="facebook-square" size={30} color="#fff" />;
  export const Google = () => <FontAwesome name="google-plus" size={30} color="#fff" />;
export const Close = () => <FontAwesome name="close" size={30} color="#555" />;
