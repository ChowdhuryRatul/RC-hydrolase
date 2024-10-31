import React, { useState, useEffect } from "react";

import { Divider, Flex, Input, Select, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ContentSiderLayout from "../../components/layout/ContentSiderLayout";
import PieChart from "../../components/plots/PieChart";

import { SearchOutlined } from "@ant-design/icons";

import { useGlobalAppContext } from "../../app/AppProvider";
import { getPieChartData, nameMapping } from "../../components/plots/utils";
import { siderItems } from "../../lib/contants";
import TablePlot from "../../components/table/TablePlot";



const DatabaseContent = () => {
  const { data, pdbs, isLoading } = useGlobalAppContext();
  const [selectedKey, setSelectedKey] = useState(siderItems[0].key);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (pdbs) {
      setSearchData(
        pdbs.map((e) => ({
          value: e.split("_")[0].toUpperCase(),
          label: (
            <Flex key={e} gap={6} align="center">
              <span>{e.split("_")[0].toUpperCase()}</span>

              <span style={{ color: "gray", fontSize: "12px" }}>{e}</span>
            </Flex>
          ),
        }))
      );
    }
  }, [isLoading]);

  const navigate = useNavigate();
  return (
    <>
      {isLoading && (
        <Spin
          tip="Loading data..."
          spinning={isLoading}
          size="large"
          fullscreen
        />
      )}
      <h2 
      style={{ display: "flex", justifyContent: "space-between", alignItems: "end"}}
      ><span>Reactive Center of Hydrolase Enzymes</span> <span style={{fontWeight: 100, fontSize: "0.8rem"}}>(Last Updated: Oct 31, 2024, created by{" "}
        <a
          href="https://chowdhurylab.github.io/"
          target="_blank"
          rel="noopener"
        >
          Chowdhury Lab (Iowa State)
        </a>)</span></h2>
      <Select
        style={{
          width: "100%",
          marginBottom: "12px",
        }}
        placeholder={
          "Search for a protein in database..."
        }
        showSearch
        suffixIcon={<SearchOutlined />}
        // filterOption={false}
        onSearch={() => {
          // console.log("Implement custom search filter function");
        }}
        onSelect={(item) => {
          // console.log(item);
          navigate("pdb/" + item);
        }}
        // below are all for testing purposes
        optionFilterProp="value"
        // onClick={() => {console.log("click")}}

        options={
          pdbs
            ? pdbs.map((e) => ({
                value: e.split("_")[0].toUpperCase(),
                label: (
                  <Flex key={e} gap={6} align="center">
                    <span>{e.split("_")[0].toUpperCase()}</span>

                    <span style={{ color: "gray", fontSize: "12px" }}>{e}</span>
                  </Flex>
                ),
              }))
            : []
        }
      />

      <ContentSiderLayout
        defaultSelectedKeys={selectedKey}
        items={siderItems}
        onClick={(menuObject) => setSelectedKey(menuObject.key)}
      >
        <Flex
          style={{ height: "100%" }}
          vertical={true}
          justify="center"
          align="center"
          gap={12}
        >
          <div style={{ width: "60%", aspectRatio: "1/1" }}>
            {pdbs && selectedKey && (
              <PieChart
                data={getPieChartData(selectedKey, pdbs)}
                title={nameMapping[selectedKey]}
              />
            )}
          </div>
        </Flex>
      </ContentSiderLayout>

      <Divider />
      {pdbs && (
        <div style={{ width: "100%" }}>
          <TablePlot
            data={pdbs.map((e) => {
              const name = e.replace(".pdb", "");
              const portion = name.split("_");
              return {
                pdbname: e,
                pdbId: portion[0].toUpperCase(),
                ligand: portion[1],
                residuePosition: portion[2],
                ecClass: portion[3],
                organism: portion[4],
              };
            })}
          />
        </div>
      )}
    </>
  );
};

export default DatabaseContent;
