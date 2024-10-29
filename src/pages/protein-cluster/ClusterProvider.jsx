import React, { createContext, useContext, useEffect, useState } from "react";
import { useGlobalAppContext } from "../../app/AppProvider";
import { getCluster } from "./utils";
import { getPdbFileByPdbId } from "../../utils/utils";

const clusterContext = createContext(null);

const ClusterProvider = ({ children, pdbId, clusterRange }) => {
  const { data, pdbs } = useGlobalAppContext();

  const [clusterPdbs, setClusterPdbs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data && pdbs) {
      setClusterPdbs(
        getCluster(data, clusterRange, getPdbFileByPdbId(pdbs, pdbId) + ".pdb")
      );
      setIsLoading(false);
    }
  }, [data, pdbs]);

  const value = { clusterPdbs, isLoading, pdbId, clusterRange };
  return (
    <clusterContext.Provider value={value}>{children}</clusterContext.Provider>
  );
};

export function useClusterContext() {
  const context = useContext(clusterContext);
  if (!context) {
    console.error("useProteinContext must be used within a ProteinProvider");
  }

  return context;
}

export default ClusterProvider;
