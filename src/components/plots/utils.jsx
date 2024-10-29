export const nameMapping = {
  ligand: "Ligand",
  ecClass: "EC Class",
  organism: "Organism",
};
export function getPieChartData(selectedKey, pdbs) {
  /* 
  RC-hydrolase file naming convention
    <pdbid>_			        0
    <ligand>_			        1
    <residueNumber+chainId>_	2
    <EC number>_			    3
    <Organism number>		    4
*/
  const portion = {
    ligand: 1,
    ecClass: 3,
    organism: 4,
  };

  const map = new Map();

  pdbs.forEach((e) => {
    const name = e.replace(".pdb", "");
    const part = name.split("_")[portion[selectedKey]];
    map.set(part, map.get(part) + 1 || 1);
  });

  const labels = [];
  const data = [];
  map.forEach((value, key) => {
    labels.push(nameMapping[selectedKey] + " " + key);
    data.push(value);
  });

  return {
    labels: labels,
    datasets: [
      {
        label: "Number of protein",
        data: data,
        hoverOffset: 4,
      },
    ],
  };
}
