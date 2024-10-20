import React from "react";
import { useParams } from "react-router-dom";

const ClusterDataPage = () => {
  const { pdbId, clusterId } = useParams();
  
  return (
    <div>
      ClusterDataPage for
      <div>Pdb Id: {pdbId}</div>
      <div>Cluster: {clusterId}</div>
    </div>
  );
};

export default ClusterDataPage;
