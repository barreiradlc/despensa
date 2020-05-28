import React from 'react'
import { ActivityIndicator } from 'react-native'
import { ColumnContainer, HeaderLabel, RowContainer } from '../styled/Geral'

export function LoadingOverlay() {
  return (
    <RowContainer>
      <ColumnContainer>
      
        <HeaderLabel>Aguarde</HeaderLabel>
        
            <ActivityIndicator color='#4e1017' size={60} />
        

      </ColumnContainer>
    </RowContainer>
  )
}

export function Empty() {
  return (
    <RowContainer>
      <ColumnContainer>
      
        <HeaderLabel>Aguarde</HeaderLabel>
        
        <ActivityIndicator color='#4e1017' size={60} />
        

      </ColumnContainer>
    </RowContainer>
  )
}


export function LoadingSmall() {
  return (
    <RowContainer>
      
        <HeaderLabel>Aguarde</HeaderLabel>
        <ActivityIndicator size={60} />

    </RowContainer>
  )
}
