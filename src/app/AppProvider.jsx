import React, { createContext, useContext, useEffect, useState } from "react";

import { rcHydrolaseData } from "../lib/staticData";
import { getPdbs } from "./utils";

const globalAppContext = createContext(null);

const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
const AppProvider = ({ children }) => {

  const [data, setData] = useState(null);
  const [pdbs, setPdbs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await wait(300);
      setData(rcHydrolaseData);
      setPdbs(getPdbs(rcHydrolaseData));

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const value = { data, pdbs, isLoading };
  
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
