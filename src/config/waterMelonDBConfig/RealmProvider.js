import React from 'react'

const DespensasContext = React.createContext({})

export const DespensasProvider = DespensasContext.Provider
export const DespensasConsumer = DespensasContext.Consumer

export default DespensasContext