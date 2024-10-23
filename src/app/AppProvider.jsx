import React, { createContext, useContext } from "react";

const globalAppContext = createContext(null);

const AppProvider = ({ children }) => {

  const value = {};
  return (
    <globalAppContext.Provider value={value}>
      {children}
    </globalAppContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalAppContext = () => {
  const context = useContext(globalAppContext);
  if (!context) {
    console.error("useGlobalAppContext must be used within a AppProvider");
  }
  return context;
};

export default AppProvider;
