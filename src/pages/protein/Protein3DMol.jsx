import React, { useEffect, useRef } from "react";
import { useProteinContext } from "./ProteinProvider";

import * as ThreeDmol from "3dmol/build/3Dmol.js";

const Protein3DMol = ({
  pdbIdStructure,
  style,
  viewStyle,
  surfaceStyle,
  className,
}) => {
  const proteinRef = useRef(null);

  const { isLoading } = useProteinContext();

  useEffect(() => {
    if (proteinRef.current) {
      let config = {
        backgroundColor: "white",
        lowerZoomLimit: 200,
        upperZoomLimit: 400,
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

      viewer.setBackgroundColor("white");
      viewer.zoomTo();
      viewer.render();
    }
  }, [isLoading]);

  return <div ref={proteinRef} className={className} style={style} />;
};

export default Protein3DMol;
