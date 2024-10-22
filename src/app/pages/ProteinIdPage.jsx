import React from "react";
import { useParams } from "react-router-dom";
import ProteinProvider from "../../pages/protein/ProteinProvider";
import ProteinContent from "../../pages/protein/ProteinContent";

const ProteinIdPage = () => {
  const { pdbId } = useParams();

  return (
    <ProteinProvider pdbId={pdbId}>
      <ProteinContent />
    </ProteinProvider>
  );
};

export default ProteinIdPage;
