import React, { useState } from 'react'
import ServerContext from './ServerContext'

export default function ServerProvider({children}) {

let[count, setCount] = useState(0);


  return (
    <ServerContext.Provider value={{count, setCount}}>
      {children}
    </ServerContext.Provider>
  )
}
