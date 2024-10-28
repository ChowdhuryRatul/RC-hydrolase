import React, { useState, useEffect } from "react";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

import "./styles.css"
import {parseData} from './utils';

const TablePlot = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const navigate = useNavigate();

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100, // Adjust the page size for better performance
    total: 0, // Will be updated when data is loaded
  });

  useEffect(() => {
    // Fetch and parse data when the component mounts
    const fetchData = async () => {
      setLoading(true);
      try {
        const parsedData = parseData(); // Call the parseData function from utils.js
        setTableData(parsedData);
        setPagination((prev) => ({
          ...prev,
          total: parsedData.length, // Update total to reflect the number of entries
        }));
      } catch (error) {
        console.error("Error parsing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTableChange = (newPagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
    setPagination(newPagination);
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
        dataSource={tableData}
        rowKey={(record) => record.key}
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ y: 600 }} // Enable virtual scroll with a fixed height
      />
    </div>
  );
};

export default TablePlot;
