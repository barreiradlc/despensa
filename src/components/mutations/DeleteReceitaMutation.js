import React from 'react';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const DELETE = gql`
    mutation deleteReceita($id: ID!){
        deleteReceitaMutation(id: $id) {
            id
        }
    }
`

function DeleteReceitaMutation( props, ref ){

    const [ deleteReceita, { data, error, loading }] = useMutation(DELETE);

    React.useEffect(() => {
        if(data){
            props.success(true)
        }

        if(error){
            console.log(`Erro ${error}`)
        }
    }, [data, error])

    React.useImperativeHandle(ref, () => ({
        mutate: (param) => {            
            console.log(`mutate ${JSON.stringify(param)}`)
            deleteReceita({variables: { id: param.id } })
        }
    }))


    return null
}


export default React.forwardRef(DeleteReceitaMutation)