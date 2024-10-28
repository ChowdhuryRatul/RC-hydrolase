//Write a functional component and import React bla bla
import React, { usestate, useEffect, useState } from "react";
import { Select, Input } from "antd";
import { searchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProteinSearch = () => {
  const [pdbs, setPdbs] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async ()=> {
      const rcData = await fetch("https://pixf-services.onrender.com/api/v1/rc-hydrolase/pairs")
      .then((res) => {
        if (res.status >= 300) return null;
        return res.json();
      })
      .catch((err) => null);
      if (rcData) {
        setPdbs(rcData);
        setFilteredOptions(rcData);
      }
    };
    fetchData();
  },[]);

  const handleSearch = (value) => {
    const searchValue = value.trim().toUpperCase();
    const closesMatches = pdbs
      .filter((item) => item.split("_")[0].toUpperCase().startsWith(searchValue))
      .slice(0, 10);
    setFilteredOptions(closesMatches);
  };

  const handleSelect = (item) => {
    navigate("pdb/" + item);

    const fetchReactiveData = async (name) => {
      const reactiveData = await fetch('https://pixf-services.onrender.com/api/v1/rc-hydrolase/pdbs/${name}.pdb')
        .then((res) => {
          if (res.status >= 300) return null;
          return res.json();
        })
        .catch((err) => null);
      if (reactiveData) {
        console.log(reactiveData);
      }
    };
    fetchReactiveData(item);
  };

  return (
    <Select
      style={{
        width: "100%",
        marginBottom: "12px",
      }}
      placeholder="Search for protein in database..."
      showSearch
      suffixIcon={<SearchOutlined />}
      onSearch={handleSearch}
      onSelect={handleSelect}
      optionFilterProp="value"
      options={filteredOptions.map((e) => ({
        value: e.split("_")[0].toUpperCase(),
        label: (
          <div key={e} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>{e.split("_")[0].toUpperCase()}</span>
            <span style={{ color: "gray", fontSize: "12px" }}>{e}</span>
          </div>
        ),
      }))}
    />
  );
};

export default ProteinSearch;