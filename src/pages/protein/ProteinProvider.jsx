import React, { createContext, useContext, useEffect, useState } from "react";
import { customMouseEvent, getPdbIdInfo } from "./utils";

import { parseCif } from "crystcif-parse";

import { useGlobalAppContext } from "../../app/AppProvider";
import { getPdbFileByPdbId } from "../../utils/utils";

const proteinContext = createContext(null);

const ProteinProvider = ({ children, pdbId }) => {
  const { pdbs } = useGlobalAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [pdbIdStructure, setPdbIdStructure] = useState(null);
  const [pdbIdInfo, setPdbIdInfo] = useState(null);
  const [information, setInformation] = useState(null);
  const [reactivePdb, setReactivePdb] = useState(null);
  const [sequence, setSequence] = useState(null);

  useEffect(() => {
    customMouseEvent(); // <-- remove 3dMol zoom functionality
    const fetchPdbId = async () => {
      // get information from RC-Hydrolase
      const name = getPdbFileByPdbId(pdbs, pdbId);
      if (name) {
        const portion = name.split("_");
        setInformation({
          ligand: portion[1],
          ecClass: portion[3],
          organism: portion[4],
        });

        Promise.all([
          fetch(`https://files.rcsb.org/view/${pdbId}.pdb`),
          fetch(
            // `https://pixf-services.onrender.com/api/v1/rc-hydrolase/cif/${pdbId}`
            `https://agrivax.studio/api/v1/rc-hydrolase/cif/${pdbId}`,
          ),
          fetch(
            // "https://pixf-services.onrender.com/api/v1/rc-hydrolase/pdbs/" +
            "https://agrivax.studio/api/v1/rc-hydrolase/pdbs/" + name + ".pdb",
          ),
          fetch(
            // "https://pixf-services.onrender.com/api/v1/rc-hydrolase/sequence/" +
            "https://agrivax.studio/api/v1/rc-hydrolase/sequence/" +
              name +
              ".pdb",
          ),
        ]).then((values) => {
          Promise.all([
            values[0].text(),
            values[1].json(),
            values[2].json(),
            values[3].json(),
          ]).then((values) => {
            setPdbIdStructure(values[0]);
            setPdbIdInfo(values[1].data);
            setReactivePdb(values[2].data);
            setSequence(values[3].data);
            setIsLoading(false);
          });
        });
      } else {
        setIsLoading(false);
      }
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
