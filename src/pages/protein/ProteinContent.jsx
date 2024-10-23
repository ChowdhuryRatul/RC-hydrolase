import React from "react";
import { useProteinContext } from "./ProteinProvider";

// to visualize protein structure (similar to Jmol)
import * as ThreeDmol from "3dmol/build/3Dmol.js";

import { Button, Flex, Spin } from "antd";
import Protein3DMol from "./Protein3DMol";
import "./styles.css";
import { pdbListItem } from "./utils";

import { Empty } from "antd";

const ProteinContent = () => {
  const { pdbId, isLoading, pdbIdStructure, pdbIdInfo } = useProteinContext();

  return (
    <>
      {isLoading ? (
        <div>
          <Spin tip="Loading protein..." spinning={isLoading} fullscreen />
        </div>
      ) : !pdbIdStructure ? (
        <Flex style={{ height: "100%" }} justify="center" align="center">
          <Empty  description= {"No protein of pdb id found"}/>
        </Flex>
      ) : (
        <>
          <h1>
            <a
              href={`https://www.rcsb.org/structure/${pdbId}`}
              target="_blank"
              rel="noopener"
            >
              {pdbId}
            </a>
          </h1>
          <ul style={{ listStyleType: "none" }}>
            {pdbListItem
              .filter((e) => pdbIdInfo[e.prop])
              .map((e, i) => {
                const key = e.prop + i.toString();
                return (
                  <li key={key}>
                    <span style={{ fontWeight: "bold" }}>{e.text}</span>:{" "}
                    {pdbIdInfo[e.prop]}
                  </li>
                );
              })}
          </ul>
          <Flex justify="center" align="center" gap={24}>
            <Button
              onClick={() => {
                console.log("To be implement");
              }}
            >
              Cluster 60%
            </Button>
            <Button
              onClick={() => {
                console.log("To be implement");
              }}
            >
              Cluster 70%
            </Button>
            <Button
              onClick={() => {
                console.log("To be implement");
              }}
            >
              Cluster 80%
            </Button>
            <Button
              onClick={() => {
                console.log("To be implement");
              }}
            >
              Cluster 90%
            </Button>
          </Flex>
          <div
            style={{
              marginTop: "12px",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Protein Sequence
          </div>
          <Flex
            style={{ width: "80%", margin: "auto" }}
            justify="center"
            align="center"
            gap={48}
            flex={1}
          >
            <Protein3DMol
              className={"protein-viewer"}
              pdbIdStructure={pdbIdStructure}
              style={{ width: "55%", aspectRatio: "1/1", flex: 3 }}
              viewStyle={[{}, { cartoon: { color: "spectrum" } }]}
              surfaceStyle={null}
            />

            <Protein3DMol
              className={"protein-viewer"}
              pdbIdStructure={pdbIdStructure}
              style={{ width: "55%", aspectRatio: "1/1", flex: 2 }}
              viewStyle={[{}, { stick: { radius: 0.2, color: "gray" } }]}
              surfaceStyle={[
                ThreeDmol.SurfaceType.MS,
                {
                  opacity: 1,
                  color: "red",
                },
              ]}
            />
          </Flex>
        </>
      )}
    </>
  );
};

export default ProteinContent;
