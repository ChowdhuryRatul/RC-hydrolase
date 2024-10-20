import React from 'react'
import { useParams } from "react-router-dom";

const ProteinIdPage = () => {
  const {pdbId} = useParams()

  return (
    <div>ProteinIdPage for
      <div>Pdb Id: {pdbId}</div>
    </div>
  )
}

export default ProteinIdPage