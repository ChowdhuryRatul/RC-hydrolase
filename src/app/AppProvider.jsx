import React, { createContext, useContext, useEffect, useState } from "react";

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
      // const rcData = await fetch("https://pixf-services.onrender.com/api/v1/rc-hydrolase/pairs")
      const rcData = await fetch(
        "https://agrivax.studio/api/v1/rc-hydrolase/pairs",
      )
        .then((res) => {
          if (res.status >= 300) {
            return null;
          }
          return res.json();
        })
        .catch((err) => null);

      setData(rcData.data);
      setPdbs(getPdbs(rcData.data));

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
