import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD = gql`
    mutation addReceita($receita: ReceitaInput!) {
        addReceitaMutation(receita: $receita) {
            receitum {
                id
                createdAt
                descricao
                nome
                updatedAt
                ingredientes {
                    id
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

    const [ addReceita, { data, error, loading }] = useMutation(ADD);

    React.useEffect(() => {
        if(data){
            props.success()
        }

        if(error){
            console.log(`Erro ${error}`)
        }
    }, [data, error])

    React.useImperativeHandle(ref, () => ({
        mutate: (param) => {
            
            delete param.id
            console.log(`mutate ${JSON.stringify(param)}`)

            addReceita({variables: { receita: param } })
        }
    }))


    return null
}


export default React.forwardRef(EditReceitaMutation)