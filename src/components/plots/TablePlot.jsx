import React, { useState } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

import "./styles.css"

const TablePlot = ({ data }) => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const navigate = useNavigate();

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns = [
    {
      title: "Pdb Id",
      dataIndex: "pdbId",
      key: "pdbId",
      sorter: (a, b) => a.pdbId.localeCompare(b.pdbId),
      sortOrder: sortedInfo.columnKey === "pdbId" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Ligand",
      dataIndex: "ligand",
      key: "ligand",
      sorter: (a, b) => a.ligand.localeCompare(b.ligand),
      sortOrder: sortedInfo.columnKey === "ligand" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "Residue Position",
      dataIndex: "residuePosition",
      key: "residuePosition",
      sorter: (a, b) =>
        a.residuePosition.localeCompare(b.residuePosition, undefined, {
          numeric: true,
        }),
      sortOrder:
        sortedInfo.columnKey === "residuePosition" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "EC Class",
      dataIndex: "ecClass",
      key: "ecClass",
      sorter: (a, b) => a.ecClass.localeCompare(b.ecClass),
      sortOrder: sortedInfo.columnKey === "ecClass" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Organism",
      dataIndex: "organism",
      key: "organism",
      sorter: (a, b) => a.organism - b.organism,
      sortOrder: sortedInfo.columnKey === "organism" ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {/* <Button style={{ marginBottom: "12px" }} onClick={() => clearAll()}>
        Clear
      </Button> */}
      <p>Total data: {data.length}</p>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              navigate("pdb/" + record.pdbId);
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        columns={columns}
        pagination={{ position: ["bottomRight"] }}
        dataSource={data ? data : []}
        onChange={handleChange}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
};
export default TablePlot;
