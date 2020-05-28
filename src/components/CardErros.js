import React from 'react'
import { ErrorInnerCard, Close, ErrorTouchable, ErrorCard, ErrorLabel } from '../components/styled/Form'

function CardErros({dismiss, erros}){

    function dismissErrors(){
        console.log('clicou')
        dismiss()
    }

    if(erros.length === 0 ){
        return null
    }

    return (
        <>

        <ErrorCard>
            <ErrorInnerCard>
            {erros.map(( erro ) => 
                <ErrorLabel>{erro}</ErrorLabel>
            )}
            </ErrorInnerCard>

            <ErrorTouchable onPress={dismissErrors} >
                <Close />
            </ErrorTouchable>
        </ErrorCard>
        </>
    )
}

export default CardErros