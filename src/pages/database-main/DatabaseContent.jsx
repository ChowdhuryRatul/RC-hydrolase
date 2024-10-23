import React, { useState } from "react";

import { Divider, Flex, Input, Select } from "antd";
import { Link } from "react-router-dom";
import ContentSiderLayout from "../../components/layout/ContentSiderLayout";
import PieChart from "../../components/plots/PieChart";
import TablePlot from "../../components/plots/TablePlot";

import { SearchOutlined } from "@ant-design/icons";

// items are placeholder
const sideMenuItems = ["1", "2", "3"];

const samplePdbId = {
  1: "6M0J",
  2: "8FNS",
  3: "7K3G",
};

const sampleData = [
  {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [10, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 500, 10],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
];

const sideMenu = sideMenuItems.map((key) => ({
  key,
  label: `Sider ${key}`,
}));

const DatabaseContent = () => {
  const [selectedKey, setSelectedKey] = useState(sideMenuItems[0]);

  return (
    <>
      <Select
        style={{
          width: "100%",
          marginBottom: "12px",
        }}
        placeholder={"To be implemented by Curwen, Search for protein in database..."}
        showSearch
        suffixIcon={<SearchOutlined />}
      />

      <ContentSiderLayout
        defaultSelectedKeys={selectedKey}
        items={sideMenu}
        onClick={(menuObject) => setSelectedKey(menuObject.key)}
      >
        <div style={{ backgroundColor: "#fff0ad" }}>
          Yellow highlighted region are for testing purposes only <br />
          Sider selected: {selectedKey}
          <div>
            click for sample navigtion to RC-Hydrolase Protein page (page 2):{" "}
            <Link to={`pdb/${samplePdbId[selectedKey]}`}>
              {samplePdbId[selectedKey]}
            </Link>
          </div>
        </div>
        <Flex vertical={true} justify="center" align="center">
          <div style={{ width: "60%", aspectRatio: "1/1" }}>
            <PieChart data={sampleData[selectedKey]} />
          </div>
          <Divider />
          <div style={{ width: "100%" }}>
            <TablePlot />
          </div>
        </Flex>
      </ContentSiderLayout>
    </>
  );
};

export default DatabaseContent;
