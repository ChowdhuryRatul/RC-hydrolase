import React, { createContext, useContext, useEffect, useState } from "react";
import { customMouseEvent, getPdbIdInfo } from "./utils";

import { parseCif } from "crystcif-parse";

import { useGlobalAppContext } from "../../app/AppProvider";
import { getPdbFileByPdbId } from "../../utils/utils";

const proteinContext = createContext(null);

const ProteinProvider = ({ children, pdbId }) => {
  const { pdbs } = useGlobalAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [pdbIdStructure, setPdbIdStructure] = useState("");
  const [pdbIdInfo, setPdbIdInfo] = useState({});
  const [information, setInformation] = useState(null);
  const [reactivePdb, setReactivePdb] = useState(null);
  const [sequence, setSequence] = useState(null);

  useEffect(() => {
    customMouseEvent(); // <-- remove 3dMol zoom functionality
    const fetchPdbId = async () => {
      // get full protein pdb
      const pdbData = await fetch(`https://files.rcsb.org/view/${pdbId}.pdb`)
        .then((res) => {
          if (res.status >= 300) {
            return null;
          }
          return res.text();
        })
        .catch((err) => null);
      setPdbIdStructure(pdbData);

      // get pdb cif data (pdb information)
      const pdbInfo = await fetch(
        `https://pixf-services.onrender.com/api/v1/rc-hydrolase/cif/${pdbId}`
      )
        .then((res) => {
          if (res.status >= 300) {
            return null;
          }
          return res.json();
        })
        .catch((err) => null);

      let pdbIdInfoObj = pdbInfo ? pdbInfo.data : null;
      setPdbIdInfo(pdbIdInfoObj);

      // get information from RC-Hydrolase
      const name = getPdbFileByPdbId(pdbs, pdbId);
      if (name) {
        const portion = name.split("_");
        setInformation({
          ligand: portion[1],
          ecClass: portion[3],
          organism: portion[4],
        });

        const reactiveData = await fetch(
          "https://pixf-services.onrender.com/api/v1/rc-hydrolase/pdbs/" +
            name +
            ".pdb"
        )
          .then((res) => {
            if (res.status >= 300) {
              return null;
            }
            return res.json();
          })
          .catch((err) => null);
        setReactivePdb(reactiveData.data);

        // get sequence
        const sequenceData = await fetch(
          "https://pixf-services.onrender.com/api/v1/rc-hydrolase/sequence/" +
            name +
            ".pdb"
        )
          .then((res) => {
            if (res.status >= 300) {
              return null;
            }
            return res.json();
          })
          .catch((err) => null);
        setSequence(sequenceData.data);
      }

      setIsLoading(false);
    };
    if (pdbs) {
      fetchPdbId();
    }
  }, [pdbs]);

  const value = {
    pdbId,
    isLoading,
    pdbIdStructure,
    pdbIdInfo,
    information,
    reactivePdb,
    sequence,
  };
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
