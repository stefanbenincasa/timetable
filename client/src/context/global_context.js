import React, { createContext, useContext, useState } from 'react';

// Create a new context
const GlobalContext = createContext();

// Custom hook to use the context
export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [globalContext, setGlobalContext] = useState();

  return (
    <GlobalContext.Provider value={{globalContext, setGlobalContext}}>
      {children}
    </GlobalContext.Provider>
  );
}
