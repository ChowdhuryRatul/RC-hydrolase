export function getCluster(data, clusterRange, filename) {
  // dataArr will contain object with propertiew below
  // target, match, score
  const temp = data.filter(
    (e) =>
      e.score > clusterRange && (e.target === filename || e.match === filename) 
  );

  const temp2 = [
    ...temp.map((e) => e.target + "_" + e.score.toString()),
    ...temp.map((e) => e.match + "_" + e.score.toString()),
  ].filter((e) => !e.includes(filename));

  return [...new Set(temp2)];
}
