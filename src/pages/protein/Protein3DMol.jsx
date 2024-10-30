import React, { useEffect, useRef } from "react";
import { useProteinContext } from "./ProteinProvider";

import * as ThreeDmol from "3dmol/build/3Dmol.js";

const Protein3DMol = ({
  style,
  pdbIdStructure,
  viewStyle,
  surfaceStyle,
  partialViewStyle,
  className,
}) => {
  const proteinRef = useRef(null);

  const { isLoading } = useProteinContext();

  useEffect(() => {
    if (proteinRef.current) {
      let config = {
        backgroundColor: "#f0f0f0",
        disableFog: true,
      };
      const viewer = ThreeDmol.createViewer(proteinRef.current, config);
      viewer.addModel(pdbIdStructure, "pdb");
      if (viewStyle) {
        viewer.setStyle(...viewStyle);
      }
      if (surfaceStyle) {
        viewer.addSurface(...surfaceStyle);
      }

      if (partialViewStyle) {
        viewer.setStyle(...partialViewStyle);
      }

      viewer.zoomTo();
      viewer.render();
    }
  }, [isLoading]);

  return <div ref={proteinRef} className={className} style={style} />;
};

export default Protein3DMol;
