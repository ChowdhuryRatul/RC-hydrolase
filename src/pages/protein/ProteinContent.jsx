import React from 'react'
import { useProteinContext } from './ProteinProvider'

const ProteinContent = () => {

  const {pdbId} = useProteinContext()

  return (
    <div>ProteinContent: pdbId</div>
  )
}

export default ProteinContent