import React, { useState } from "react";
import { useDatabaseContext } from "./DatabaseProvider";

import RootLayout from "../../components/layout/RootLayout";
import ContentSiderLayout from "../../components/layout/ContentSiderLayout";
import { Link } from "react-router-dom";
import { Input, Divider } from "antd";

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

const arrayTemp = ["A", "B", "C"];
const DatabaseContent = () => {
  const [selectedKey, setSelectedKey] = useState(sideMenuItems[0]);
  const [searchValue, setSearchValue] = useState("");
  const filteredResults = arrayTemp.filter((value) => 
    value.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div>
        <Input 
        type="text"
        value = {searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search: Enter four-letter PDB..."
        style={{ width: "100%", marginBottom: "16px" }}
        />
      {searchValue && (
        <ul>
          {filteredResults.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      )}
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
