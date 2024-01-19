import React, { useState, useEffect, useMemo } from 'react'

const PresaleContextTemplate = {
  presaleData: String,
  setPresaleData: (requestData) => {},
}
const PresaleContext = React.createContext(PresaleContextTemplate)

function PresaleProvider(props) {
  const [presaleData, setPresaleData] = useState('')
  useEffect(() => {
    console.log('presaleData', presaleData)
  }, [presaleData])

  const contextValue = useMemo(() => {
    return {
      presaleData,
      setPresaleData,
    }
  }, [presaleData, setPresaleData])

  return (
    <PresaleContext.Provider value={contextValue}>
      {props.children}
    </PresaleContext.Provider>
  )
}

export { PresaleContext }
export default PresaleProvider
