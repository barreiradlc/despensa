import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const EDIT = gql`
    mutation updateReceita($id: ID!, $receita: ReceitaInput!) {
        updateReceitaMutation(id: $id, receita: $receita) {
            receitum {
                id
                createdAt
                descricao
                nome
                updatedAt
                ingredientes {
                    id
                    medida
                    provimento {
                        id
                        nome
                    }
                }
                passos {
                    id
                    descricao
                    posicao
                }
            }
        }
    }
  
`

function EditReceitaMutation( props, ref ){

    const [ updateReceita, { data, error, loading }] = useMutation(EDIT);

    React.useEffect(() => {
        if(data){
            props.success()
        }

        if(error){
            console.log(`Erro ${JSON.stringify(error)}`)
            props.sendError('editar')
        }
    }, [data, error])

    React.useImperativeHandle(ref, () => ({
        mutate: (param) => {
            console.log(`mutate ${JSON.stringify(param)}`)
            updateReceita({variables: param})
        }
    }))


    return null
}


export default React.forwardRef(EditReceitaMutation)