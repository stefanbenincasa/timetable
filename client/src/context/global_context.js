import React, { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [globalContext, setGlobalContext] = useState({session: {}})

  return (
    <GlobalContext.Provider value={{globalContext, setGlobalContext}}>
      {children}
    </GlobalContext.Provider>
  );
}
