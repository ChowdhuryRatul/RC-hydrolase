import React, { createContext, useContext } from "react";

const proteinContext = createContext(null);

const ProteinProvider = ({ children, pdbId }) => {
  const value = { pdbId };

  return (
    <proteinContext.Provider value={value}>{children}</proteinContext.Provider>
  );
};

export function useProteinContext() {
  const context = useContext(proteinContext);
  if (!context) {
    console.error("useProteinContext must be used within a ProteinProvider");
  }
  return context;
}

export default ProteinProvider;
