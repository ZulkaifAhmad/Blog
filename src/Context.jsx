import React, { useState } from 'react'
import { useContext , createContext } from 'react'

const UserContext = createContext();

export const userContext = ()=> {
    return useContext(UserContext);
}

function Context({children}) {
    let [state , setState] = useState(true)
    
  return (
    <>
        <UserContext.Provider value={{state , setState}}>
            {children}
        </UserContext.Provider>
    </>
  )
}

export default Context