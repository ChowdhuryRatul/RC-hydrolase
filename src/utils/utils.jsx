

// Load 3 information 
export function getPdbFileByPdbId(pdbs, pdbId){
    const list = []
  
    pdbs.forEach((e) => {
      if (e.toUpperCase().includes(pdbId.toUpperCase())) {
        list.push(e)
      }
    })
  
    if (list.length > 1) {
      console.error("Warning: found multiple reactive center with the same pdb.")
    }
    if (list.length == 0) {
      return null
    }
  
    const name = list[0].replace(".pdb", "")
    return name
  }