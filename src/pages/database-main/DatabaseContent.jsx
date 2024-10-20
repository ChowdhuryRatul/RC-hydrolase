import React, { useState } from "react";
import { useDatabaseContext } from "./DatabaseProvider";

import RootLayout from "../../components/layout/RootLayout";
import ContentSiderLayout from "../../components/layout/ContentSiderLayout";
import { Link } from "react-router-dom";
import { Divider } from "antd";

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
        deliverables
        <div>
          pie chart <br />
          table
        </div>
        <Divider />
        <div>
          Currently under testing for navigation <br />
          Database Content: {selectedKey}
          <div>
            click for sample navigtion to RCSB website:{" "}
            <a
              href={`https://www.rcsb.org/structure/${samplePdbId[selectedKey]}`}
              target="_blank"
              rel="noopener"
            >
              {samplePdbId[selectedKey]}
            </a>
          </div>
          <div>
            click for sample navigtion to RC-Hydrolase Protein page (page 2):{" "}
            <Link to={`/${samplePdbId[selectedKey]}`}>
              {samplePdbId[selectedKey]}
            </Link>
          </div>
        </div>
      </ContentSiderLayout>
    </>
  );
};

export default DatabaseContent;
