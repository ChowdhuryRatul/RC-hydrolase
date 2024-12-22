import React, { useEffect, useState } from "react";
import { useProteinContext } from "./ProteinProvider";

// to visualize protein structure (similar to Jmol)
import * as ThreeDmol from "3dmol/build/3Dmol.js";

import { Button, Flex, Spin } from "antd";
import Protein3DMol from "./Protein3DMol";
import "./styles.css";
import { pdbListItem } from "./utils";

import { Empty } from "antd";
import { useNavigate } from "react-router-dom";

const ProteinContent = () => {
  const {
    pdbId,
    isLoading,
    pdbIdStructure,
    pdbIdInfo,
    information,
    reactivePdb,
    sequence,
  } = useProteinContext();

  const navigate = useNavigate();

  return (
    <>
      {isLoading ? (
        <div>
          <Spin
            tip="Loading protein..."
            spinning={isLoading}
            size="large"
            fullscreen
          />
        </div>
      ) : !sequence ? (
        <Flex style={{ height: "100%" }} justify="center" align="center" vertical gap={12}>
          <Empty description={"No protein of pdb id found"} />
          <Button type="primary" onClick={() => navigate("/")}>
            Back Home
          </Button>
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
                navigate("60");
              }}
            >
              Cluster 60%
            </Button>
            <Button
              onClick={() => {
                navigate("70");
              }}
            >
              Cluster 70%
            </Button>
            <Button
              onClick={() => {
                navigate("80");
              }}
            >
              Cluster 80%
            </Button>
            <Button
              onClick={() => {
                navigate("90");
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
              wordBreak: "break-word",
            }}
          >
            {sequence && (
              <>
                {sequence
                  .split("|")
                  .filter((e) => e != "")
                  .map((e, i) => {
                    const key = e + i.toString();
                    if (e === e.toUpperCase()) {
                      return <span key={key}>{e}</span>;
                    } else {
                      return (
                        <span
                          key={key}
                          style={{
                            backgroundColor: "yellow",
                            fontWeight: "bold",
                          }}
                        >
                          {e.toUpperCase()}
                        </span>
                      );
                    }
                  })}
              </>
            )}
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
              viewStyle={[{}, { cartoon: { color: "#C8102E" } }]}
              surfaceStyle={null}
              partialViewStyle={
                reactivePdb
                  ? [
                      {
                        resi: [
                          ...new Set(
                            reactivePdb
                              .split("\n")
                              .map((e) => parseInt(e.slice(22, 26)))
                              .filter((e) => !isNaN(e))
                          ),
                        ],
                      },
                      { cartoon: { color: "yellow" } },
                    ]
                  : null
              }
            />

            <Flex
              style={{ width: "55%", flex: 2 }}
              vertical
              justify="center"
              align="center"
              gap={6}
            >
              <h3>Reaction Core</h3>
              <Protein3DMol
                className={"protein-viewer"}
                pdbIdStructure={reactivePdb}
                style={{ width: "100%", aspectRatio: "1/1" }}
                viewStyle={[{}, { stick: { radius: 0.2, color: "#F1BE48" } }]}
                surfaceStyle={[
                  ThreeDmol.SurfaceType.MS,
                  {
                    opacity: 1,
                    color: "#F1BE48",
                  },
                ]}
              />
              {information ? (
                <>
                  <div>Ligand: {information.ligand}</div>
                  <div>EC Class: {information.ecClass}</div>
                  <div>Organism: {information.organism}</div>
                </>
              ) : (
                <Flex vertical align="center" justify="center">
                  <Spin />
                  loading...
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default ProteinContent;
