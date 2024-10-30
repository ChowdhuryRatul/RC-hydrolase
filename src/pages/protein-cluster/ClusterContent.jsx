import React, { useEffect, useState } from "react";
import { useGlobalAppContext } from "../../app/AppProvider";
import { siderItems } from "../../lib/contants";
import { useNavigate } from "react-router-dom";
import { Divider, Flex, Select, Spin } from "antd";
import ContentSiderLayout from "../../components/layout/ContentSiderLayout";
import { SearchOutlined } from "@ant-design/icons";
import PieChart from "../../components/plots/PieChart";
import { getPieChartData, nameMapping } from "../../components/plots/utils";
import { useClusterContext } from "./ClusterProvider";
import ClusterTablePlot from "../../components/table/ClusterTablePlot";

const ClusterContent = () => {
  const { clusterPdbs, isLoading, pdbId, clusterRange } = useClusterContext();
  const [selectedKey, setSelectedKey] = useState(siderItems[0].key);

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
      <h2>Dataset of &#8805; {clusterRange}% with {pdbId}'s reactive center</h2>
      <Select
        style={{
          width: "100%",
          marginBottom: "12px",
        }}
        placeholder={"Search for a protein in database..."}
        showSearch
        suffixIcon={<SearchOutlined />}
        // filterOption={false}
        onSearch={() => {
          // console.log("Implement custom search filter function");
        }}
        onSelect={(item) => {
          navigate("/pdb/" + item);
        }}
        // below are all for testing purposes
        optionFilterProp="value"
        // onClick={() => {console.log("click")}}

        options={
            clusterPdbs
            ? clusterPdbs.map((e) => ({
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
            {clusterPdbs && selectedKey && (
              <PieChart
                data={getPieChartData(selectedKey, clusterPdbs)}
                title={nameMapping[selectedKey]}
              />
            )}
          </div>
        </Flex>
      </ContentSiderLayout>

      <Divider />
      {clusterPdbs && (
        <div style={{ width: "100%" }}>
          <ClusterTablePlot
            data={clusterPdbs.map((e) => {
              const name = e.replace(".pdb", "");
              const portion = name.split("_");
              return {
                key: e,
                pdbId: portion[0].toUpperCase(),
                ligand: portion[1],
                residuePosition: portion[2],
                ecClass: portion[3],
                organism: portion[4],
                score: parseFloat(portion[5]).toFixed(2),
              };
            })}
          />
        </div>
      )}
    </>
  );
};

export default ClusterContent;
