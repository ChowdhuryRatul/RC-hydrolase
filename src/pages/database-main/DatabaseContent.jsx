import React, { useState } from "react";

import { Divider, Flex } from "antd";
import { Link } from "react-router-dom";
import ContentSiderLayout from "../../components/layout/ContentSiderLayout";
import PieChart from "../../components/plots/PieChart";
import TablePlot from "../../components/plots/TablePlot";

// items are placeholder
const sideMenuItems = ["1", "2", "3"];

const samplePdbId = {
  1: "6M0J",
  2: "8FNS",
  3: "7K3G",
};

const sideMenu = sideMenuItems.map((key) => ({
  key,
  label: `Sider ${key}`,
}));

const DatabaseContent = () => {
  const [selectedKey, setSelectedKey] = useState(sideMenuItems[0]);

  return (
    <>
      <div>
        Full lenegth Search Bar here (fit the whole width, TODO: Curwen)
      </div>
      <ContentSiderLayout
        defaultSelectedKeys={selectedKey}
        items={sideMenu}
        onClick={(menuObject) => setSelectedKey(menuObject.key)}
      >
        <Flex vertical={true} justify="center" align="center">
          <div style={{ width: "60%", aspectRatio: "1/1" }}>
            <PieChart />
          </div>
          <div style={{ width: "100%" }}>
            <TablePlot />
          </div>
        </Flex>
        <Divider />
        <div>
          Currently under testing for navigation <br />
          Sider selected: {selectedKey}
          <div>
            click for sample navigtion to RC-Hydrolase Protein page (page 2):{" "}
            <Link to={`pdb/${samplePdbId[selectedKey]}`}>
              {samplePdbId[selectedKey]}
            </Link>
          </div>
        </div>
      </ContentSiderLayout>
    </>
  );
};

export default DatabaseContent;
