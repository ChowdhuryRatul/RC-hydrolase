export function getCluster(data, clusterRange, filename) {
  console.log(clusterRange);

  // dataArr will contain object with propertiew below
  // target, match, score
  const temp = data.filter(
    (e) =>
      e.score > clusterRange && (e.target === filename || e.match === filename)
  );

  const temp2 = [
    ...temp.map((e) => e.target),
    ...temp.map((e) => e.match),
  ];

  return [...new Set(temp2)];
}
