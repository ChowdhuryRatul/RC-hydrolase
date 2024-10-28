import React, { createContext, useContext } from "react";


const databaseContext = createContext(null);

const DatabaseProvider = ({ children }) => {

  const value = { };

  return (
    <databaseContext.Provider value={value}>
      {children}
    </databaseContext.Provider>
  );
};

export function useDatabaseContext() {
  const context = useContext(databaseContext);
  if (!context) {
    console.error("useDatabaseContext must be used within a DatabaseProvider");
  }
  return context;
}

export default DatabaseProvider;
