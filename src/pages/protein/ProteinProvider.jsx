import React, { createContext, useContext, useEffect, useState } from "react";
import { customMouseEvent, getPdbIdInfo } from "./utils";

import { parseCif } from "crystcif-parse";
import { useNavigate } from "react-router-dom";

const proteinContext = createContext(null);

const ProteinProvider = ({ children, pdbId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pdbIdStructure, setPdbIdStructure] = useState("");
  const [pdbIdInfo, setPdbIdInfo] = useState({});

  useEffect(() => {
    customMouseEvent();
    const fetchPdbId = async () => {
      const pdbData = await fetch(`https://files.rcsb.org/view/${pdbId}.pdb`)
        .then((res) => {
          if (res.status >= 300) {
            return null;
          }
          return res.text();
        })
        .catch((err) => null);
      setPdbIdStructure(pdbData);
      // console.log(pdbData)

      const pdbInfo = await fetch(`https://files.rcsb.org/view/${pdbId}.cif`)
        .then((res) => {
          if (res.status >= 300) {
            return null;
          }
          return res.text();
        })
        .catch((err) => null);

      let pdbIdInfoObj = {};
      if (pdbData && pdbInfo) {
        // we split the text because some are so long that it took more than a minute to parse
        const cifData = parseCif(
          pdbInfo.split(`# 
loop_
_struct_asym.id`)[0]
        );
        pdbIdInfoObj = getPdbIdInfo(cifData, pdbId);
      }
      setPdbIdInfo(pdbIdInfoObj);

      setIsLoading(false);
    };

    fetchPdbId();
  }, []);

  const value = { pdbId, isLoading, pdbIdStructure, pdbIdInfo };
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
