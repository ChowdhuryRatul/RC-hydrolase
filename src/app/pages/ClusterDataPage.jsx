import React from "react";
import { useParams } from "react-router-dom";
import ClusterProvider from "../../pages/protein-cluster/ClusterProvider";
import ClusterContent from "../../pages/protein-cluster/ClusterContent";

const ClusterDataPage = () => {
  const { pdbId, clusterId } = useParams();
  
  return (
      <ClusterProvider pdbId = {pdbId} clusterRange = {clusterId}>
        <ClusterContent />
      </ClusterProvider>
  );
};

export default ClusterDataPage;
