import React from "react";
import { useParams } from "react-router-dom";
import ProteinContent from "../../pages/protein/ProteinContent";
import ProteinProvider from "../../pages/protein/ProteinProvider";

const ProteinIdPage = () => {
  const { pdbId } = useParams();

  return (
    <ProteinProvider pdbId={pdbId}>
      <ProteinContent />
    </ProteinProvider>
  );
};

export default ProteinIdPage;
