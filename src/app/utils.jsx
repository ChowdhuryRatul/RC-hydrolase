export function getPdbs(dataArr) {
    // dataArr will contain object with propertiew below
    // target, match, score
    const temp = [
      ...dataArr.map((e) => e.target),
      ...dataArr.map((e) => e.match),
    ];
  
    const pdbs = [...new Set(temp)];
  
    return pdbs;
  }
  